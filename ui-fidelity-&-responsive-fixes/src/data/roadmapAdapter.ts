/**
 * Elite Roadmap Data Adapter & Domain Contracts
 * Maps real curriculum, 4 commercial reel artifacts, 7-phase pipeline spine,
 * and human verification gates from DaVinci Resolve.
 */

export const TET_DATE = new Date('2027-02-05T23:59:59'); // 29 Tết Đinh Mùi
export const JOB_PAYOUT_DEADLINE = new Date('2026-12-25T23:59:59'); // Chốt hợp đồng để nhận lương trước Tết

export const MP4_GATE = [
  'exported-mp4',
  'watched-end-to-end',
  'audio-reviewed',
  'subtitle-reviewed',
  'org-clock-updated',
] as const;

export type Mp4GateItem = (typeof MP4_GATE)[number];

export const MP4_GATE_LABELS: Record<Mp4GateItem, { label: string; desc: string }> = {
  'exported-mp4': {
    label: 'Đã xuất file MP4 từ timeline',
    desc: 'Render master MP4 hoàn chỉnh từ timeline DaVinci Resolve do Lang trực tiếp kiểm soát.',
  },
  'watched-end-to-end': {
    label: 'Xem lại toàn bộ từ đầu đến cuối',
    desc: 'Kiểm tra playback toàn bộ không giật lag, không lỗi khung hình trên trình phát độc lập.',
  },
  'audio-reviewed': {
    label: 'Âm thanh cân bằng & Cắt sạch âm đuôi',
    desc: 'Kiểm tra voiceover rõ ràng, không nuốt đuôi từ, SFX hòa quyện giới hạn chuẩn dưới -1.0 dBTP.',
  },
  'subtitle-reviewed': {
    label: 'Phụ đề aesthetic & Đúng chính tả',
    desc: 'Text+ captions hiển thị đúng nhịp nói, không che khuất chủ thể chính, đúng ngữ pháp.',
  },
  'org-clock-updated': {
    label: 'Ghi nhận giờ làm việc thực tế',
    desc: 'Cập nhật giờ luyện tập và dựng timeline vào hệ thống ghi nhận thời gian sự thật.',
  },
};

export const ACTION_GATE = [
  'real-input-recorded',
  'owner-reviewed',
  'next-action-clear',
] as const;

export type ActionGateItem = (typeof ACTION_GATE)[number];

export const ACTION_GATE_LABELS: Record<ActionGateItem, { label: string; desc: string }> = {
  'real-input-recorded': {
    label: 'Ghi nhận dữ liệu thực tế',
    desc: 'Nhập thông tin profile, job listing hoặc proposal URL thực tế, không dùng số liệu giả định.',
  },
  'owner-reviewed': {
    label: 'Lang trực tiếp kiểm duyệt',
    desc: 'Chủ sở hữu trực tiếp thẩm định chất lượng và tính sẵn sàng của hồ sơ trước khi gửi đi.',
  },
  'next-action-clear': {
    label: 'Hành động tiếp theo rõ ràng',
    desc: 'Biết chính xác bước tiếp theo cần làm trên nền tảng khách hàng hoặc timeline DaVinci.',
  },
};

export interface RoadmapTask {
  id: string;
  title: string;
  duration: string;
  output: string;
  clientUseCase?: string;
  editPromise?: string;
  englishPitch?: string;
  proposalAngle?: string;
  isOutput: boolean;
  evidenceType: 'mp4' | 'gate' | 'action';
  curriculumRefs: string[];
  humanGate: readonly string[];
  strategyNote: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  desc: string;
  pill: string;
  color: string;
  tasks: RoadmapTask[];
}

export const REAL_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'setup',
    phaseNumber: 0,
    title: 'PHASE 0: XÁC NHẬN CONTEXT & EVIDENCE',
    desc: 'Xác định source, project và chuẩn kiểm chứng trước khi học hoặc dựng.',
    pill: 'Nền tảng',
    color: '#38bdf8',
    tasks: [
      {
        id: 'setup_context',
        title: 'Xác nhận source, project và ranh giới evidence',
        duration: '1 phiên',
        output: 'Xác nhận đúng đường dẫn RAW, project DaVinci và timeline; không ghi đè asset gốc; video mẫu chỉ dùng làm reference đối chiếu.',
        isOutput: false,
        evidenceType: 'gate',
        curriculumRefs: ['elite/0.2', 'elite/1.2/P3', 'Reel_01_CONTRACT.md'],
        humanGate: ['source-identified', 'timeline-context-confirmed', 'no-original-assets-overwritten'],
        strategyNote: 'Curriculum fact được dùng để tra cứu; project context và evidence phải do Lang xác nhận.',
      },
      {
        id: 'setup_reference_policy',
        title: 'Thiết lập nguyên tắc học JIT và kiểm tra hiện đại',
        duration: '1 phiên',
        output: 'Mỗi kỹ thuật được phân loại KEEP, UPDATE, OPTIONAL, DEFER hoặc HUMAN VALIDATION.',
        isOutput: false,
        evidenceType: 'gate',
        curriculumRefs: ['modern-reel-research-2026.md'],
        humanGate: ['teacher-baseline-separated', 'current-practice-noted', 'validation-needed-noted'],
        strategyNote: 'Không coi tiêu đề bài học hay claim thị trường là industry standard mặc định. Định hướng chiến lược dựa trên quan sát thực tế.',
      },
    ],
  },
  {
    id: 'reel-1',
    phaseNumber: 1,
    title: 'PHASE 1: REEL 1 — MATTHIEW ADAMS',
    desc: 'Xuất MP4 đầu tiên do Lang tự dựng và kiểm soát trên timeline.',
    pill: 'Artifact 1',
    color: '#10b981',
    tasks: [
      {
        id: 'reel_01_artifact',
        title: 'Dựng và export Reel 1 Matthiew Adams',
        duration: 'P3 → P8.1 + thực hành',
        output: 'MP4 talking-head B2B/Marketing do Lang tự dựng; cắt thô dứt khoát không phạm âm đuôi, sub aesthetic, 2 B-roll cutaway.',
        clientUseCase: 'Video talking-head ngắn cho nhà sáng lập, chuyên gia B2B và agency marketing cần truyền tải thông điệp súc tích, giữ chân người xem trên LinkedIn, X và Shorts.',
        editPromise: 'Cắt thô dứt khoát không nuốt âm đuôi, Text+ captions thẩm mỹ, 2 B-roll cutaway chuẩn ngữ cảnh và sound balance sạch sẽ dưới -1.0 dBTP.',
        englishPitch: 'I turn your raw founder recording into a crisp, high-retention B2B video with clean speech pacing, aesthetic captions, and intentional cutaways.',
        proposalAngle: 'Nhắm tới nhà sáng lập/marketer đang có video thô nói dài, cam kết cắt gọn ý chính, làm nổi bật thông điệp và giao bản nháp trong 24-48h.',
        isOutput: true,
        evidenceType: 'mp4',
        curriculumRefs: [
          'elite/1.2/P3',
          'elite/1.2/P4',
          'elite/1.2/P5',
          'elite/1.2/P6',
          'elite/1.2/P7',
          'elite/1.2/P8.1',
          'baby-resolve/chuong-10/B01',
        ],
        humanGate: MP4_GATE,
        strategyNote: 'Sean Kang baseline được đối chiếu với modern Reel research. Talking-head nhịp nhanh và cắt sạch là kỹ năng nền tảng có nhu cầu bền bỉ.',
      },
    ],
  },
  {
    id: 'reel-2',
    phaseNumber: 2,
    title: 'PHASE 2: REEL 2 — PODCAST AUTHORITY',
    desc: 'Chứng minh khả năng xử lý podcast authority clip, visual change và commercial B-roll.',
    pill: 'Artifact 2',
    color: '#14b8a6',
    tasks: [
      {
        id: 'reel_02_artifact',
        title: 'Dựng và export Reel 2 Sean Kang Podcast Authority / Talking-Head Repurposing',
        duration: 'P8.2 (30:56) + Elite 2.1/2.2 Level 2 watchlist',
        output: 'MP4 podcast authority clip do Lang tự dựng: micro-motion, Text+ captions, contextual B-roll/cutout, SFX và audio polish.',
        clientUseCase: 'Tập podcast dài hoặc phỏng vấn studio cần bóc tách thành short clip cô đọng, giữ vị thế chuyên gia và tạo sức hút trên TikTok, Reels và YouTube Shorts.',
        editPromise: 'Micro-motion tinh tế, Snap Captions bắt mắt, contextual cutout, B-roll full cutaway lớp lang và xử lý âm thanh podcast ấm, đầm, không tạp âm.',
        englishPitch: 'I repurpose long podcast episodes into engaging authority shorts using clean audio polish, dynamic snap captions, and narrative-driven cutouts.',
        proposalAngle: 'Đề xuất trích đoạn 1 ý đắt giá nhất từ tập podcast có sẵn của khách làm video thử nghiệm, chứng minh khả năng giữ chân người xem bằng pacing chặt chẽ.',
        isOutput: true,
        evidenceType: 'mp4',
        curriculumRefs: [
          'elite/1.2/P8.2',
          'elite/2.2/b-roll-staging',
          'baby-resolve/chuong-6/B07',
          'b-roll-full-cutaway-va-ky-thuat-depth-sandwich.md',
          'speed-ramp/jit-reference',
        ],
        humanGate: MP4_GATE,
        strategyNote: 'P8.2 dùng footage podcast studio và dạy Snap Caption, micro-motion, punch-in, contextual cutout/B-roll và SFX. Speed ramp là JIT option.',
      },
    ],
  },
  {
    id: 'profile',
    phaseNumber: 3,
    title: 'PHASE 3: PROFILE TỐI THIỂU & FIRST PAID JOB GATE',
    desc: 'Đóng gói năng lực sau khi đã có 2 MP4 thật; mở cửa tìm việc và gửi proposal ngay sau Reel 2, không chờ đủ 4 Reel.',
    pill: 'Job-First Gate',
    color: '#f59e0b',
    tasks: [
      {
        id: 'profile_minimum',
        title: 'Tạo profile Upwork và portfolio tối thiểu',
        duration: 'Sau Reel 2',
        output: 'Profile hoạt động, mô tả dịch vụ rõ, 2 MP4 thật và link xem được.',
        isOutput: false,
        evidenceType: 'action',
        curriculumRefs: ['freelance-mvp/profile', 'upwork-mvp/account', 'upwork-mvp/profile', 'elite-pro/portfolio-review'],
        humanGate: ACTION_GATE,
        strategyNote: 'Tick xanh, Freelancer Plus, analytics và website riêng không phải điều kiện tiên quyết mở đường.',
      },
      {
        id: 'first_paid_job_gate',
        title: 'First Paid Job Gate — Kích hoạt chào dịch vụ và tìm job sau Reel 2',
        duration: 'Sau Reel 2, chạy song song với Reel 3',
        output: 'Profile live, 2 link Reel thật (Reel 1 & 2), 1 gói dịch vụ rõ ràng, 1 job listing thực tế và 1 bản nháp proposal được duyệt.',
        isOutput: false,
        evidenceType: 'action',
        curriculumRefs: [
          'freelance-mvp/profile',
          'upwork-mvp/profile',
          'upwork-mvp/job-search',
          'upwork-mvp/proposal',
        ],
        humanGate: ACTION_GATE,
        strategyNote: 'Lớp job-readiness vận hành bổ sung: đóng gói 2 MP4 đầu tiên thành profile live, chọn 1 bài đăng tuyển thật và chuẩn bị 1 proposal được duyệt để đo phản hồi thị trường sớm.',
      },
    ],
  },
  {
    id: 'reel-3',
    phaseNumber: 4,
    title: 'PHASE 4: REEL 3 — LÂM TRẦN REAL ESTATE',
    desc: 'Tạo sản phẩm talking-head bất động sản thương mại: xử lý số liệu tài chính và Dynamic Zoom.',
    pill: 'Artifact 3',
    color: '#f97316',
    tasks: [
      {
        id: 'reel_03_artifact',
        title: 'Dựng và export Reel 3 Lâm Trần Real Estate',
        duration: 'P8.4 (80:58) + Dynamic Zoom',
        output: 'MP4 talking-head bất động sản thương mại: gọt sạch khoảng lặng, Dynamic Zoom 1.05x mượt mà, số liệu tài chính tương phản WCAG 4.5:1, color grading Rec.709-A.',
        clientUseCase: 'Môi giới bất động sản, chủ dự án hoặc chuyên gia tài chính cần video review dự án trực quan, minh bạch số liệu định giá và thuyết phục người mua.',
        editPromise: 'Gọt sạch khoảng lặng, Dynamic Zoom 1.05x dẫn dắt ánh nhìn, đồ họa số liệu tài chính rõ nét chuẩn tương phản WCAG và color grading Rec.709-A chân thực.',
        englishPitch: 'I craft commercial real-estate shorts with seamless pacing, smooth dynamic zoom, clean financial motion graphics, and accurate Rec.709-A color.',
        proposalAngle: 'Tập trung giải quyết bài toán hiển thị số liệu diện tích, giá bán trực quan, giúp nhà môi giới giữ chân người xem và tăng độ tin cậy của bất động sản.',
        isOutput: true,
        evidenceType: 'mp4',
        curriculumRefs: [
          'elite/1.2/P8.4',
          'baby-resolve/chuong-6/B09',
          'LamTran_Video9_RoughCut.fcpxml',
          'speed-ramp/jit-reference',
        ],
        humanGate: MP4_GATE,
        strategyNote: 'Ghi chú mapping curriculum: Bài giảng gốc của Sean có thể gắn nhãn P8.3/P8.4 thứ tự khác nhau; roadmap chủ động ưu tiên Lâm Trần Real Estate làm Reel 3 và Josh William Fitness làm Reel 4. Bất động sản là ngách thương mại có ngân sách cao và nhu cầu retainer định kỳ; car speed ramp là chuyên đề học theo JIT.',
      },
    ],
  },
  {
    id: 'proposal',
    phaseNumber: 5,
    title: 'PHASE 5: PROPOSAL & CLIENT-TEST READINESS',
    desc: 'Đã có 3 MP4 thật (B2B, podcast, bất động sản), mở rộng tiếp cận các ngách thương mại giá trị cao và xử lý an toàn quy trình client-test chạy song song với Reel 4; không đặt quota proposal cứng.',
    pill: 'Outreach & Test',
    color: '#ec4899',
    tasks: [
      {
        id: 'proposal_first',
        title: 'Lọc job, gửi proposal có evidence và sẵn sàng quy trình client-test',
        duration: 'Sau Reel 3, chạy song song với Reel 4',
        output: 'Job URL thật, bằng chứng 3 Reel với Reel 3 bất động sản phù hợp, bản nháp proposal được duyệt, thỏa thuận client-test an toàn: ưu tiên paid-test hoặc video test gắn watermark, thống nhất scope/deadline/revision và hành động tiếp theo.',
        isOutput: false,
        evidenceType: 'action',
        curriculumRefs: [
          'freelance-mvp/job-filtering',
          'freelance-mvp/proposal',
          'upwork-mvp/job-search',
          'upwork-mvp/proposal',
          'upwork-mvp/client-reading',
          'client-test-playbook',
        ],
        humanGate: [
          'real-job-recorded',
          'relevant-reel-linked',
          'proposal-owner-reviewed',
          'client-test-terms-verified',
          'upwork-compliance-checked',
        ],
        strategyNote: 'Lớp bảo vệ vận hành bổ sung: áp dụng mẫu proposal Sean Kang kết hợp điều khoản paid-test, watermark và thỏa thuận scope/deadline/revision rõ ràng trước khi gửi, bảo vệ quyền lợi và tuân thủ nền tảng.',
      },
    ],
  },
  {
    id: 'reel-4',
    phaseNumber: 6,
    title: 'PHASE 6: REEL 4 — JOSH WILLIAM FITNESS',
    desc: 'Hoàn thiện bộ 4 Reel thương mại với sản phẩm thể hình năng lượng cao, nhịp thở dồn dập và sound design bùng nổ.',
    pill: 'Artifact 4',
    color: '#6366f1',
    tasks: [
      {
        id: 'reel_04_artifact',
        title: 'Dựng và export Reel 4 Josh William Fitness',
        duration: 'P8.3 (44:26) + Elite 2.1 Hook Intro',
        output: 'MP4 thể hình năng lượng cao: hook 3s dồn dập, A-roll ngắt nhịp cơ bắp, B-roll tập gym, impact SFX giới hạn -1.0 dBTP, bitrate tối ưu 20,000 Kbps.',
        clientUseCase: 'HLV thể hình, vận động viên hoặc thương hiệu gym/thể thao cần video động lực năng lượng cao, nhịp điệu dồn dập kích thích hành động.',
        editPromise: 'Hook 3s dồn dập, A-roll ngắt nhịp cơ bắp, B-roll tập luyện, impact SFX uy lực dưới -1.0 dBTP và retime động tác nâng tạ bằng Optical Flow / Speed Warp.',
        englishPitch: 'I edit high-energy fitness reels with a punchy 3-second hook, rhythmic gym cuts, impactful sound design, and smooth optical-flow speed ramps.',
        proposalAngle: 'Dành cho creator/fitness coach cần biến footage tập luyện thô thành video động lực bùng nổ, kiểm soát nhịp cắt khớp nhạc và sound FX chuẩn xác.',
        isOutput: true,
        evidenceType: 'mp4',
        curriculumRefs: [
          'elite/1.2/P8.3',
          'elite/2.1/david-goggins-hook',
          'Josh_William_Fitness',
          'speed-ramp/jit-optical-flow',
        ],
        humanGate: MP4_GATE,
        strategyNote: 'Ghi chú mapping curriculum: Bài giảng gốc của Sean có thể gắn nhãn P8.3/P8.4 thứ tự khác nhau; roadmap chủ động ưu tiên Josh William Fitness làm Reel 4 để hoàn thiện bộ 4 artifact. Ngách fitness & motivation chứng minh khả năng xử lý nhịp nhanh, kinetic cuts và sound design va đập mạnh; funny meme là specialization tra cứu JIT.',
      },
    ],
  },
];

export interface RealReelArtifact {
  id: string;
  slotIndex: number;
  phaseId: string;
  taskId: string;
  code: string;
  reelNumber: string;
  title: string;
  subtitle: string;
  niche: string;
  mp4Path: string;
  duration: string;
  timecodeStart: string;
  formatSpec: string;
  colorSpace: string;
  fileSize: string;
  fps: number;
  framesCount: number;
  status: string;
  clientUseCase: string;
  editPromise: string;
  englishPitch: string;
  proposalAngle: string;
  nextActionLabel: string;
  nextActionDetail: string;
  accentHex: string;
  tapeTintHex: string;
  rawFootagePath: string;
  curriculumRefs: string[];
  humanGate: readonly string[];
  strategyNote: string;
  notes: string;
}

export const REAL_REEL_ARTIFACTS: RealReelArtifact[] = [
  {
    id: 'reel-01',
    slotIndex: 0,
    phaseId: 'reel-1',
    taskId: 'reel_01_artifact',
    code: 'REEL 01',
    reelNumber: '01',
    title: 'Reel 1: Matthiew Adams',
    subtitle: 'B2B & Marketing Talking-Head',
    niche: 'B2B / Marketing',
    mp4Path: '/artifacts/reel-01-anamorphic-master.mp4',
    duration: '00:00:45:00',
    timecodeStart: '01:00:00:00',
    formatSpec: '1080×1920 (9:16) · H.264 MP4 Master',
    colorSpace: 'DaVinci YRGB / Rec.709-A',
    fileSize: 'Chưa xác nhận',
    fps: 24,
    framesCount: 1080,
    status: 'Chưa xác nhận',
    clientUseCase:
      'Video talking-head ngắn cho nhà sáng lập, chuyên gia B2B và agency marketing cần truyền tải thông điệp súc tích, giữ chân người xem trên LinkedIn, X và Shorts.',
    editPromise:
      'Cắt thô dứt khoát không nuốt âm đuôi, Text+ captions thẩm mỹ, 2 B-roll cutaway chuẩn ngữ cảnh và sound balance sạch sẽ dưới -1.0 dBTP.',
    englishPitch:
      'I turn your raw founder recording into a crisp, high-retention B2B video with clean speech pacing, aesthetic captions, and intentional cutaways.',
    proposalAngle:
      'Nhắm tới nhà sáng lập/marketer đang có video thô nói dài, cam kết cắt gọn ý chính, làm nổi bật thông điệp và giao bản nháp trong 24-48h.',
    nextActionLabel: 'Dựng thô & Cắt sạch âm đuôi',
    nextActionDetail:
      'Mở DaVinci Resolve, load RAW Matthiew Adams từ ~/workspace/studio, cắt thô dứt khoát không phạm âm đuôi và gắn Text+ captions.',
    accentHex: '#10B981',
    tapeTintHex: '#064E3B',
    rawFootagePath:
      'resources/Tài nguyên khoá học/RAW (Footages thô thực hành)/RAW Talking Head Video (từ gói Elite trở lên)/RAW thực tế của khách hàng (dạng dọc)/(Marketing) Matthiew Adams',
    curriculumRefs: [
      'elite/1.2/P3',
      'elite/1.2/P4',
      'elite/1.2/P5',
      'elite/1.2/P6',
      'elite/1.2/P7',
      'elite/1.2/P8.1',
      'baby-resolve/chuong-10/B01',
    ],
    humanGate: MP4_GATE,
    strategyNote:
      'Sean Kang baseline được đối chiếu với modern Reel research. Talking-head nhịp nhanh và cắt sạch là kỹ năng nền tảng có nhu cầu bền bỉ.',
    notes:
      'Artifact 1 tập trung phản xạ cụm phím Q-W-E-S-D, cắt thô sạch sẽ, phụ đề thẩm mỹ và 2 B-roll cutaway chuẩn xác.',
  },
  {
    id: 'reel-02',
    slotIndex: 1,
    phaseId: 'reel-2',
    taskId: 'reel_02_artifact',
    code: 'REEL 02',
    reelNumber: '02',
    title: 'Reel 2: Podcast Authority',
    subtitle: 'Sean Kang Studio · Repurposing Short',
    niche: 'Podcast Authority',
    mp4Path: '/artifacts/reel-02-grade-lut-pass.mp4',
    duration: '00:00:52:12',
    timecodeStart: '02:00:00:00',
    formatSpec: '1080×1920 (9:16) · H.264 MP4 Master',
    colorSpace: 'DaVinci YRGB / Rec.709-A',
    fileSize: 'Chưa xác nhận',
    fps: 24,
    framesCount: 1260,
    status: 'Chưa xác nhận',
    clientUseCase:
      'Tập podcast dài hoặc phỏng vấn studio cần bóc tách thành short clip cô đọng, giữ vị thế chuyên gia và tạo sức hút trên TikTok, Reels và YouTube Shorts.',
    editPromise:
      'Micro-motion tinh tế, Snap Captions bắt mắt, contextual cutout, B-roll full cutaway lớp lang và xử lý âm thanh podcast ấm, đầm, không tạp âm.',
    englishPitch:
      'I repurpose long podcast episodes into engaging authority shorts using clean audio polish, dynamic snap captions, and narrative-driven cutouts.',
    proposalAngle:
      'Đề xuất trích đoạn 1 ý đắt giá nhất từ tập podcast có sẵn của khách làm video thử nghiệm, chứng minh khả năng giữ chân người xem bằng pacing chặt chẽ.',
    nextActionLabel: 'Micro-Motion & Snap Captions',
    nextActionDetail:
      'Áp dụng Snap Caption, punch-in, contextual cutout, B-roll full cutaway và SFX đồng bộ cho video podcast authority.',
    accentHex: '#14B8A6',
    tapeTintHex: '#0E3A3B',
    rawFootagePath: 'resources/Tài nguyên khoá học/RAW/Sean Kang/RAW Sean 2',
    curriculumRefs: [
      'elite/1.2/P8.2',
      'elite/2.2/b-roll-staging',
      'baby-resolve/chuong-6/B07',
      'b-roll-full-cutaway-va-ky-thuat-depth-sandwich.md',
      'speed-ramp/jit-reference',
    ],
    humanGate: MP4_GATE,
    strategyNote:
      'P8.2 dùng footage podcast studio và dạy Snap Caption, micro-motion, punch-in, contextual cutout/B-roll và SFX. Speed ramp là JIT option.',
    notes:
      'Chứng minh năng lực repurposing podcast chuyên nghiệp: âm thanh đầm chắc, Text+ caption sinh động, hiệu ứng chuyển cảnh tự nhiên.',
  },
  {
    id: 'reel-03',
    slotIndex: 2,
    phaseId: 'reel-3',
    taskId: 'reel_03_artifact',
    code: 'REEL 03',
    reelNumber: '03',
    title: 'Reel 3: Lâm Trần Real Estate',
    subtitle: 'Thương Mại & Số Liệu Tài Chính',
    niche: 'Bất Động Sản Thương Mại',
    mp4Path: '/artifacts/reel-03-sound-mix-stems.mp4',
    duration: '00:01:15:00',
    timecodeStart: '03:00:00:00',
    formatSpec: '1080×1920 (9:16) · H.264 MP4 Master',
    colorSpace: 'DaVinci Color Managed / Rec.709-A',
    fileSize: 'Chưa xác nhận',
    fps: 24,
    framesCount: 1800,
    status: 'Chưa xác nhận',
    clientUseCase:
      'Môi giới bất động sản, chủ dự án hoặc chuyên gia tài chính cần video review dự án trực quan, minh bạch số liệu định giá và thuyết phục người mua.',
    editPromise:
      'Gọt sạch khoảng lặng, Dynamic Zoom 1.05x dẫn dắt ánh nhìn, đồ họa số liệu tài chính rõ nét chuẩn tương phản WCAG và color grading Rec.709-A chân thực.',
    englishPitch:
      'I craft commercial real-estate shorts with seamless pacing, smooth dynamic zoom, clean financial motion graphics, and accurate Rec.709-A color.',
    proposalAngle:
      'Tập trung giải quyết bài toán hiển thị số liệu diện tích, giá bán trực quan, giúp nhà môi giới giữ chân người xem và tăng độ tin cậy của bất động sản.',
    nextActionLabel: 'Dynamic Zoom & Đồ Họa Số Liệu',
    nextActionDetail:
      'Gọt sạch khoảng lặng, phối hợp Dynamic Zoom 1.05x mượt mà, số liệu tài chính tương phản WCAG 4.5:1 và color grade chuẩn.',
    accentHex: '#F97316',
    tapeTintHex: '#431407',
    rawFootagePath:
      'resources/Tài nguyên khoá học/RAW/RAW thực tế của khách hàng (dạng dọc)/(Real Estate) Lâm Trần/Video #9',
    curriculumRefs: [
      'elite/1.2/P8.4',
      'baby-resolve/chuong-6/B09',
      'LamTran_Video9_RoughCut.fcpxml',
      'speed-ramp/jit-reference',
    ],
    humanGate: MP4_GATE,
    strategyNote:
      'Ghi chú mapping curriculum: Bài giảng gốc của Sean có thể gắn nhãn P8.3/P8.4 thứ tự khác nhau; roadmap chủ động ưu tiên Lâm Trần Real Estate làm Reel 3 và Josh William Fitness làm Reel 4. Bất động sản là ngách thương mại có ngân sách cao và nhu cầu retainer định kỳ; car speed ramp là chuyên đề học theo JIT.',
    notes:
      'Sản phẩm bất động sản hoàn thiện: màu sắc chân thực, motion graphics thể hiện số liệu sắc nét, nhịp dẫn dắt thu hút khách mua.',
  },
  {
    id: 'reel-04',
    slotIndex: 3,
    phaseId: 'reel-4',
    taskId: 'reel_04_artifact',
    code: 'REEL 04',
    reelNumber: '04',
    title: 'Reel 4: Josh William Fitness',
    subtitle: 'Năng Lượng Cao & Kinetic Sound',
    niche: 'Thể Hình & Động Lực',
    mp4Path: '/artifacts/reel-04-festival-dcp-cut.mp4',
    duration: '00:00:48:18',
    timecodeStart: '04:00:00:00',
    formatSpec: '1080×1920 (9:16) · H.264 MP4 (20,000 Kbps)',
    colorSpace: 'DaVinci YRGB / Rec.709-A',
    fileSize: 'Chưa xác nhận',
    fps: 24,
    framesCount: 1170,
    status: 'Chưa xác nhận',
    clientUseCase:
      'HLV thể hình, vận động viên hoặc thương hiệu gym/thể thao cần video động lực năng lượng cao, nhịp điệu dồn dập kích thích hành động.',
    editPromise:
      'Hook 3s dồn dập, A-roll ngắt nhịp cơ bắp, B-roll tập luyện, impact SFX uy lực dưới -1.0 dBTP và retime động tác nâng tạ bằng Optical Flow / Speed Warp.',
    englishPitch:
      'I edit high-energy fitness reels with a punchy 3-second hook, rhythmic gym cuts, impactful sound design, and smooth optical-flow speed ramps.',
    proposalAngle:
      'Dành cho creator/fitness coach cần biến footage tập luyện thô thành video động lực bùng nổ, kiểm soát nhịp cắt khớp nhạc và sound FX chuẩn xác.',
    nextActionLabel: '3s Kinetic Hook & Optical Flow',
    nextActionDetail:
      'Thiết lập hook 3s dồn dập, A-roll ngắt nhịp cơ bắp, B-roll tập gym, impact SFX giới hạn -1.0 dBTP và retime động tác bằng Optical Flow.',
    accentHex: '#818CF8',
    tapeTintHex: '#1E1B4B',
    rawFootagePath:
      'resources/Tài nguyên khoá học/RAW/RAW thực tế của khách hàng (dạng dọc)/(Fitness) Josh William',
    curriculumRefs: [
      'elite/1.2/P8.3',
      'elite/2.1/david-goggins-hook',
      'Josh_William_Fitness',
      'speed-ramp/jit-optical-flow',
    ],
    humanGate: MP4_GATE,
    strategyNote:
      'Ghi chú mapping curriculum: Bài giảng gốc của Sean có thể gắn nhãn P8.3/P8.4 thứ tự khác nhau; roadmap chủ động ưu tiên Josh William Fitness làm Reel 4 để hoàn thiện bộ 4 artifact. Ngách fitness & motivation chứng minh khả năng xử lý nhịp nhanh, kinetic cuts và sound design va đập mạnh; funny meme là specialization tra cứu JIT.',
    notes:
      'Reel thứ 4 chốt hạ danh mục portfolio: âm thanh bùng nổ, cắt gọt chính xác từng mili-giây, hình ảnh căng tràn năng lượng.',
  },
];

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  compact: string;
  isPast: boolean;
}

export function computeCountdown(targetDate: Date, fromDate = new Date()): CountdownResult {
  const diffMs = targetDate.getTime() - fromDate.getTime();
  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: 'Đã đến hạn',
      compact: '00d 00h',
      isPast: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return {
    days,
    hours,
    minutes,
    seconds,
    formatted: `${days} ngày ${pad(hours)}h ${pad(minutes)}m`,
    compact: `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m`,
    isPast: false,
  };
}

/**
 * Clean adapter seams for future Firebase / RTDB synchronization
 * and local browser state isolation.
 */
export interface UserVerificationState {
  approvedReelIds: string[];
  checkedGateKeys: Record<string, string[]>; // artifactId -> array of completed gate keys
  activeReelId: string;
}

export const STORAGE_KEY_ROADMAP = 'elite_roadmap_react_preview_v1';

export function loadLocalVerificationState(): UserVerificationState {
  if (typeof window === 'undefined') {
    return {
      approvedReelIds: [],
      checkedGateKeys: {},
      activeReelId: REAL_REEL_ARTIFACTS[0].id,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ROADMAP);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        approvedReelIds: Array.isArray(parsed.approvedReelIds) ? parsed.approvedReelIds : [],
        checkedGateKeys: typeof parsed.checkedGateKeys === 'object' && parsed.checkedGateKeys !== null ? parsed.checkedGateKeys : {},
        activeReelId: typeof parsed.activeReelId === 'string' ? parsed.activeReelId : REAL_REEL_ARTIFACTS[0].id,
      };
    }
  } catch {
    // Ignore storage parse error
  }
  return {
    approvedReelIds: [],
    checkedGateKeys: {},
    activeReelId: REAL_REEL_ARTIFACTS[0].id,
  };
}

export function saveLocalVerificationState(state: UserVerificationState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(state));
  } catch {
    // Ignore storage write error
  }
}
