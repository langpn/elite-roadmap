import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ReelArtifact,
  REEL_ARTIFACTS,
  getReelGeometrySpec,
  getReelXPositions,
  computeResponsiveCameraFraming,
} from '../utils/reelMath';

interface ReelRackStageProps {
  selectedReelId: string;
  onSelectReel: (reel: ReelArtifact, openPlayer?: boolean) => void;
  force2DFallback: boolean;
  onToggle2DFallback: () => void;
}

/**
 * Generates a high-contrast procedural radial cinema reel flange bump/roughness map
 * with 6 classic take-up window cutouts and 35mm sprocket markings.
 */
function createReelFlangeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = 256;
    const cy = 256;
    ctx.fillStyle = '#b8b8c2';
    ctx.fillRect(0, 0, 512, 512);

    // Brushed concentric rings
    for (let r = 40; r < 250; r += 4) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = r % 8 === 0 ? '#9e9ea8' : '#cbcbd4';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 6 classic cinema reel cutout apertures
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const wx = cx + Math.cos(angle) * 140;
      const wy = cy + Math.sin(angle) * 140;
      ctx.beginPath();
      ctx.arc(wx, wy, 48, 0, Math.PI * 2);
      ctx.fillStyle = '#18181f';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }

    // Center spindle bore
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#141419';
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const ReelRackStage: React.FC<ReelRackStageProps> = ({
  selectedReelId,
  onSelectReel,
  force2DFallback,
  onToggle2DFallback,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  });
  const [cameraTelemetry, setCameraTelemetry] = useState(() =>
    computeResponsiveCameraFraming(1360, 270)
  );

  const selectedReelRef = useRef(selectedReelId);
  selectedReelRef.current = selectedReelId;

  const onSelectReelRef = useRef(onSelectReel);
  onSelectReelRef.current = onSelectReel;

  const requestRenderRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const is2DMode = force2DFallback || prefersReducedMotion || webglFailed;

  // Trigger Three.js re-render when active selection changes
  useEffect(() => {
    requestRenderRef.current?.();
  }, [selectedReelId]);

  useEffect(() => {
    if (is2DMode) return;
    const container = canvasMountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let isDisposed = false;

    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const glContext = renderer.getContext();
    if (!glContext) {
      renderer.dispose();
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const initialW = Math.max(300, container.clientWidth || 1200);
    const initialH = Math.max(220, container.clientHeight || 270);
    renderer.setSize(initialW, initialH);

    container.innerHTML = '';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.id = 'three-reel-canvas';
    renderer.domElement.setAttribute('data-testid', 'three-reel-canvas');
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.028);

    // Studio environment reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Responsive PerspectiveCamera using computeResponsiveCameraFraming
    const initFraming = computeResponsiveCameraFraming(initialW, initialH);
    setCameraTelemetry(initFraming);

    const camera = new THREE.PerspectiveCamera(
      initFraming.fovDeg,
      initFraming.aspect,
      0.1,
      100
    );
    camera.position.set(0, initFraming.cameraY, initFraming.cameraZ);
    camera.lookAt(0, initFraming.lookAtY, 0);
    camera.updateProjectionMatrix();

    // 3-Point Warm/Cool Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x18181b, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
    keyLight.position.set(5, 7, 8);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -8;
      keyLight.shadow.camera.right = 8;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.15);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    // Archival Rack Structural Rail
    const railGeo = new THREE.BoxGeometry(12.2, 0.08, 0.9);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f26,
      metalness: 0.8,
      roughness: 0.35,
    });
    const rackRail = new THREE.Mesh(railGeo, railMat);
    rackRail.position.set(0, -1.26, -0.1);
    scene.add(rackRail);

    // Shared geometries & materials for the 4 composite cinema film reel canisters
    const spec = getReelGeometrySpec();
    const xPositions = getReelXPositions();
    const flangeTexture = createReelFlangeTexture();
    flangeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 1. Rear & Front Thin Flange Discs (2 per canister!)
    const flangeGeo = new THREE.CylinderGeometry(
      spec.flangeRadius,
      spec.flangeRadius,
      spec.flangeThickness,
      48
    );
    flangeGeo.rotateX(Math.PI / 2);

    // 2. Outer metallic flange rim ring for unmistakable cinema silhouette
    const flangeRimGeo = new THREE.TorusGeometry(spec.flangeRadius, 0.032, 12, 48);

    // 3. 6 radial spokes across front & back flanges
    const spokeGeo = new THREE.BoxGeometry(spec.flangeRadius * 1.82, 0.085, spec.flangeThickness + 0.015);

    // 4. 6 circular cinema cutout windows per flange
    const cutoutGeo = new THREE.CylinderGeometry(0.22, 0.22, spec.flangeThickness + 0.012, 24);
    cutoutGeo.rotateX(Math.PI / 2);

    // 5. Wound 35mm film pancake core between the two flanges
    const filmCoreGeo = new THREE.CylinderGeometry(
      spec.coreRadius,
      spec.coreRadius,
      spec.coreWidth,
      40
    );
    filmCoreGeo.rotateX(Math.PI / 2);

    // 6. Center NAB aluminum spindle hub + lock ring
    const hubGeo = new THREE.CylinderGeometry(
      spec.hubRadius,
      spec.hubRadius,
      spec.flangeSeparationZ + 0.08,
      28
    );
    hubGeo.rotateX(Math.PI / 2);

    // 7. Archival canister bottom saddle bracket (sits cleanly beneath the reel)
    const cradleGeo = new THREE.BoxGeometry(1.15, 0.12, 0.56);

    // 8. Soft contact shadow disc on rack shelf
    const shadowGeo = new THREE.CircleGeometry(1.1, 24);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const cutoutMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.9,
      metalness: 0.1,
    });

    const hubMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      metalness: 0.92,
      roughness: 0.18,
    });

    const cradleMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.75,
      roughness: 0.45,
    });

    const canisterGroups: THREE.Group[] = [];
    const shadowMeshes: THREE.Mesh[] = [];
    const hitProxies: THREE.Mesh[] = [];
    const hitGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.65, 16);
    hitGeo.rotateX(Math.PI / 2);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    REEL_ARTIFACTS.forEach((artifact, index) => {
      const group = new THREE.Group();
      const xPos = initFraming.canisterXPositions[index];
      group.position.set(xPos, 0.08, 0);
      // Slight 3/4 cinema rack presentation angle so BOTH thin flange discs & wound film core are clearly visible
      group.rotation.set(0.1, -0.32, 0.04);
      group.userData = { reelId: artifact.id, slotIndex: index };

      const flangeMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        map: flangeTexture,
        bumpMap: flangeTexture,
        bumpScale: 0.015,
        metalness: 0.86,
        roughness: 0.24,
      });

      const accentMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(artifact.accentHex),
        emissive: new THREE.Color(artifact.accentHex),
        emissiveIntensity: 0.22,
        metalness: 0.5,
        roughness: 0.3,
      });

      const coreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(artifact.tapeTintHex),
        metalness: 0.18,
        roughness: 0.68,
      });

      // Part 1: Rear thin flange disc (z = -flangeSeparationZ / 2)
      const rearFlange = new THREE.Mesh(flangeGeo, flangeMat);
      rearFlange.position.z = -spec.flangeSeparationZ / 2;
      rearFlange.name = 'rear-flange-disc';
      group.add(rearFlange);

      const rearRim = new THREE.Mesh(flangeRimGeo, flangeMat);
      rearRim.position.z = -spec.flangeSeparationZ / 2;
      group.add(rearRim);

      // Part 2: Front thin flange disc (z = +flangeSeparationZ / 2)
      const frontFlange = new THREE.Mesh(flangeGeo, flangeMat);
      frontFlange.position.z = spec.flangeSeparationZ / 2;
      frontFlange.name = 'front-flange-disc';
      group.add(frontFlange);

      const frontRim = new THREE.Mesh(flangeRimGeo, accentMat);
      frontRim.position.z = spec.flangeSeparationZ / 2;
      group.add(frontRim);

      // Part 3: Radial cinema reel spokes & circular cutout apertures on front flange
      for (let s = 0; s < 3; s++) {
        const spoke = new THREE.Mesh(spokeGeo, flangeMat);
        spoke.rotation.z = (s * Math.PI) / 3;
        spoke.position.z = spec.flangeSeparationZ / 2;
        group.add(spoke);
      }

      for (let w = 0; w < spec.cutoutWindowCount; w++) {
        const angle = (w * Math.PI * 2) / spec.cutoutWindowCount + Math.PI / 6;
        const cutout = new THREE.Mesh(cutoutGeo, cutoutMat);
        cutout.position.set(
          Math.cos(angle) * 0.62,
          Math.sin(angle) * 0.62,
          spec.flangeSeparationZ / 2
        );
        group.add(cutout);
      }

      // Part 4: Wound 35mm film core sandwiched between the two thin flanges
      const filmCore = new THREE.Mesh(filmCoreGeo, coreMat);
      filmCore.name = 'wound-film-core';
      group.add(filmCore);

      // Part 5: Colored photochemical leader band around outer edge of film core
      const leaderBandGeo = new THREE.TorusGeometry(spec.coreRadius + 0.01, 0.028, 10, 40);
      const leaderBand = new THREE.Mesh(leaderBandGeo, accentMat);
      group.add(leaderBand);

      // Part 6: Center NAB machined spindle hub
      const hub = new THREE.Mesh(hubGeo, hubMat);
      group.add(hub);

      // Part 7: Bottom canister saddle bracket seated on the rack rail
      const cradle = new THREE.Mesh(cradleGeo, cradleMat);
      cradle.position.set(0, -1.16, 0);
      group.add(cradle);

      // Contact shadow on shelf
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.position.set(xPos, -1.21, 0);
      scene.add(shadow);
      shadowMeshes.push(shadow);

      // Raycast hit proxy
      const proxy = new THREE.Mesh(hitGeo, hitMat);
      proxy.position.copy(group.position);
      proxy.userData = { reelArtifact: artifact };
      scene.add(proxy);
      hitProxies.push(proxy);

      scene.add(group);
      canisterGroups.push(group);
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Software-WebGL safe on-demand render helper (from threejs skill)
    let renderBusy = false;
    let renderDirty = false;

    function afterDraw(cb: () => void) {
      if (!renderer || isDisposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function updateCanisterHighlightStates() {
      const currentSelected = selectedReelRef.current;
      canisterGroups.forEach((group) => {
        const isSelected = group.userData.reelId === currentSelected;
        const targetScale = isSelected ? 1.07 : 0.96;
        group.scale.setScalar(targetScale);
        group.position.y = isSelected ? 0.16 : 0.04;
        group.rotation.y = isSelected ? -0.24 : -0.34;
      });
    }

    function requestRender() {
      if (isDisposed || !renderer) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (isDisposed || !renderer) return;
        renderDirty = false;
        updateCanisterHighlightStates();
        renderer.render(scene, camera);
        const done = () => {
          renderBusy = false;
          if (renderDirty) requestRender();
        };
        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    requestRenderRef.current = requestRender;
    requestRender();

    // Pointer raycasting for clicking 3D canisters directly
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerDown = (event: PointerEvent) => {
      if (!renderer) return;
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(hitProxies, false);
      if (hits.length > 0) {
        const artifact = hits[0].object.userData.reelArtifact as ReelArtifact | undefined;
        if (artifact) {
          onSelectReelRef.current(artifact, false);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Responsive ResizeObserver that adapts cameraZ and canister X alignment to aspect ratio
    const handleResize = () => {
      if (!container || !renderer || isDisposed) return;
      const w = Math.max(280, container.clientWidth);
      const h = Math.max(220, container.clientHeight);
      const nextFraming = computeResponsiveCameraFraming(w, h);
      setCameraTelemetry(nextFraming);
      camera.aspect = nextFraming.aspect;
      camera.position.set(0, nextFraming.cameraY, nextFraming.cameraZ);
      camera.lookAt(0, nextFraming.lookAtY, 0);
      camera.updateProjectionMatrix();

      canisterGroups.forEach((group, idx) => {
        const nextX = nextFraming.canisterXPositions[idx];
        group.position.x = nextX;
        if (shadowMeshes[idx]) shadowMeshes[idx].position.x = nextX;
        if (hitProxies[idx]) hitProxies[idx].position.x = nextX;
      });
      rackRail.scale.x = Math.max(1, (nextFraming.canisterXPositions[3] * 2.35) / 12.2);

      renderer.setSize(w, h);
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      requestRenderRef.current = null;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.dispose();
      }
      flangeTexture.dispose();
      flangeGeo.dispose();
      flangeRimGeo.dispose();
      spokeGeo.dispose();
      cutoutGeo.dispose();
      filmCoreGeo.dispose();
      hubGeo.dispose();
      cradleGeo.dispose();
      shadowGeo.dispose();
      hitGeo.dispose();
    };
  }, [is2DMode]);

  return (
    <div
      id="reel-rack"
      className="relative w-full rounded-2xl border overflow-hidden shadow-xs"
      style={{
        borderColor: 'var(--border-hairline)',
        backgroundColor: 'var(--bg-surface)',
        minHeight: '270px',
      }}
      data-testid="artifact-reel-rack"
      data-render-mode={is2DMode ? '2d-fallback' : '3d-webgl'}
      data-all-canisters-visible={String(cameraTelemetry.allFourCanistersVisible)}
    >
      {/* Framed visual stage header */}
      <div
        className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b"
        style={{
          borderColor: 'var(--border-hairline)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-xs tracking-wide font-mono-tabular" style={{ color: 'var(--text-primary)' }}>
            REEL RACK
          </span>
          <span className="text-xs font-mono-tabular" style={{ color: 'var(--text-muted)' }}>
            Giá 4 cuộn phim DaVinci
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggle2DFallback}
            className="min-h-[44px] px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
            style={{
              borderColor: is2DMode ? 'var(--border-active)' : 'var(--border-hairline)',
              backgroundColor: is2DMode ? 'var(--accent-primary-wash)' : 'var(--bg-surface)',
              color: is2DMode ? 'var(--accent-primary)' : 'var(--text-secondary)',
            }}
            aria-pressed={is2DMode}
          >
            {is2DMode ? 'Chế độ 3D' : 'Chế độ 2D'}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Mount OR Full 2D Interactive Fallback Stage */}
      {!is2DMode ? (
        <div
          className="relative w-full h-[222px]"
          style={{ backgroundColor: 'var(--bg-darkroom)' }}
        >
          <div
            ref={canvasMountRef}
            className="w-full h-full"
            aria-label="3D Reel Rack Stage showing 4 video reel canisters"
          />

          {/* Semantic 4-Slot Interactive Quick-Select Overlay Bar aligned with the 4 canisters */}
          <div
            className="
              absolute inset-x-0 bottom-0 z-10
              grid grid-cols-2 sm:grid-cols-4 gap-2 px-3 py-2
              bg-gradient-to-t from-black/90 via-black/60 to-transparent
            "
            role="group"
            aria-label="Quick Reel Canister Slot Selector"
          >
            {REEL_ARTIFACTS.map((reel) => {
              const isSelected = reel.id === selectedReelId;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => onSelectReel(reel, false)}
                  data-reel-slot={reel.id}
                  data-artifact-mp4={reel.mp4Path}
                  aria-pressed={isSelected}
                  className="
                    min-h-[44px] px-2.5 py-1.5 rounded-lg border text-left
                    flex items-center justify-between gap-2 transition-colors cursor-pointer
                    focus-visible:outline-2
                  "
                  style={{
                    backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.75)',
                    borderColor: isSelected ? reel.accentHex : 'rgba(255,255,255,0.15)',
                    color: 'var(--bg-surface)',
                  }}
                >
                  <span className="truncate text-xs font-medium">
                    <span className="font-mono-tabular mr-1.5 font-bold" style={{ color: reel.accentHex }}>
                      {reel.reelNumber}
                    </span>
                    {reel.title.replace(/^Reel \d+: /, '')}
                  </span>
                  <span
                    className="text-[11px] font-mono-tabular whitespace-nowrap shrink-0"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    MP4
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Interactive 2D Fallback Stage: Never a blank 270px rectangle; renders 4 clickable semantic reel slots */
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 min-h-[222px] items-stretch"
          style={{ backgroundColor: 'var(--bg-canvas)' }}
          role="region"
          aria-label="2D Interactive Cinema Reel Fallback Slots"
          data-testid="fallback-2d-reel-grid"
        >
          {REEL_ARTIFACTS.map((reel) => {
            const isSelected = reel.id === selectedReelId;
            return (
              <button
                key={reel.id}
                type="button"
                onClick={() => onSelectReel(reel, false)}
                data-reel-slot={reel.id}
                data-artifact-mp4={reel.mp4Path}
                aria-pressed={isSelected}
                className="
                  group relative min-h-[190px] p-3.5 rounded-xl border text-left
                  flex flex-col justify-between transition-colors cursor-pointer
                  focus-visible:outline-2
                "
                style={{
                  backgroundColor: isSelected ? 'var(--accent-primary-wash)' : 'var(--bg-surface)',
                  borderColor: isSelected ? 'var(--border-active)' : 'var(--border-hairline)',
                }}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span
                    className="text-xs font-mono-tabular font-semibold tracking-tight"
                    style={{ color: reel.accentHex }}
                  >
                    {reel.code} · Slot {reel.reelNumber}
                  </span>
                  <span
                    className="text-xs font-mono-tabular"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {reel.duration}
                  </span>
                </div>

                {/* Recognizable 2D SVG Dual-Flange Cinema Film Reel Silhouette */}
                <div className="my-2 flex items-center gap-3">
                  <svg
                    viewBox="0 0 96 96"
                    className="w-16 h-16 shrink-0"
                    aria-hidden="true"
                  >
                    {/* Rear flange disc offset */}
                    <circle
                      cx="52"
                      cy="46"
                      r="38"
                      fill="#e2e8f0"
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                    {/* Wound film core */}
                    <circle
                      cx="48"
                      cy="48"
                      r="31"
                      fill={reel.tapeTintHex}
                      stroke={reel.accentHex}
                      strokeWidth="1.5"
                    />
                    {/* Front thin flange disc with 6 cinema cutout apertures */}
                    <circle
                      cx="45"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2.5"
                    />
                    {[0, 60, 120, 180, 240, 300].map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      const cx = 45 + Math.cos(rad) * 21;
                      const cy = 50 + Math.sin(rad) * 21;
                      return (
                        <circle
                          key={deg}
                          cx={cx}
                          cy={cy}
                          r="7.5"
                          fill="#f8fafc"
                          stroke="#64748b"
                          strokeWidth="1.5"
                        />
                      );
                    })}
                    {/* Center NAB spindle hub */}
                    <circle
                      cx="45"
                      cy="50"
                      r="8"
                      fill="#cbd5e1"
                      stroke="#334155"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="min-w-0">
                    <div
                      className="font-display font-semibold text-sm leading-snug break-words"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {reel.title}
                    </div>
                    <div
                      className="text-xs mt-0.5 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {reel.subtitle}
                    </div>
                  </div>
                </div>

                <div
                  className="pt-2 border-t flex items-center justify-between gap-2 text-xs font-mono-tabular"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-dim)',
                  }}
                >
                  <span className="truncate" style={{ color: 'var(--text-muted)' }}>
                    {reel.mp4Path.replace('/artifacts/', '')}
                  </span>
                  <span
                    className="font-medium whitespace-nowrap shrink-0"
                    style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                  >
                    {isSelected ? 'Đang chọn' : 'Xem chi tiết'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
