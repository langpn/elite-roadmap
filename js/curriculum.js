// =========================================================================
// DATA STRUCTURE, TIMELINE CONSTANTS & CAREER MASTERY ROADMAP
// =========================================================================

export const TET_DATE = new Date("2027-02-05T23:59:59"); // 29 Tết Đinh Mùi
export const JOB_PAYOUT_DEADLINE = new Date("2026-12-25T23:59:59"); // Deadline chốt hợp đồng để nhận lương trước Tết
export const JOB_NEEDED_HOURS = 64.0; // Sprints 0, 1, 2, 3

export const ACCOUNTS = {
  lang: { 
    name: "Lang", 
    email: "langpn.dev@gmail.com", 
    avatar: "⚡", 
    color: "#f97316", 
    colorEnd: "#ef4444", 
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)" 
  },
  diem: { 
    name: "Diễm", 
    email: "diembd.dev@gmail.com", 
    avatar: "🌸", 
    color: "#38bdf8", 
    colorEnd: "#ffffff", 
    gradient: "linear-gradient(135deg, #38bdf8 0%, #ffffff 100%)" 
  }
};

// =========================================================================
// 1. FAST-TRACK SPRINTS TO LAND PAYING CLIENTS BEFORE TET 2027
// =========================================================================
export const ROADMAP_SPRINTS = [
  {
    id: "s0",
    title: "SPRINT 0: THU NẠP VŨ KHÍ & QUẢN TRỊ NGUYÊN LIỆU",
    desc: "Lấy tài nguyên từ kho có sẵn, tối ưu máy Mac và cài đặt phím tắt",
    pill: "Khởi Động",
    color: "#38bdf8",
    targetWeek: 1,
    tasks: [
      {
        id: "s0_t1",
        title: "Trích xuất RAW bài tập & Kho Sound Effects chung",
        duration: "Bài đọc",
        effortHours: 1.5,
        output: "Giải nén file RAW (Matthiew Adams 50MB) vào ~/studio",
        isOutput: false,
        mapping: {
          troubleshoot: "Kẹt giải nén/tổ chức? Xem: <strong>Baby Resolve C2-B01 (Database) & C3-B06 (Lưu Power Bins)</strong>",
          levelUp: "Muốn kho xịn hơn? Lấy trong: <strong>~/Documents/edit-courses/resources/ (SFX, Font, Emojis)</strong>",
          monetize: "Tư duy: Người thợ giỏi không tìm đồ mỗi ngày, hãy gom sẵn thư viện dùng chung!"
        }
      },
      {
        id: "s0_t2",
        title: "Cài đặt Phím tắt Sean Kang 2025 & Kích hoạt Live Save",
        duration: "5 phút",
        effortHours: 0.5,
        output: "Cụm tay trái Q-W-E-S-D phản xạ không độ trễ, chống mất file",
        isOutput: false,
        mapping: {
          troubleshoot: "Kẹt import phím tắt? Xem: <strong>Baby Resolve C1-B4.2 (Phím tắt) & C2-B02 (Live Save)</strong>",
          levelUp: "Nâng cao thao tác: Xem <strong>Elite Chương 5 (Tip tạo phím tắt Keyboard Maestro)</strong>",
          monetize: "Tốc độ cắt gọt nhanh gấp 3 lần = Nhận được nhiều job hơn trong cùng 1 ngày."
        }
      },
      {
        id: "s0_t3",
        title: "Tư duy cốt lõi trước khi thực hành (Chương 0)",
        duration: "4 phút",
        effortHours: 1.0,
        output: "Thuộc lòng: Edit đẹp < View & Doanh thu; 3-5 giây đầu là sinh tử",
        isOutput: false,
        mapping: {
          troubleshoot: "Ôn lại Zettel: <strong>tu-duy-retention-va-co-che-hook-trong-video-short-form</strong>",
          levelUp: "Xem cách bốc RAW: <strong>Elite Khởi đầu Bài 01-03 (Bốc video creator lớn)</strong>",
          monetize: "Tư duy đối tác tăng trưởng: Giúp khách ra đơn thì khách trả giá cao."
        }
      }
    ]
  },
  {
    id: "s1",
    title: "SPRINT 1: DÂY CHUYỀN 6 BƯỚC & XUẤT XƯỞNG 4 REEL (CORE TRỌNG TÂM)",
    desc: "Thực chiến Chương 1.2 mới nhất: Hoàn thiện 4 sản phẩm cầm tay để sẵn sàng nhận việc",
    pill: "Trọng Tâm Số 1",
    color: "#10b981",
    targetWeek: 2,
    tasks: [
      {
        id: "s1_t1",
        title: "Chương 1.2 - Phần 3 & 4: Timeline 9:16 & Cắt thô A-Roll",
        duration: "26 phút",
        effortHours: 2.5,
        output: "Timeline 1080x1920 sạch bóng câu vấp & khoảng lặng bằng phím Q-W-E-S-D",
        isOutput: false,
        mapping: {
          troubleshoot: "Kẹt cắt nhịp? Xem: <strong>Baby Resolve C6-B01 (Giao diện Edit) & Phím Q-W-E-S-D</strong>",
          levelUp: "Xem thêm bản gốc: <strong>Elite Chương 1.1 Bài 03 (Marcus) & Bài 06 (Khách Úc)</strong>",
          monetize: "Kỹ năng Rough Cut sắc bén là nền tảng số 1 của mọi video ngắn triệu view."
        }
      },
      {
        id: "s1_t2",
        title: "Chương 1.2 - Phần 5: Lọc ồn & Cân bằng âm thanh (Audio Leveling)",
        duration: "8 phút",
        effortHours: 1.5,
        output: "Giọng nói nét căng, không tiếng quạt ồn, mức chuẩn -6dB",
        isOutput: false,
        mapping: {
          troubleshoot: "Kẹt lọc ồn? Xem: <strong>Baby Resolve C9-B03 (Voice Isolation) & C9-B05 (Normalize)</strong>",
          levelUp: "Xem cách rải âm thanh: <strong>Baby Resolve C14-B03 (LIVE thêm Sound Effect)</strong>",
          monetize: "Âm thanh dở người xem tắt video ngay giây đầu tiên dù hình có đẹp đến mấy."
        }
      },
      {
        id: "s1_t3",
        title: "Chương 1.2 - Phần 6 & 7: Phụ đề & Style chữ Alex Hormozi",
        duration: "1h 33p",
        effortHours: 3.5,
        output: "Subtitles nhảy từng từ, font dày, đổi màu vàng/xanh ở từ khóa chính",
        isOutput: false,
        mapping: {
          troubleshoot: "Kẹt làm sub? Xem: <strong>Baby Resolve C12-B07 (AI Subtitle) & C6-B14 (Text Inspector)</strong>",
          levelUp: "Dùng Preset có sẵn: <strong>resources/Snap Captions Template_V1.02.zip</strong>",
          monetize: "70% người dùng lướt video tắt tiếng. Phụ đề bắt mắt giữ chân 80% người xem."
        }
      },
      {
        id: "s1_t4",
        title: "Chương 1.2 - Phần 8.1: 🎯 XUẤT XƯỞNG REEL 1 (Cơ bản nhất)",
        duration: "25 phút",
        effortHours: 3.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL 1 CẦM TAY TRONG MÁY",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt render? Xem: <strong>Baby Resolve C10-B01 & B02 (Deliver MP4 chuẩn)</strong>",
          levelUp: "Xem phân tích lỗi: <strong>Elite Chương 1.1 (Những lỗi thường gặp và lời khuyên)</strong>",
          monetize: "🎯 Đây là video đầu tiên bỏ vào Portfolio để gửi chào hàng!"
        }
      },
      {
        id: "s1_t5",
        title: "Chương 1.2 - Phần 8.2: 🎯 XUẤT XƯỞNG REEL 2 (Bố cục & Sắp xếp chữ)",
        duration: "31 phút",
        effortHours: 3.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL 2 DẪN MẮT NGƯỜI XEM",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt căn chỉnh chữ? Xem: <strong>Baby Resolve C6-B14 (Text Formatting)</strong>",
          levelUp: "Nâng cao: <strong>Elite Pro Phần 2 (Neo Caption Pack V1 Text Animation)</strong>",
          monetize: "Bố cục chữ chỉn chu chứng minh bạn là editor có gu thẩm mỹ cao."
        }
      },
      {
        id: "s1_t6",
        title: "Chương 1.2 - Phần 8.3: 🎯 XUẤT XƯỞNG REEL 3 (Animation chữ & Zoom)",
        duration: "44 phút",
        effortHours: 4.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL 3 CÓ CHUYỂN ĐỘNG NẢY",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt zoom? Xem: <strong>Baby Resolve C6-B09 (Dynamic Zoom) & C11-B05 (Animation Chữ)</strong>",
          levelUp: "Bản chất chuyển động: Xem <strong>~/Documents/edit-courses/keyframe-animation/</strong>",
          monetize: "Mỗi cú zoom cut chuyển ý giúp xóa bỏ cảm giác nhàm chán của video 1 góc máy."
        }
      },
      {
        id: "s1_t7",
        title: "Chương 1.2 - Phần 8.4: 🎯 XUẤT XƯỞNG REEL 4 (Mức độ 1.5 nâng cao)",
        duration: "1h 21p",
        effortHours: 5.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL 4 ĐẠT CHUẨN THƯƠNG MẠI",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt hòa trộn B-Roll? Xem: <strong>Baby Resolve C6-B10 (Composite Blend) & C9-B04 (Ducker)</strong>",
          levelUp: "Xem thêm: <strong>Elite Chương 1.1 Bài 04 (Thực hành video Style Alex Hormozi)</strong>",
          monetize: "Reel 4 là tấm danh thiếp hoàn hảo để chốt các hợp đồng $30 - $50/video!"
        }
      }
    ]
  },
  {
    id: "s2",
    title: "SPRINT 2: CHỮ KÝ TRIỆU VIEW (DAVID GOGGINS, DANIEL ILES & PRO BREAKDOWN)",
    desc: "Thực hành Chương 2: Làm chủ Hook Intro 3s, B-Roll chuyển động, Animation tài chính",
    pill: "Nâng Tầm",
    color: "#f59e0b",
    targetWeek: 5,
    tasks: [
      {
        id: "s2_t1",
        title: "Case Study 1: David Goggins (P1 - P3) - Cắt thô & Hook Intro 3 giây",
        duration: "37 phút",
        effortHours: 3.5,
        output: "Hook 3 giây đầu giật gân, nhịp dồn dập đập vào mắt người xem",
        isOutput: false,
        mapping: {
          troubleshoot: "Kẹt làm chậm/nhanh? Xem: <strong>Baby Resolve C6-B06 (Speed Ramp kịch tính)</strong>",
          levelUp: "Chuyên sâu speed ramp: Xem <strong>~/Documents/edit-courses/speed-ramp/</strong>",
          monetize: "Hook 3s quyết định 80% việc video có được thuật toán đẩy lên triệu view hay không."
        }
      },
      {
        id: "s2_t2",
        title: "Case Study 1: David Goggins (P4 - P8) - 🎯 REEL DAVID GOGGINS HOÀN CHỈNH",
        duration: "40 phút",
        effortHours: 4.5,
        output: "XUẤT XƯỞNG FILE MP4 REEL DAVID GOGGINS CỰC CHÁY",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt nhạc đè giọng? Xem: <strong>Baby Resolve C9-B04 (Ducker Audio)</strong>",
          levelUp: "Hiệu ứng chữ xé đôi: Xem bài 06 (Hiệu ứng cắt đôi chữ Refuse)",
          monetize: "Thể loại động lực/thể hình có lượng khách hàng cực kỳ dồi dào trên Upwork."
        }
      },
      {
        id: "s2_t3",
        title: "Case Study 2: Daniel Iles (Bài 14 - 20) - 🎯 REEL TÀI CHÍNH DANIEL ILES",
        duration: "1h 17p",
        effortHours: 5.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL TÀI CHÍNH (LOGO AMAZON & BEVEL CHỮ)",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt Node Fusion? Xem: <strong>fusion-101/ (Tip 1-5: Merge Node, Resize, Select Tool)</strong>",
          levelUp: "Học hiệu ứng Kallaway: Xem <strong>Elite Pro Phần 3 Video 6 & 7 (Phân tích Kallaway)</strong>",
          monetize: "Niche Tài chính / Công nghệ trả mức thù lao cao gấp đôi so với các ngách thông thường."
        }
      },
      {
        id: "s2_t4",
        title: "Case Study 3: Jvevermind & Khoai Lang Thang - 🎯 REEL KỂ CHUYỆN XẾP CHỮ",
        duration: "1h 53p",
        effortHours: 6.0,
        output: "XUẤT XƯỞNG FILE MP4 PHONG CÁCH CINEMATIC STORYTELLING",
        isOutput: true,
        mapping: {
          troubleshoot: "Kẹt chỉnh màu? Xem: <strong>Baby Resolve C8-B15 (Node Tree Workflow chuẩn)</strong>",
          levelUp: "Hiệu ứng Iman Gadzhi: Xem <strong>Elite Pro Phần 3 Video 19 (Animation Iman Gadzhi 1h04p)</strong>",
          monetize: "Phong cách Cinematic giúp bạn tiếp cận các kênh YouTube lớn làm video dài chất lượng."
        }
      }
    ]
  },
  {
    id: "s3",
    title: "SPRINT 3: TỔNG TẤN CÔNG THỊ TRƯỜNG & SĂN JOB (FREELANCE & UPWORK MVP)",
    desc: "Đóng gói Portfolio chuẩn quốc tế, lập Gig Fiverr, gửi Proposal Upwork có khách ngay",
    pill: "Kiếm Tiền",
    color: "#c084fc",
    targetWeek: 8,
    tasks: [
      {
        id: "s3_t1",
        title: "Đóng gói Portfolio 4 REEL vào Google Drive / Trang Web cá nhân",
        duration: "1 buổi",
        effortHours: 3.0,
        output: "Link Portfolio chuyên nghiệp có 4-5 video hoàn chỉnh đỉnh nhất",
        isOutput: false,
        mapping: {
          troubleshoot: "Tối ưu Profile: Xem <strong>Elite Pro Phần 5 (Review Profile/Tối ưu Portfolio thành viên)</strong>",
          levelUp: "Vibe Code trang web cá nhân: Dùng OpenCode build 1 trang web dark mode gắn link video!",
          monetize: "Portfolio đẹp + xem nhanh trên điện thoại = 90% cơ hội được khách bấm rep tin nhắn."
        }
      },
      {
        id: "s3_t2",
        title: "Lập Gig Fiverr theo chuẩn SEO (Freelance MVP Chương 1)",
        duration: "Phần 1 - 5",
        effortHours: 2.5,
        output: "Gig Fiverr 'High Retention TikTok/Reels Video Editor' lên sóng",
        isOutput: false,
        mapping: {
          troubleshoot: "Xem chi tiết: <strong>freelance-mvp/curriculum.md (Chương 1: Fiverr từ A-Z)</strong>",
          levelUp: "Mẹo lên Top: Phần 4 (Cách để được thuật toán Fiverr đánh giá cao)",
          monetize: "Fiverr là nguồn kéo khách inbound thụ động cực tốt khi gig đã lên rank."
        }
      },
      {
        id: "s3_t3",
        title: "Tạo Profile Upwork & Viết Proposal 'đánh trúng tim đen' khách",
        duration: "Chương 2",
        effortHours: 4.0,
        output: "Gửi 10 - 20 Proposal đầu tiên đến các Job Short Form trên Upwork",
        isOutput: false,
        mapping: {
          troubleshoot: "Xem chi tiết: <strong>upwork-mvp/curriculum.md (Chương 2: Thử thách kiếm tiền tài khoản mới)</strong>",
          levelUp: "Công thức viết Proposal Sean Kang: Nhấn mạnh vào Retention Rate & Tăng view cho kênh.",
          monetize: "Chỉ cần 1 hợp đồng đầu tiên 5 sao, cánh cửa Upwork sẽ mở toang cho bạn!"
        }
      },
      {
        id: "s3_t4",
        title: "🎯 CHỐT ĐƯỢC HỢP ĐỒNG / KHÁCH HÀNG TRẢ TIỀN ĐẦU TIÊN",
        duration: "Cột mốc",
        effortHours: 10.0,
        output: "Nhận thanh toán đầu tiên qua Upwork / Fiverr / Ngân hàng",
        isOutput: true,
        mapping: {
          troubleshoot: "Cách đàm phán & tính giá: Xem <strong>Elite Chương 2.1 (Tổng kết Phần 3: Cách tính giá video)</strong>",
          levelUp: "Học cách làm bài test: <strong>Elite Pro Phần 2 (Quá trình mình làm test Job thật 1h46p)</strong>",
          monetize: "🎉 Xin chúc mừng! Bạn chính thức bước vào hàng ngũ Editor kiếm tiền độc lập!"
        }
      }
    ]
  },
  {
    id: "s4",
    title: "SPRINT 4: CHỐT MONTHLY RETAINER & TỐT NGHIỆP AN TOÀN (TẾT 2027)",
    desc: "Chuyển khách lẻ thành khách ký hợp đồng tháng $500 - $1,000, hoàn tất nghĩa vụ học tập",
    pill: "Về Đích",
    color: "#f43f5e",
    targetWeek: 12,
    tasks: [
      {
        id: "s4_t1",
        title: "Chuyển khách hàng thành Monthly Retainer ($500 - $1,000/tháng)",
        duration: "Chiến lược",
        effortHours: 15.0,
        output: "Có 1 - 2 khách ruột đặt hàng cố định hàng tuần (12-20 video/tháng)",
        isOutput: false,
        mapping: {
          troubleshoot: "Học kinh nghiệm xử lý khách: <strong>Elite Pro Phần 4 (Ghi lại Meeting hàng tuần)</strong>",
          levelUp: "Học cách quản lý nhiều dự án: Áp dụng triệt để GTD trong Doom Emacs / Obsidian.",
          monetize: "Monthly Retainer mang lại dòng tiền ổn định, xóa tan nỗi lo bấp bênh của Freelancer."
        }
      },
      {
        id: "s4_t2",
        title: "Hoàn thành đồ án & Tốt nghiệp trường Đại học đúng hạn",
        duration: "Học vấn",
        effortHours: 20.0,
        output: "Bảo vệ thành công đồ án, giải phóng 100% nghĩa vụ học hành",
        isOutput: false,
        mapping: {
          troubleshoot: "Khung giờ vàng: 13:30 - 15:30 mỗi ngày (theo La Bàn Sinh Tồn 2027)",
          levelUp: "Tận dụng AI giải phóng thời gian viết lách tài liệu học tập.",
          monetize: "Cầm tấm bằng tốt nghiệp trong tay ➔ Hoàn toàn tự do bước ra biển lớn!"
        }
      },
      {
        id: "s4_t3",
        title: "🎯 ĂN TẾT NGUYÊN ĐÁN 2027 VỚI VỊ THẾ CHIẾN THẮNG",
        duration: "Vinh quang",
        effortHours: 5.0,
        output: "Độc lập tài chính, có nghề kiếm tiền bền vững, tương lai rộng mở",
        isOutput: true,
        mapping: {
          troubleshoot: "Nhìn lại hành trình: Mở la bàn <strong>the-personal-compass-of-lang.md</strong>",
          levelUp: "Chuẩn bị cho năm 2027: Mở rộng sang Long Form YouTube & Vibe Coding Tech Creator!",
          monetize: "Bạn đã vượt qua bài test sinh tồn khắc nghiệt nhất một cách xuất sắc!"
        }
      }
    ]
  }
];

// =========================================================================
// 2. LONG-TERM CAREER MASTERY & LONGEVITY TRACK (ĐƯỜNG DÀI SAU KHI CÓ JOB)
// =========================================================================
export const LONG_TERM_TRACK = [
  {
    level: "LEVEL 1: COMMERCIAL SHORT-FORM SPECIALIST",
    incomeRange: "$500 – $1,500 / tháng",
    timeframe: "Tháng 1 – 3",
    role: "Chuyên Gia Video Ngắn Chuyển Đổi Cao (Talking Head & TikTok/Reels)",
    color: "#10b981",
    icon: "📱",
    coreCourses: ["DaVinci Elite Chương 1.2", "Freelance MVP", "Upwork MVP"],
    skills: [
      "Rough Cut A-Roll tốc độ cao với cụm phím Q-W-E-S-D (30 phút/video)",
      "Chuẩn hóa Audio Leveling (-6dB), khử ồn Voice Isolation & Auto Ducking",
      "Kinetic Subtitles phong cách Alex Hormozi (nhảy từng từ bắt mắt)",
      "Quy trình giao tiếp khách hàng quốc tế, viết Proposal đánh trúng pain point"
    ],
    deliverables: "Duy trì 4–6 video ngắn/tuần cho 1–2 khách hàng Retainer cố định."
  },
  {
    level: "LEVEL 2: HIGH-RETENTION YOUTUBE LONG-FORM STORYTELLER",
    incomeRange: "$1,500 – $3,000 / tháng",
    timeframe: "Tháng 3 – 6",
    role: "Nhà Kể Chuyện Video Dài (YouTube Documentary, Podcasts & Vlogs)",
    color: "#38bdf8",
    icon: "🖥️",
    coreCourses: ["DaVinci Elite Chương 2 & 3.1", "Speed Ramp Bất Động Sản & Xe", "CapCut Pro Mastery"],
    skills: [
      "Cắt thô theo công thức Note Idea cho cấu trúc video dài 10–20 phút",
      "Nghệ thuật Visual Pacing & B-Roll Storytelling giữ chân người xem liên tục",
      "Thiết kế âm thanh đa tầng (Multi-layer Sound Design & SFX Risers)",
      "Speed Ramp kịch tính kết hợp Masking xe cộ và bất động sản"
    ],
    deliverables: "Sản xuất 2–4 video YouTube dài/tháng ($300 – $600/video)."
  },
  {
    level: "LEVEL 3: CREATIVE DIRECTOR & 3D MOTION GRAPHICS LEAD",
    incomeRange: "$3,000 – $5,000 / tháng",
    timeframe: "Tháng 6 – 12",
    role: "Trưởng Nhóm Kỹ Xảo & Sáng Tạo Chữ Ký (Signature Motion & Branding)",
    color: "#c084fc",
    icon: "⭐",
    coreCourses: ["Elite Pro Breakdown (57 Videos)", "Keyframe Animation", "Fusion 101"],
    skills: [
      "Làm chủ Fusion Node, Camera 3D, DVE 3D phong cách Kallaway",
      "Kỹ xảo Line Neon Iman Gadzhi & Xé giấy Ali Abdaal",
      "Đóng gói Macro / Template Fusion độc quyền bán cho Agency",
      "Định hướng nghệ thuật (Art Direction) và Color Grading chuẩn Log/CST"
    ],
    deliverables: "Lead Editor cho các kênh lớn 100k - 1M sub hoặc Agency quốc tế."
  },
  {
    level: "LEVEL 4: AI-NATIVE TECH CREATOR & PRODUCTION STUDIO",
    incomeRange: "$5,000+ / tháng (Scale Up)",
    timeframe: "Năm thứ 2 trở đi",
    role: "Chủ Studio Sản Xuất Nội Dung Ứng Dụng AI & Tự Động Hóa",
    color: "#f59e0b",
    icon: "🚀",
    coreCourses: ["Tư duy Dev (The Odin Project / Vibe Coding)", "FlowKit Automation", "Team Delegation"],
    skills: [
      "Tự động hóa quy trình Ingest & Render bằng Script (Python/ffmpeg)",
      "Sử dụng AI Agent (OpenCode/FlowKit) sản xuất B-roll hàng loạt độc quyền",
      "Sở hữu kênh Media Brand cá nhân kết hợp đào tạo hoặc nhận thầu dự án lớn",
      "Quản lý đội ngũ junior editor cắt thô để giải phóng thời gian bản thân"
    ],
    deliverables: "Hệ thống truyền thông tự vận hành và Studio hậu kỳ chuyên nghiệp."
  }
];
