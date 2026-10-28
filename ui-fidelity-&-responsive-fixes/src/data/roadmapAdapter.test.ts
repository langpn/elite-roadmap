import test from 'node:test';
import assert from 'node:assert/strict';
import {
  REAL_REEL_ARTIFACTS,
  REAL_ROADMAP_PHASES,
  MP4_GATE,
  ACTION_GATE,
  TET_DATE,
  JOB_PAYOUT_DEADLINE,
  computeCountdown,
  loadLocalVerificationState,
} from './roadmapAdapter';

test('roadmap adapter defines exactly 4 real reel artifacts with contract IDs', () => {
  assert.equal(REAL_REEL_ARTIFACTS.length, 4);

  const expectedTaskIds = [
    'reel_01_artifact',
    'reel_02_artifact',
    'reel_03_artifact',
    'reel_04_artifact',
  ];

  const expectedPhaseIds = ['reel-1', 'reel-2', 'reel-3', 'reel-4'];

  REAL_REEL_ARTIFACTS.forEach((art, idx) => {
    assert.equal(art.slotIndex, idx);
    assert.equal(art.taskId, expectedTaskIds[idx]);
    assert.equal(art.phaseId, expectedPhaseIds[idx]);
    assert.equal(art.mp4Path.startsWith('/artifacts/'), true);
    assert.equal(art.mp4Path.endsWith('.mp4'), true);
    assert.equal(art.status, 'Chưa xác nhận', 'Must start with honest unverified state');
  });
});

test('roadmap adapter defines all 7 phases matching ROADMAP_SPRINTS_V2', () => {
  assert.equal(REAL_ROADMAP_PHASES.length, 7);
  const phaseIds = REAL_ROADMAP_PHASES.map((p) => p.id);
  assert.deepEqual(phaseIds, [
    'setup',
    'reel-1',
    'reel-2',
    'profile',
    'reel-3',
    'proposal',
    'reel-4',
  ]);

  const profilePhase = REAL_ROADMAP_PHASES.find((p) => p.id === 'profile');
  assert.ok(profilePhase);
  assert.deepEqual(
    profilePhase.tasks.map((t) => t.id),
    ['profile_minimum', 'first_paid_job_gate']
  );
  const gateTask = profilePhase.tasks.find((t) => t.id === 'first_paid_job_gate');
  assert.ok(gateTask);
  assert.equal(gateTask.evidenceType, 'action');
  assert.equal(gateTask.isOutput, false);
  assert.match(gateTask.duration, /Reel 2.*Reel 3/i);
  assert.match(gateTask.output, /profile.*live/i);
  assert.match(gateTask.output, /2.*Reel/i);
  assert.match(gateTask.output, /dịch vụ/i);
  assert.match(gateTask.output, /job/i);
  assert.match(gateTask.output, /proposal.*duyệt|owner-reviewed/i);

  const setupPhase = REAL_ROADMAP_PHASES.find((p) => p.id === 'setup');
  assert.ok(setupPhase);
  const setupTask = setupPhase.tasks.find((t) => t.id === 'setup_context');
  assert.ok(setupTask);
  assert.equal(setupTask.output.includes('Flash'), false);
  assert.match(setupTask.output, /Xác nhận đúng đường dẫn RAW, project DaVinci và timeline/i);
  assert.match(setupTask.output, /không ghi đè asset gốc/i);
  assert.match(setupTask.output, /video mẫu chỉ dùng làm reference đối chiếu/i);

  const proposalPhase = REAL_ROADMAP_PHASES.find((p) => p.id === 'proposal');
  assert.ok(proposalPhase);
  assert.match(proposalPhase.desc, /3 MP4/i);
  const proposalTask = proposalPhase.tasks.find((t) => t.id === 'proposal_first');
  assert.ok(proposalTask);
  assert.match(proposalTask.duration, /Sau Reel 3.*Reel 4/i);
  assert.match(proposalTask.output, /job URL/i);
  assert.match(proposalTask.output, /bằng chứng 3 Reel/i);
  assert.match(proposalTask.output, /Reel 3 bất động sản phù hợp|Reel/i);
  assert.match(proposalTask.output, /proposal/i);
  assert.match(proposalTask.output, /client-test|test/i);
  assert.match(proposalTask.output, /paid-test|watermark/i);
  assert.match(proposalTask.output, /scope.*deadline.*revision|revision.*deadline/i);
  assert.match(proposalTask.output, /hành động tiếp theo|next action/i);

  const reel3Phase = REAL_ROADMAP_PHASES.find((p) => p.id === 'reel-3');
  const reel4Phase = REAL_ROADMAP_PHASES.find((p) => p.id === 'reel-4');
  assert.ok(reel3Phase);
  assert.ok(reel4Phase);
  assert.match(reel3Phase.tasks[0].strategyNote, /Ghi chú mapping curriculum/i);
  assert.match(reel3Phase.tasks[0].strategyNote, /Lâm Trần Real Estate/i);
  assert.match(reel4Phase.tasks[0].strategyNote, /Ghi chú mapping curriculum/i);
  assert.match(reel4Phase.tasks[0].strategyNote, /Josh William Fitness/i);

  const reel3Artifact = REAL_REEL_ARTIFACTS.find((a) => a.id === 'reel-03');
  const reel4Artifact = REAL_REEL_ARTIFACTS.find((a) => a.id === 'reel-04');
  assert.ok(reel3Artifact);
  assert.ok(reel4Artifact);
  assert.match(reel3Artifact.strategyNote, /Ghi chú mapping curriculum/i);
  assert.match(reel3Artifact.strategyNote, /Lâm Trần Real Estate/i);
  assert.match(reel4Artifact.strategyNote, /Ghi chú mapping curriculum/i);
  assert.match(reel4Artifact.strategyNote, /Josh William Fitness/i);
});

test('roadmap adapter defines commercial proof fields on each real reel artifact', () => {
  assert.equal(REAL_REEL_ARTIFACTS.length, 4);

  REAL_REEL_ARTIFACTS.forEach((art) => {
    assert.ok(art.clientUseCase && typeof art.clientUseCase === 'string');
    assert.ok(art.editPromise && typeof art.editPromise === 'string');
    assert.ok(art.englishPitch && typeof art.englishPitch === 'string');
    assert.ok(art.proposalAngle && typeof art.proposalAngle === 'string');

    assert.ok(art.englishPitch.length <= 240, `englishPitch too long on ${art.id}`);
    assert.ok(art.clientUseCase.length <= 180, `clientUseCase too long on ${art.id}`);
    assert.ok(art.editPromise.length <= 180, `editPromise too long on ${art.id}`);
    assert.ok(art.proposalAngle.length <= 180, `proposalAngle too long on ${art.id}`);

    const text = `${art.clientUseCase} ${art.editPromise} ${art.englishPitch} ${art.proposalAngle}`;
    assert.doesNotMatch(text, /\b(100%|300%|5 sao|\$\d+|\d+k views)\b/i);
  });
});

test('defines MP4_GATE with 5 strict human verification items', () => {
  assert.equal(MP4_GATE.length, 5);
  assert.deepEqual(MP4_GATE, [
    'exported-mp4',
    'watched-end-to-end',
    'audio-reviewed',
    'subtitle-reviewed',
    'org-clock-updated',
  ]);
});

test('defines ACTION_GATE with 3 strict verification items', () => {
  assert.equal(ACTION_GATE.length, 3);
  assert.deepEqual(ACTION_GATE, [
    'real-input-recorded',
    'owner-reviewed',
    'next-action-clear',
  ]);
});

test('countdown calculation calculates positive remaining time accurately', () => {
  const refDate = new Date('2026-10-28T12:00:00Z');
  const targetDate = new Date('2026-10-30T15:30:00Z');
  const result = computeCountdown(targetDate, refDate);

  assert.equal(result.isPast, false);
  assert.equal(result.days, 2);
  assert.equal(result.hours, 3);
  assert.equal(result.minutes, 30);
});

test('countdown calculation handles past dates honestly', () => {
  const refDate = new Date('2027-03-01T00:00:00Z');
  const result = computeCountdown(TET_DATE, refDate);

  assert.equal(result.isPast, true);
  assert.equal(result.days, 0);
  assert.equal(result.formatted, 'Đã đến hạn');
});

test('adapter fallback returns empty unverified state in node/SSR', () => {
  const state = loadLocalVerificationState();
  assert.deepEqual(state.approvedReelIds, []);
  assert.deepEqual(state.checkedGateKeys, {});
  assert.equal(state.activeReelId, 'reel-01');
});
