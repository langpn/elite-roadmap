import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SEMANTIC_CSS_ALIASES,
  REEL_ARTIFACTS,
  getReelGeometrySpec,
  getReelXPositions,
  computeResponsiveCameraFraming,
  formatSmpteTimecode,
} from './reelMath';

test('defines all 4 required semantic CSS aliases', () => {
  assert.deepEqual(SEMANTIC_CSS_ALIASES, [
    '--text-dim',
    '--text-muted',
    '--text-primary',
    '--text-secondary',
  ]);
});

test('maps all four reel slots to unique MP4 artifacts', () => {
  assert.equal(REEL_ARTIFACTS.length, 4);
  const mp4Paths = new Set<string>();
  REEL_ARTIFACTS.forEach((artifact, idx) => {
    assert.equal(artifact.slotIndex, idx);
    assert.equal(artifact.mp4Path.endsWith('.mp4'), true);
    assert.equal(artifact.mp4Path.startsWith('/artifacts/'), true);
    mp4Paths.add(artifact.mp4Path);
  });
  assert.equal(mp4Paths.size, 4);
});

test('reel geometry includes two thin flange discs and cinema silhouette specs', () => {
  const spec = getReelGeometrySpec();
  assert.equal(spec.flangeCount, 2);
  assert.equal(spec.flangeThickness < 0.08, true, 'flange discs must be thin');
  assert.equal(spec.flangeRadius > spec.coreRadius, true, 'flange radius must extend past film core');
  assert.equal(spec.spokeCount >= 5, true);
  assert.equal(spec.cutoutWindowCount >= 5, true);
});

test('reel X positions align symmetrically with the 4 semantic cards below', () => {
  const positions = getReelXPositions(12.4);
  assert.deepEqual(positions, [-4.65, -1.55, 1.55, 4.65]);
  // Verify equal spacing across the 4 column centers
  const d1 = Number((positions[1] - positions[0]).toFixed(3));
  const d2 = Number((positions[2] - positions[1]).toFixed(3));
  const d3 = Number((positions[3] - positions[2]).toFixed(3));
  assert.equal(d1, 3.1);
  assert.equal(d2, 3.1);
  assert.equal(d3, 3.1);
});

test('responsive Three.js camera framing keeps all 4 canisters visible across desktop and portrait mobile aspect ratios', () => {
  // Desktop 1440x900 rack (approx 1360x270)
  const desktop = computeResponsiveCameraFraming(1360, 270);
  assert.equal(desktop.allFourCanistersVisible, true);

  // Mobile 390px rack (approx 358x240)
  const mobileRack = computeResponsiveCameraFraming(358, 240);
  assert.equal(mobileRack.allFourCanistersVisible, true);
  assert.equal(mobileRack.cameraZ > desktop.cameraZ, true, 'camera pulls back on narrower aspect ratios');

  // Extreme portrait viewport (390x844)
  const portrait = computeResponsiveCameraFraming(390, 844);
  assert.equal(portrait.allFourCanistersVisible, true);
  assert.equal(portrait.visibleHorizontalSpanAtZero >= 12.5, true);
});

test('formats SMPTE timecode accurately at 24fps', () => {
  assert.equal(formatSmpteTimecode(0, 1, 24), '01:00:00:00');
  assert.equal(formatSmpteTimecode(24, 1, 24), '01:00:01:00');
  assert.equal(formatSmpteTimecode(36, 2, 24), '02:00:01:12');
});
