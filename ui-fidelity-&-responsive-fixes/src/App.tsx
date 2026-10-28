/**
 * Elite Roadmap — Commercial DaVinci Resolve Console (React Candidate)
 * Focused on 4 real client-grade Reel artifacts before Tet 2027.
 * Dribbble-inspired light task-management workspace.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Film,
  Play,
  ShieldCheck,
  Workflow,
  Download,
  User,
  Sliders,
  X,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { ReelArtifact } from './utils/reelMath';
import { ReelRackStage } from './components/ReelRackStage';
import { ArtifactInspectorModal } from './components/ArtifactInspectorModal';
import {
  REAL_REEL_ARTIFACTS,
  REAL_ROADMAP_PHASES,
  TET_DATE,
  JOB_PAYOUT_DEADLINE,
  computeCountdown,
  loadLocalVerificationState,
  saveLocalVerificationState,
  UserVerificationState,
} from './data/roadmapAdapter';

export default function App() {
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [verificationState, setVerificationState] = useState<UserVerificationState>(() =>
    loadLocalVerificationState()
  );

  const [activeTab, setActiveTab] = useState<'roadmap' | 'jit' | 'duo'>('roadmap');

  const [force2DFallback, setForce2DFallback] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('fallback') === '2d' || params.get('mode') === '2d';
  });

  const [exportBanner, setExportBanner] = useState<string | null>(null);
  const [nowDate, setNowDate] = useState(() => new Date());
  const [inspectorOpen, setInspectorOpen] = useState(false);

  // Mark initial loaded
  useEffect(() => {
    setInitialLoaded(true);
  }, []);

  // Sync state to local storage
  useEffect(() => {
    if (initialLoaded) {
      saveLocalVerificationState(verificationState);
    }
  }, [verificationState, initialLoaded]);

  // Update countdown clock every 30 seconds
  useEffect(() => {
    const timer = window.setInterval(() => setNowDate(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  // Keyboard escape closes inspector drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectorOpen) {
        setInspectorOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectorOpen]);

  const { approvedReelIds, checkedGateKeys, activeReelId } = verificationState;

  const activeReel = useMemo(() => {
    return (
      REAL_REEL_ARTIFACTS.find((r) => r.id === activeReelId) ?? REAL_REEL_ARTIFACTS[0]
    );
  }, [activeReelId]);

  const countdownPayout = useMemo(
    () => computeCountdown(JOB_PAYOUT_DEADLINE, nowDate),
    [nowDate]
  );
  const countdownTet = useMemo(() => computeCountdown(TET_DATE, nowDate), [nowDate]);

  const handleSelectReel = (reel: ReelArtifact, openInspector = false) => {
    setVerificationState((prev) => ({ ...prev, activeReelId: reel.id }));
    if (openInspector) {
      setInspectorOpen(true);
    }
  };

  const handleSelectReelByIndex = (slotIndex: number) => {
    const target = REAL_REEL_ARTIFACTS[slotIndex];
    if (target) {
      setVerificationState((prev) => ({ ...prev, activeReelId: target.id }));
    }
  };

  const handleToggleApprove = (reelId: string) => {
    setVerificationState((prev) => {
      const isApproved = prev.approvedReelIds.includes(reelId);
      const nextApproved = isApproved
        ? prev.approvedReelIds.filter((id) => id !== reelId)
        : [...prev.approvedReelIds, reelId];
      return { ...prev, approvedReelIds: nextApproved };
    });
  };

  const handleToggleGate = (gateKey: string) => {
    setVerificationState((prev) => {
      const currentList = prev.checkedGateKeys[activeReel.id] ?? [];
      const nextList = currentList.includes(gateKey)
        ? currentList.filter((k) => k !== gateKey)
        : [...currentList, gateKey];

      const nextChecked = {
        ...prev.checkedGateKeys,
        [activeReel.id]: nextList,
      };

      // Automatically sign off reel when all 5 gates are completed
      let nextApproved = [...prev.approvedReelIds];
      if (nextList.length === 5 && !nextApproved.includes(activeReel.id)) {
        nextApproved.push(activeReel.id);
      } else if (nextList.length < 5 && nextApproved.includes(activeReel.id)) {
        nextApproved = nextApproved.filter((id) => id !== activeReel.id);
      }

      return {
        ...prev,
        checkedGateKeys: nextChecked,
        approvedReelIds: nextApproved,
      };
    });
  };

  const handleOpenInspector = () => {
    setInspectorOpen(true);
  };

  const handleExportManifest = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    setExportBanner(
      `Đã xuất biên bản kiểm duyệt: ${approvedReelIds.length}/4 Reel MP4 đã ký xác nhận lúc ${timestamp}.`
    );
  };

  const currentReelGates = checkedGateKeys[activeReel.id] ?? [];

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Desktop Left Sidebar Navigation */}
      <aside
        aria-label="Thanh điều hướng dự án"
        className="hidden md:flex flex-col w-64 shrink-0 border-r min-h-screen p-5 justify-between"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-surface)',
              }}
            >
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div
                className="font-display font-bold text-base tracking-tight leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                Elite Roadmap
              </div>
              <div className="text-xs font-mono-tabular" style={{ color: 'var(--text-muted)' }}>
                DaVinci Resolve
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav aria-label="Điều hướng các phân khu" className="space-y-1 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 transition-colors cursor-pointer focus-visible:outline-2"
              style={{
                backgroundColor: activeTab === 'roadmap' ? 'var(--accent-primary-wash)' : 'transparent',
                color: activeTab === 'roadmap' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4" />
                <span>Bàn làm việc 4 Reel</span>
              </div>
              {approvedReelIds.length > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono-tabular font-bold"
                  style={{
                    backgroundColor: 'var(--accent-emerald-wash)',
                    color: 'var(--accent-emerald)',
                  }}
                >
                  {approvedReelIds.length}/4
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('jit')}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between gap-3 transition-colors cursor-pointer focus-visible:outline-2"
              style={{
                backgroundColor: activeTab === 'jit' ? 'var(--accent-primary-wash)' : 'transparent',
                color: activeTab === 'jit' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4" />
                <span>Tra cứu JIT</span>
              </div>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded border"
                style={{
                  borderColor: 'var(--border-hairline)',
                  color: 'var(--text-dim)',
                }}
              >
                Kỹ thuật
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('duo')}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between gap-3 transition-colors cursor-pointer focus-visible:outline-2 whitespace-nowrap"
              style={{
                backgroundColor: activeTab === 'duo' ? 'var(--accent-primary-wash)' : 'transparent',
                color: activeTab === 'duo' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Hai người</span>
              </div>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded border"
                style={{
                  borderColor: 'var(--border-hairline)',
                  color: 'var(--text-dim)',
                }}
              >
                Đồng hành
              </span>
            </button>
          </nav>

          {/* Quick Reel Selector in Sidebar */}
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
            <div className="text-[11px] font-mono-tabular font-medium mb-2.5" style={{ color: 'var(--text-dim)' }}>
              Tiến độ 4 cuộn phim
            </div>
            <div className="space-y-1">
              {REAL_REEL_ARTIFACTS.map((reel) => {
                const isSelected = reel.id === activeReelId;
                const isApproved = approvedReelIds.includes(reel.id);
                const gates = checkedGateKeys[reel.id] ?? [];
                return (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() => handleSelectReel(reel, false)}
                    className="w-full min-h-[44px] px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer focus-visible:outline-2"
                    style={{
                      backgroundColor: isSelected ? 'var(--accent-primary-wash)' : 'transparent',
                      color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: reel.accentHex }}
                      />
                      <span className="truncate text-xs font-medium">
                        {reel.code} {reel.title.replace(/^Reel \d+: /, '')}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-mono-tabular shrink-0"
                      style={{
                        color: isApproved ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      }}
                    >
                      {isApproved ? 'Đã duyệt' : `${gates.length}/5`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--border-hairline)' }}>
          <button
            type="button"
            onClick={handleExportManifest}
            className="w-full min-h-[44px] px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-2"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-primary)',
            }}
          >
            <Download className="w-4 h-4" />
            <span>Xuất biên bản QC</span>
          </button>

          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: 'var(--accent-primary-wash)',
                  color: 'var(--accent-primary)',
                }}
              >
                L
              </div>
              <div className="truncate">
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Lang Phạm Ngọc
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  Dựng phim DaVinci
                </div>
              </div>
            </div>
            <span className="preview-dot shrink-0" title="Chế độ xem trước" />
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header
        className="md:hidden flex items-center justify-between gap-3 px-4 py-3 border-b"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-surface)',
            }}
          >
            <Film className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Elite Roadmap
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded-md text-xs font-mono-tabular font-bold"
            style={{
              backgroundColor: `${activeReel.accentHex}18`,
              color: activeReel.accentHex,
            }}
          >
            {activeReel.code}
          </span>
          <button
            type="button"
            onClick={handleExportManifest}
            aria-label="Xuất biên bản QC"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl border flex items-center justify-center cursor-pointer"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-primary)',
            }}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workbench Area */}
      <main className="flex-1 min-w-0 flex flex-col pb-20 md:pb-10 overflow-x-hidden">
        {/* Desktop Top Workbench Bar */}
        <div
          className="hidden md:flex items-center justify-between px-6 lg:px-8 py-3.5 border-b"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>Không gian làm việc</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              Lộ trình 4 Reel Commercial
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tabular border"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-secondary)',
              }}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Tết 2027: {countdownTet.days} ngày</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                {approvedReelIds.length}/4 hoàn thiện
              </span>
            </div>
          </div>
        </div>

        {/* Export status banner */}
        {exportBanner && (
          <div
            role="status"
            className="px-4 sm:px-8 py-3 border-b text-xs font-mono-tabular flex items-center justify-between gap-4"
            style={{
              backgroundColor: 'var(--accent-primary-wash)',
              borderColor: 'var(--border-active)',
              color: 'var(--accent-primary)',
            }}
          >
            <span className="font-medium">{exportBanner}</span>
            <button
              type="button"
              onClick={() => setExportBanner(null)}
              className="min-h-[44px] px-3 py-1 text-xs underline whitespace-nowrap shrink-0 cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
            >
              Đóng
            </button>
          </div>
        )}

        {/* Workbench Container */}
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 min-w-0">
          {/* Tab 1: Roadmap Core View */}
          {activeTab === 'roadmap' && (
            <>
              {/* Today / Current Task is the strongest visual priority */}
              <section id="hero" aria-label="Việc cần làm ngay" className="min-w-0">
                <aside
                  id="next-action-panel"
                  data-testid="next-action-panel"
                  aria-label="Bảng hành động tiếp theo trên DaVinci"
                  className="next-action-focus rounded-2xl border p-6 sm:p-7 flex flex-col min-w-0 relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  {/* Top meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 font-mono-tabular text-xs">
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-bold tracking-tight"
                      style={{
                        backgroundColor: `${activeReel.accentHex}18`,
                        color: activeReel.accentHex,
                      }}
                    >
                      {activeReel.code} · {activeReel.niche}
                    </span>
                    <span className="text-xs font-mono-tabular font-medium" style={{ color: 'var(--text-muted)' }}>
                      {currentReelGates.length}/5 Gate hoàn thành
                    </span>
                  </div>

                  {/* Strongest visual element: Hero title */}
                  <h1
                    id="hero-title"
                    data-testid="hero-title"
                    className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl mt-3 tracking-tight break-words min-w-0"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {activeReel.nextActionLabel}
                  </h1>

                  {/* Subtitle */}
                  <p
                    id="hero-subtitle"
                    data-testid="hero-subtitle"
                    className="font-sans-body mt-2 text-sm sm:text-base leading-relaxed break-words"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {activeReel.title}: {activeReel.nextActionDetail}
                  </p>

                  {/* CTA Row */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-1">
                    <button
                      type="button"
                      onClick={handleOpenInspector}
                      data-primary-action="open-gate-checklist"
                      className="min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer focus-visible:outline-2"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--bg-surface)',
                      }}
                    >
                      <span>Kiểm tra 5 gate</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono-tabular" style={{ color: 'var(--text-dim)' }}>
                      <span>{activeReel.formatSpec}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeReel.duration}</span>
                    </div>
                  </div>
                </aside>

                {/* Retain DOM hook for tests without polluting primary viewport */}
                <div id="countdown-badges" className="sr-only" data-testid="countdown-badges" aria-label="Các mốc thời gian">
                  {countdownPayout.formatted} {countdownTet.formatted} {approvedReelIds.length}/4
                </div>
              </section>

              {/* Three.js Framed Reel Rack Stage */}
              <section
                aria-label="Khung giá phim 3D Reel Rack"
                className="min-w-0"
              >
                <ReelRackStage
                  selectedReelId={activeReelId}
                  onSelectReel={handleSelectReel}
                  force2DFallback={force2DFallback}
                  onToggle2DFallback={() => setForce2DFallback((prev) => !prev)}
                />
              </section>

              {/* Four Real Reel Artifacts as Concise Project Cards */}
              <section aria-label="Danh sách 4 cuộn phim thương mại" className="space-y-3 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Dự án 4 Reel thực chiến
                  </h2>
                  <span className="text-xs font-mono-tabular" style={{ color: 'var(--text-muted)' }}>
                    Chọn cuộn phim để kiểm tra
                  </span>
                </div>

                <div
                  id="semantic-cards"
                  data-testid="semantic-reel-cards"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
                >
                  {REAL_REEL_ARTIFACTS.map((reel) => {
                    const isSelected = reel.id === activeReelId;
                    const isApproved = approvedReelIds.includes(reel.id);
                    const reelGates = checkedGateKeys[reel.id] ?? [];

                    return (
                      <article
                        key={reel.id}
                        data-testid={`semantic-card-${reel.id}`}
                        data-artifact-mp4={reel.mp4Path}
                        className="rounded-2xl border flex flex-col justify-between transition-colors shadow-xs"
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-primary-wash)' : 'var(--bg-surface)',
                          borderColor: isSelected ? 'var(--border-active)' : 'var(--border-hairline)',
                        }}
                      >
                        {/* Primary Card Click Target */}
                        <button
                          type="button"
                          onClick={() => handleSelectReel(reel, false)}
                          aria-pressed={isSelected}
                          className="w-full p-4 text-left flex flex-col justify-between flex-1 cursor-pointer rounded-t-2xl focus-visible:outline-2"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular">
                              <span className="font-bold" style={{ color: reel.accentHex }}>
                                {reel.code}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded-md text-[11px] font-medium"
                                style={{
                                  backgroundColor: isApproved ? 'var(--accent-emerald-wash)' : 'var(--bg-canvas)',
                                  color: isApproved ? 'var(--accent-emerald)' : 'var(--text-muted)',
                                  border: isApproved ? '1px solid var(--accent-emerald)' : '1px solid var(--border-hairline)',
                                }}
                              >
                                {isApproved ? 'Đã duyệt' : `${reelGates.length}/5 Gate`}
                              </span>
                            </div>

                            <h3
                              className="text-base font-display font-bold mt-2 break-words"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {reel.title.replace(/^Reel \d+: /, '')}
                            </h3>

                            <p
                              className="font-sans-body mt-1 text-xs line-clamp-2"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              {reel.subtitle}
                            </p>
                          </div>

                          <div
                            className="mt-4 pt-2.5 border-t w-full flex items-center justify-between gap-2 text-xs font-mono-tabular"
                            style={{
                              borderColor: 'var(--border-hairline)',
                              color: 'var(--text-dim)',
                            }}
                          >
                            <span className="truncate max-w-[140px]" style={{ color: 'var(--text-muted)' }}>
                              {reel.niche}
                            </span>
                            <span
                              className="font-medium whitespace-nowrap shrink-0"
                              style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                            >
                              {isSelected ? 'Đang chọn' : 'Chọn Reel'}
                            </span>
                          </div>
                        </button>

                        {/* Secondary Card Action Row */}
                        <div
                          className="p-3 border-t flex items-center justify-between gap-2"
                          style={{ borderColor: 'var(--border-hairline)' }}
                        >
                          <button
                            type="button"
                            onClick={() => handleSelectReel(reel, true)}
                            className="min-h-[44px] flex-1 px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors focus-visible:outline-2"
                            style={{
                              backgroundColor: 'var(--bg-canvas)',
                              borderColor: 'var(--border-hairline)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            <Play className="w-3.5 h-3.5" style={{ color: reel.accentHex }} />
                            <span>Chi tiết</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleApprove(reel.id)}
                            className="min-h-[44px] flex-1 px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors focus-visible:outline-2"
                            style={{
                              backgroundColor: isApproved ? 'var(--accent-emerald-wash)' : 'var(--bg-canvas)',
                              borderColor: isApproved ? 'var(--accent-emerald)' : 'var(--border-hairline)',
                              color: isApproved ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                            }}
                            aria-pressed={isApproved}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isApproved ? 'Đã ký' : 'Ký duyệt'}</span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* Secondary Domain Sections: Pipeline Spine & QC Ledger */}
              <section aria-label="Thông tin tiến trình phụ trợ" className="space-y-4 pt-2 min-w-0">
                {/* Pipeline Spine: 7 Phases of ROADMAP_SPRINTS_V2 */}
                <details
                  id="pipeline-spine"
                  className="rounded-2xl border overflow-hidden shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  <summary className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      <Workflow className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                      <div>
                        <h2 className="text-sm sm:text-base font-display font-semibold break-words min-w-0" style={{ color: 'var(--text-primary)' }}>
                          Tiến trình 7 phase thực chiến (ROADMAP_SPRINTS_V2)
                        </h2>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          Từ Phase 0 (Chuẩn bị context) đến Phase 6 (Hoàn thiện 4 Reel) • Reel 2 xong → Profile + tìm job ngay
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono-tabular px-2.5 py-1 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      7 Phase
                    </span>
                  </summary>
                  <div className="p-4 sm:p-5 pt-0 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mt-4">
                      {REAL_ROADMAP_PHASES.map((phase) => {
                        const isRelatedToActiveReel =
                          (phase.id === 'reel-1' && activeReel.id === 'reel-01') ||
                          (phase.id === 'reel-2' && activeReel.id === 'reel-02') ||
                          (phase.id === 'reel-3' && activeReel.id === 'reel-03') ||
                          (phase.id === 'reel-4' && activeReel.id === 'reel-04');

                        return (
                          <div
                            key={phase.id}
                            className="rounded-xl border p-3 flex flex-col justify-between text-xs transition-colors"
                            style={{
                              backgroundColor: isRelatedToActiveReel ? 'var(--accent-primary-wash)' : 'var(--bg-canvas)',
                              borderColor: isRelatedToActiveReel ? 'var(--border-active)' : 'var(--border-hairline)',
                            }}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 font-mono-tabular">
                                <span className="font-bold text-[11px]" style={{ color: phase.color }}>
                                  P{phase.phaseNumber}
                                </span>
                                <span className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                                  {phase.pill}
                                </span>
                              </div>
                              <div className="font-semibold mt-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                                {phase.title.replace(/^PHASE \d+: /, '')}
                              </div>
                              <div className="text-[11px] mt-1 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                                {phase.desc}
                              </div>
                            </div>
                            <div
                              className="mt-3 pt-2 border-t font-mono-tabular text-[11px] flex items-center justify-between"
                              style={{ borderColor: 'var(--border-hairline)', color: 'var(--text-muted)' }}
                            >
                              <span>{phase.tasks.length} task</span>
                              <span style={{ color: phase.color }}>
                                {phase.tasks[0]?.isOutput ? 'MP4 target' : 'Gate task'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </details>

                {/* Archival QC Ledger Table */}
                <details
                  id="qc-ledger"
                  className="rounded-2xl border overflow-hidden shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  <summary className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5" style={{ color: 'var(--accent-emerald)' }} />
                      <div>
                        <h2 className="text-sm sm:text-base font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                          Biên bản kiểm chứng evidence và QC 4 Reel
                        </h2>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          Bảng đối chiếu định dạng, đường dẫn MP4 và trạng thái ký duyệt
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono-tabular px-2.5 py-1 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {approvedReelIds.length}/4 đã ký
                    </span>
                  </summary>
                  <div className="p-4 sm:p-5 pt-0 border-t" style={{ borderColor: 'var(--border-hairline)' }}>
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full text-left border-collapse text-sm font-mono-tabular">
                        <thead>
                          <tr
                            className="border-b text-xs"
                            style={{
                              borderColor: 'var(--border-hairline)',
                              color: 'var(--text-dim)',
                            }}
                          >
                            <th className="py-2.5 pr-4">Slot</th>
                            <th className="py-2.5 px-4">Tên reel</th>
                            <th className="py-2.5 px-4">Đường dẫn MP4</th>
                            <th className="py-2.5 px-4">Định dạng</th>
                            <th className="py-2.5 px-4">Tiến độ gate</th>
                            <th className="py-2.5 pl-4 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {REAL_REEL_ARTIFACTS.map((reel) => {
                            const isSelected = reel.id === activeReelId;
                            const isApproved = approvedReelIds.includes(reel.id);
                            const gates = checkedGateKeys[reel.id] ?? [];
                            return (
                              <tr
                                key={reel.id}
                                className="border-b transition-colors"
                                style={{
                                  borderColor: 'var(--border-hairline)',
                                  backgroundColor: isSelected ? 'var(--accent-primary-wash)' : 'transparent',
                                }}
                              >
                                <td className="py-2.5 pr-4 font-semibold" style={{ color: reel.accentHex }}>
                                  {reel.code}
                                </td>
                                <td className="py-2.5 px-4 font-sans" style={{ color: 'var(--text-primary)' }}>
                                  <div className="font-medium">{reel.title}</div>
                                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{reel.niche}</div>
                                </td>
                                <td className="py-2.5 px-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                  {reel.mp4Path}
                                </td>
                                <td className="py-2.5 px-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                                  {reel.formatSpec}
                                </td>
                                <td className="py-2.5 px-4">
                                  <span
                                    className="px-2.5 py-0.5 rounded-md text-xs font-medium"
                                    style={{
                                      backgroundColor: isApproved ? 'var(--accent-emerald-wash)' : 'var(--bg-canvas)',
                                      color: isApproved ? 'var(--accent-emerald)' : 'var(--text-muted)',
                                      border: isApproved ? '1px solid var(--accent-emerald)' : '1px solid var(--border-hairline)',
                                    }}
                                  >
                                    {isApproved ? 'Đã duyệt' : `${gates.length}/5 Gate`}
                                  </span>
                                </td>
                                <td className="py-2.5 pl-4 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleSelectReel(reel, true)}
                                    className="min-h-[44px] px-3.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2"
                                    style={{
                                      borderColor: isSelected ? 'var(--border-active)' : 'var(--border-hairline)',
                                      backgroundColor: 'var(--bg-surface)',
                                      color: isApproved ? 'var(--accent-emerald)' : 'var(--text-primary)',
                                    }}
                                  >
                                    {isSelected ? 'Đang kiểm tra' : 'Xem chi tiết'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              </section>
            </>
          )}

          {/* Tab 2: JIT Reference View */}
          {activeTab === 'jit' && (
            <section className="py-4 space-y-4 min-w-0">
              <div
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-hairline)' }}>
                  <div>
                    <h2 className="text-lg font-display font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      <Sliders className="w-5 h-5 text-blue-600" />
                      <span>JIT Reference (Kỹ thuật tra cứu khi cần)</span>
                    </h2>
                    <p className="font-sans-body mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      Nguyên tắc Just-In-Time: Chỉ học và tra cứu hiệu ứng khi Reel thực tế yêu cầu.
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono-tabular px-2.5 py-1 rounded-lg border font-medium"
                    style={{
                      borderColor: 'var(--border-hairline)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Read-only
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                  <div
                    className="rounded-xl border p-4 transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <div className="text-xs font-mono-tabular font-bold" style={{ color: 'var(--accent-primary)' }}>
                      Kỹ thuật #1
                    </div>
                    <h3 className="font-bold text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                      Speed Ramp & Optical Flow
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Kỹ xảo tăng giảm tốc độ mượt mà bằng Speed Curve và nội suy khung hình Speed Warp khi dựng Reel thể thao / Gym.
                    </p>
                    <div className="mt-3 text-[11px] font-mono-tabular" style={{ color: 'var(--text-dim)' }}>
                      Áp dụng: Reel 4 Josh William
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-4 transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <div className="text-xs font-mono-tabular font-bold" style={{ color: 'var(--accent-emerald)' }}>
                      Kỹ thuật #2
                    </div>
                    <h3 className="font-bold text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                      Depth Sandwich & B-Roll Cutaway
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Tách chủ thể bằng Magic Mask / Text kẹp giữa người và nền, phối hợp micro-motion cho video podcast authority.
                    </p>
                    <div className="mt-3 text-[11px] font-mono-tabular" style={{ color: 'var(--text-dim)' }}>
                      Áp dụng: Reel 2 Podcast Authority
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-4 transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <div className="text-xs font-mono-tabular font-bold" style={{ color: 'var(--accent-coral)' }}>
                      Kỹ thuật #3
                    </div>
                    <h3 className="font-bold text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                      Dynamic Zoom & Đồ họa số liệu
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Chuyển động zoom 1.05x chậm tự nhiên, hiển thị callout giá bán và thông số bất động sản tương phản cao.
                    </p>
                    <div className="mt-3 text-[11px] font-mono-tabular" style={{ color: 'var(--text-dim)' }}>
                      Áp dụng: Reel 3 Lâm Trần Real Estate
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Tab 3: Dual Mode View */}
          {activeTab === 'duo' && (
            <section className="py-4 space-y-4 min-w-0">
              <div
                className="rounded-2xl border p-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-hairline)' }}>
                  <div>
                    <h2 className="text-lg font-display font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      <User className="w-5 h-5 text-emerald-600" />
                      <span>Chế độ Hai người (Lang & Diễm)</span>
                    </h2>
                    <p className="font-sans-body mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      Đồng bộ tiến độ học song song giữa Lang và Diễm qua Firebase Realtime Database.
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono-tabular px-2.5 py-1 rounded-lg border font-medium"
                    style={{
                      borderColor: 'var(--border-hairline)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Seam Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div
                    className="rounded-xl border p-5 space-y-2"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        Tài khoản: Lang
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Mục tiêu: Đạt chuẩn 4 Reel MP4 thực chiến, nhận job freelance trước Tết 2027.
                    </p>
                    <div className="pt-2 text-xs font-mono-tabular font-medium" style={{ color: 'var(--accent-primary)' }}>
                      Tiến độ: {approvedReelIds.length}/4 Reel đã ký xác nhận
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-5 space-y-2"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-teal-500" />
                      <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        Tài khoản: Diễm
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Mục tiêu: Đồng hành học dựng phim DaVinci Resolve, kiểm tra chéo sản phẩm.
                    </p>
                    <div className="pt-2 text-xs font-mono-tabular" style={{ color: 'var(--text-dim)' }}>
                      Trạng thái: Đang kết nối adapter song song
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Slide-over Drawer for Artifact Inspector Modal */}
      {/* Backdrop */}
      {inspectorOpen && (
        <div
          className="fixed inset-0 z-40 drawer-overlay transition-opacity"
          onClick={() => setInspectorOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <aside
        id="artifact-inspector"
        aria-label="Bảng kiểm duyệt Artifact MP4"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl lg:max-w-2xl shadow-2xl flex flex-col motion-safe:transition-transform duration-300 ease-in-out ${
          inspectorOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-hairline)',
        }}
      >
        {/* Drawer Header */}
        <div
          className="p-4 sm:p-5 border-b flex items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <div className="min-w-0">
            <span className="text-xs font-mono-tabular font-bold" style={{ color: activeReel.accentHex }}>
              {activeReel.code} · Kiểm duyệt 5 Gate
            </span>
            <h2
              className="text-base sm:text-lg font-display font-bold truncate mt-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {activeReel.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setInspectorOpen(false)}
            aria-label="Đóng bảng chi tiết"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-2"
            style={{
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <ArtifactInspectorModal
            reel={activeReel}
            isApproved={approvedReelIds.includes(activeReel.id)}
            checkedGates={currentReelGates}
            onToggleGate={handleToggleGate}
            onToggleApprove={handleToggleApprove}
            onSelectReelByIndex={handleSelectReelByIndex}
            onClose={() => setInspectorOpen(false)}
          />
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Điều hướng nhanh điện thoại"
        className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around px-2 py-1 border-t"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className="flex-1 min-h-[44px] py-1 flex flex-col items-center justify-center text-[11px] font-medium transition-colors cursor-pointer"
          style={{
            color: activeTab === 'roadmap' ? 'var(--accent-primary)' : 'var(--text-muted)',
          }}
        >
          <Film className="w-4 h-4" />
          <span>Lộ trình</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('jit')}
          className="flex-1 min-h-[44px] py-1 flex flex-col items-center justify-center text-[11px] font-medium transition-colors cursor-pointer"
          style={{
            color: activeTab === 'jit' ? 'var(--accent-primary)' : 'var(--text-muted)',
          }}
        >
          <Sliders className="w-4 h-4" />
          <span>Tra cứu</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('duo')}
          className="flex-1 min-h-[44px] py-1 flex flex-col items-center justify-center text-[11px] font-medium transition-colors cursor-pointer"
          style={{
            color: activeTab === 'duo' ? 'var(--accent-primary)' : 'var(--text-muted)',
          }}
        >
          <User className="w-4 h-4" />
          <span>Hai người</span>
        </button>
      </nav>
    </div>
  );
}
