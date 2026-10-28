import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  CheckCircle2,
  Film,
  X,
  Download,
  CheckSquare,
  Square,
  Compass,
} from 'lucide-react';
import { ReelArtifact, formatSmpteTimecode } from '../utils/reelMath';
import { MP4_GATE, MP4_GATE_LABELS, Mp4GateItem } from '../data/roadmapAdapter';

interface ArtifactInspectorModalProps {
  reel: ReelArtifact;
  isApproved: boolean;
  checkedGates?: string[];
  onToggleGate?: (gateKey: string) => void;
  onToggleApprove: (reelId: string) => void;
  onSelectReelByIndex: (slotIndex: number) => void;
  onClose?: () => void;
}

export const ArtifactInspectorModal: React.FC<ArtifactInspectorModalProps> = ({
  reel,
  isApproved,
  checkedGates = [],
  onToggleGate,
  onToggleApprove,
  onSelectReelByIndex,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [frameOffset, setFrameOffset] = useState(0);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setFrameOffset(0);
  }, [reel.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setFrameOffset((prev) => (prev + 1) % 720);
    }, 1000 / 24);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  // Draw procedural vertical 9:16 mobile canvas simulation with timecode & audio level monitor
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // Frame window (simulating vertical short/reel canvas)
    const frameW = 280;
    const frameH = h - 32;
    const frameX = (w - frameW) / 2;
    const frameY = 16;

    const grad = ctx.createLinearGradient(0, frameY, 0, frameY + frameH);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, reel.tapeTintHex);
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(frameX, frameY, frameW, frameH);

    // Border line around video frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(frameX, frameY, frameW, frameH);

    // Dynamic timeline pulse circle in center
    const cx = w / 2;
    const cy = h / 2;
    const pulseRadius = 38 + Math.sin(frameOffset * 0.08) * 6;

    ctx.strokeStyle = reel.accentHex;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshair target
    ctx.strokeStyle = 'rgba(244, 244, 245, 0.18)';
    ctx.beginPath();
    ctx.moveTo(frameX, cy);
    ctx.lineTo(frameX + frameW, cy);
    ctx.moveTo(cx, frameY);
    ctx.lineTo(cx, frameY + frameH);
    ctx.stroke();

    // Sound level bars on left side
    const barCount = 14;
    const barX = frameX - 42;
    for (let b = 0; b < barCount; b++) {
      const barH = 5;
      const barY = frameY + frameH - b * 8 - 10;
      const level = Math.sin((frameOffset + b * 10) * 0.1) * 0.5 + 0.5;
      ctx.fillStyle = b > 11 ? '#ef4444' : b > 8 ? '#f59e0b' : '#10b981';
      ctx.globalAlpha = level > 0.4 ? 0.9 : 0.25;
      ctx.fillRect(barX, barY, 18, barH);
    }
    ctx.globalAlpha = 1.0;

    // Timecode burn-in
    const baseHour = reel.slotIndex + 1;
    const tc = formatSmpteTimecode(frameOffset, baseHour, reel.fps);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(`${reel.code} · ${reel.niche ?? 'Video Commercial'}`, frameX + 12, frameY + 22);

    ctx.fillStyle = reel.accentHex;
    ctx.font = '600 15px "JetBrains Mono", monospace';
    ctx.fillText(`TC ${tc}`, frameX + 12, frameY + frameH - 14);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('DaVinci Resolve Rec.709-A', frameX + 12, frameY + frameH - 32);
  }, [frameOffset, reel]);

  const baseHour = reel.slotIndex + 1;
  const currentTimecode = formatSmpteTimecode(frameOffset, baseHour, reel.fps);

  return (
    <section
      aria-label={`Chi tiết Artifact MP4: ${reel.title}`}
      data-testid="active-artifact-inspector"
      className="rounded-2xl border p-4 sm:p-6 space-y-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      {/* Inspector Top Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <div className="min-w-0">
          <div
            className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular"
            style={{ color: 'var(--text-muted)' }}
          >
            <Film className="w-3.5 h-3.5" style={{ color: reel.accentHex }} />
            <span style={{ color: reel.accentHex }}>{reel.code}</span>
            <span aria-hidden="true">·</span>
            <span>Artifact MP4 thực chiến</span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[200px]" style={{ color: 'var(--text-dim)' }}>
              {reel.mp4Path.replace('/artifacts/', '')}
            </span>
          </div>
          <h2
            className="text-lg sm:text-xl font-display font-bold mt-1 break-words"
            style={{ color: 'var(--text-primary)' }}
          >
            {reel.title}: {reel.subtitle}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToggleApprove(reel.id)}
            className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
            style={{
              backgroundColor: isApproved ? 'var(--accent-emerald-wash)' : 'var(--accent-primary)',
              color: isApproved ? 'var(--accent-emerald)' : 'var(--bg-surface)',
              border: isApproved ? '1px solid var(--accent-emerald)' : 'none',
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isApproved ? 'Đã kiểm duyệt đạt chuẩn' : 'Xác nhận đạt chuẩn (Sign-Off)'}
          </button>

          <a
            href={reel.mp4Path}
            download={`${reel.id}.mp4`}
            className="min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-600"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-canvas)',
              color: 'var(--text-primary)',
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Tải MP4 ({reel.fileSize})
          </a>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng bảng chi tiết"
              className="min-h-[44px] min-w-[44px] p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
              style={{
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Canvas Preview & Transport */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
          <div
            className="relative rounded-xl overflow-hidden border bg-slate-950 flex items-center justify-center"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <canvas
              ref={previewCanvasRef}
              width={540}
              height={270}
              className="w-full h-[240px] object-contain block"
              aria-label={`Khung hình mô phỏng timeline DaVinci Resolve cho ${reel.mp4Path}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectReelByIndex((reel.slotIndex + 3) % 4)}
                className="min-h-[44px] px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Reel trước đó"
              >
                <SkipBack className="w-3.5 h-3.5" />
                Reel trước
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="min-h-[44px] px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                style={{
                  borderColor: 'var(--border-active)',
                  backgroundColor: 'var(--accent-primary-wash)',
                  color: 'var(--accent-primary)',
                }}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'Tạm dừng' : 'Phát thử MP4'}
              </button>

              <button
                type="button"
                onClick={() => onSelectReelByIndex((reel.slotIndex + 1) % 4)}
                className="min-h-[44px] px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-primary)',
                }}
                aria-label="Reel tiếp theo"
              >
                Reel tiếp
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs font-mono-tabular" style={{ color: 'var(--text-secondary)' }}>
              Timecode: <span style={{ color: reel.accentHex }}>{currentTimecode}</span> · {reel.fps} FPS
            </div>
          </div>
        </div>

        {/* Right Column: MP4_GATE Human Checklist & Technical Contract */}
        <div
          className="lg:col-span-6 rounded-xl border p-4 sm:p-5 flex flex-col justify-between space-y-4"
          style={{
            backgroundColor: 'var(--bg-canvas)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div>
            <div
              className="flex items-center justify-between gap-2 pb-2.5 border-b"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <span className="text-xs font-mono-tabular font-semibold" style={{ color: 'var(--text-dim)' }}>
                Bộ 5 tiêu chuẩn kiểm chứng evidence (MP4_GATE)
              </span>
              <span className="text-xs font-mono-tabular font-bold" style={{ color: reel.accentHex }}>
                {checkedGates.length}/5 tiêu chí
              </span>
            </div>

            {/* Interactive Human Gate Checklist */}
            <div className="mt-3 space-y-2">
              {MP4_GATE.map((gateKey: Mp4GateItem) => {
                const isChecked = checkedGates.includes(gateKey);
                const info = MP4_GATE_LABELS[gateKey];
                return (
                  <button
                    key={gateKey}
                    type="button"
                    onClick={() => onToggleGate?.(gateKey)}
                    className="w-full min-h-[44px] p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
                    style={{
                      backgroundColor: isChecked ? 'var(--accent-emerald-wash)' : 'var(--bg-surface)',
                      borderColor: isChecked ? 'var(--accent-emerald)' : 'var(--border-hairline)',
                    }}
                  >
                    <div
                      className="mt-0.5 shrink-0"
                      style={{ color: isChecked ? 'var(--accent-emerald)' : 'var(--text-muted)' }}
                    >
                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-xs font-medium"
                        style={{ color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                        {info.label}
                      </div>
                      <div className="text-[11px] mt-0.5 line-clamp-1" style={{ color: 'var(--text-dim)' }}>
                        {info.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* DaVinci Resolve Technical Specifications */}
            <dl
              className="mt-4 space-y-2 text-xs font-mono-tabular pt-3 border-t"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div className="flex justify-between py-0.5">
                <dt style={{ color: 'var(--text-dim)' }}>Định dạng khung hình</dt>
                <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>{reel.formatSpec}</dd>
              </div>
              <div className="flex justify-between py-0.5">
                <dt style={{ color: 'var(--text-dim)' }}>Color management</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>{reel.colorSpace}</dd>
              </div>
              <div className="flex justify-between py-0.5">
                <dt style={{ color: 'var(--text-dim)' }}>Tổng số khung hình</dt>
                <dd style={{ color: 'var(--text-secondary)' }}>
                  {reel.framesCount.toLocaleString()} frames ({reel.duration})
                </dd>
              </div>
              <div className="flex justify-between py-0.5">
                <dt style={{ color: 'var(--text-dim)' }}>Nguồn raw thực tế</dt>
                <dd
                  className="truncate max-w-[240px]"
                  title={reel.rawFootagePath}
                  style={{ color: 'var(--text-muted)' }}
                >
                  {reel.rawFootagePath?.split('/').pop() ?? 'Footage RAW'}
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="pt-3 border-t text-xs flex items-start gap-2"
            style={{
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-secondary)',
            }}
          >
            <Compass className="w-4 h-4 shrink-0 mt-0.5" style={{ color: reel.accentHex }} />
            <div>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Chiến lược thực hành: </span>
              {reel.strategyNote ?? reel.nextActionDetail}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
