/**
 * Pure domain logic, responsive 3D camera framing math, and cinema reel specifications.
 * Decoupled from DOM/Three.js runtime for fast, deterministic unit testing.
 */

import { RealReelArtifact, REAL_REEL_ARTIFACTS } from '../data/roadmapAdapter';

export type ReelArtifact = RealReelArtifact;

export const SEMANTIC_CSS_ALIASES = [
  '--text-dim',
  '--text-muted',
  '--text-primary',
  '--text-secondary',
] as const;

export const REEL_ARTIFACTS: ReelArtifact[] = REAL_REEL_ARTIFACTS;

export interface ReelFlangeGeometrySpec {
  flangeCount: number;
  flangeRadius: number;
  flangeThickness: number;
  flangeSeparationZ: number;
  coreRadius: number;
  coreWidth: number;
  hubRadius: number;
  spokeCount: number;
  cutoutWindowCount: number;
}

/**
 * Returns the physical/procedural dimensions for each cinema film reel canister.
 * Enforces two thin parallel flange discs sandwiching a wound film core.
 */
export function getReelGeometrySpec(): ReelFlangeGeometrySpec {
  const flangeThickness = 0.048;
  const coreWidth = 0.32;
  return {
    flangeCount: 2,
    flangeRadius: 1.15,
    flangeThickness,
    flangeSeparationZ: coreWidth + flangeThickness,
    coreRadius: 0.88,
    coreWidth,
    hubRadius: 0.28,
    spokeCount: 6,
    cutoutWindowCount: 6,
  };
}

/**
 * Computes the world-space X coordinates for the 4 reel canisters so they align
 * with the centers of the 4 semantic cards below (`-37.5%`, `-12.5%`, `+12.5%`, `+37.5%`
 * of the rack span).
 */
export function getReelXPositions(rackSpan = 12.4): [number, number, number, number] {
  const step = rackSpan / 4; // 3.1 units per slot
  return [
    Number((-1.5 * step).toFixed(3)),
    Number((-0.5 * step).toFixed(3)),
    Number((0.5 * step).toFixed(3)),
    Number((1.5 * step).toFixed(3)),
  ];
}

export interface CameraFramingResult {
  fovDeg: number;
  aspect: number;
  cameraZ: number;
  cameraY: number;
  lookAtY: number;
  visibleHorizontalSpanAtZero: number;
  visibleVerticalSpanAtZero: number;
  canisterXPositions: [number, number, number, number];
  allFourCanistersVisible: boolean;
}

/**
 * Computes responsive Three.js camera framing for any viewport/canvas aspect ratio
 * (including narrow portrait aspect ratios on 390px mobile viewports).
 * Ensures all 4 canisters and their outer flanges remain 100% inside the frustum
 * and aligns their horizontal X coordinates with the 4 semantic card columns below.
 */
export function computeResponsiveCameraFraming(
  viewportWidth: number,
  viewportHeight: number,
  rackSpan = 12.4
): CameraFramingResult {
  const safeWidth = Math.max(1, viewportWidth);
  const safeHeight = Math.max(1, viewportHeight);
  const aspect = safeWidth / safeHeight;

  const fovDeg = 28;
  const fovRad = (fovDeg * Math.PI) / 180;
  const tanHalfV = Math.tan(fovRad / 2);
  const tanHalfH = Math.max(0.05, aspect * tanHalfV);

  const basePositions = getReelXPositions(rackSpan);
  const spec = getReelGeometrySpec();

  // Outer extent of leftmost and rightmost reel flanges + safety margin
  const outerMostX = Math.abs(basePositions[3]) + spec.flangeRadius + 0.45;
  const requiredHalfWidth = outerMostX;
  const requiredHalfHeight = spec.flangeRadius + 0.48;

  const distForWidth = requiredHalfWidth / tanHalfH;
  const distForHeight = requiredHalfHeight / tanHalfV;

  // Add canister Z-depth margin so closest flange face is well inside the frustum
  const depthMargin = 1.25;
  const cameraZ = Number((Math.max(distForWidth, distForHeight) + depthMargin).toFixed(3));

  const effectiveDepth = cameraZ - depthMargin;
  const visibleHorizontalSpanAtZero = Number((2 * effectiveDepth * tanHalfH).toFixed(3));
  const visibleVerticalSpanAtZero = Number((2 * effectiveDepth * tanHalfV).toFixed(3));

  // Align the 4 canisters across the visible frustum width so they sit directly above
  // the 4 semantic cards (-37.5%, -12.5%, +12.5%, +37.5% of the active rack width)
  const usableSpan = Math.max(rackSpan, visibleHorizontalSpanAtZero * 0.92);
  const canisterXPositions = getReelXPositions(usableSpan);

  const maxOuterCanisterEdge = Math.abs(canisterXPositions[3]) + spec.flangeRadius;
  const allFourCanistersVisible =
    visibleHorizontalSpanAtZero >= maxOuterCanisterEdge * 2 - 0.05 &&
    visibleVerticalSpanAtZero >= requiredHalfHeight * 2 - 0.05;

  return {
    fovDeg,
    aspect: Number(aspect.toFixed(4)),
    cameraZ,
    cameraY: 0.22,
    lookAtY: -0.04,
    visibleHorizontalSpanAtZero,
    visibleVerticalSpanAtZero,
    canisterXPositions,
    allFourCanistersVisible,
  };
}

/**
 * Formats a frame number into SMPTE timecode `HH:MM:SS:FF` at 24 fps.
 */
export function formatSmpteTimecode(frameNumber: number, baseHour = 1, fps = 24): string {
  const safeFrame = Math.max(0, Math.floor(frameNumber));
  const ff = safeFrame % fps;
  const totalSeconds = Math.floor(safeFrame / fps);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = (baseHour + Math.floor(totalSeconds / 3600)) % 24;

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}
