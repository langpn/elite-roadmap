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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 0.2: Khởi Đầu & RAW Thực Hành",
            title: "Bài 01 - Nguồn tìm RAWs để thực hành (kèm kho tài nguyên chung)",
            duration: "3 phút",
            focus: "Biết chỗ lấy kho RAW chính thức của Sean Kang và link Google Drive bộ SFX/Font/Overlay dùng chung."
          },
          {
            isPrimary: false,
            course: "Khóa Baby Resolve",
            chapter: "Chương 3: Media Storage & Bins",
            title: "Bài 06 - Cách lưu trữ Power Bins vĩnh viễn dùng cho mọi dự án",
            duration: "8 phút",
            focus: "Kéo thả kho SFX vào Power Bins trên Mac để dự án nào cũng tự động có sẵn âm thanh mà không phải import lại."
          }
        ],
        watchStrategy: "Chỉ cần xem lướt Bài 01 Chương 0.2 trong 3 phút để lấy link Drive -> Giải nén thẳng vào <code>~/studio/Projects/Reel_01_Matthiew/RAW/</code> -> Xem nhanh bài Power Bins trong Baby Resolve để gom SFX vào Master.",
        solution: {
          steps: [
            "Vào thư mục: <code>~/Documents/edit-courses/resources/Tài nguyên khoá học/RAW (Footages thô thực hành)/RAW Talking Head Video (từ gói Elite trở lên)/RAW thực tế của khách hàng (dạng dọc)/</code>.",
            "Giải nén file <code>(Marketing) Matthiew Adams.zip</code> và đưa toàn bộ video thô vào <code>~/studio/Projects/Reel_01_Matthiew/RAW/</code>.",
            "Mở DaVinci Resolve -> Media Storage -> Kéo toàn bộ folder Sound Effects vào <strong>Master -> Power Bins</strong> để dự án nào cũng tự động có sẵn âm thanh."
          ],
          tip: "Power Bins lưu vĩnh viễn trên máy Mac của bạn. Hãy gom sẵn SFX thành các nhóm: Whoosh, Pop, Click, Riser, Impact để lấy ngay chỉ trong 1 giây."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 0.1 & 0.2",
            title: "Bài: Hướng Dẫn Tổng Quan Gói Elite & Lưu ý trước khi thực hành",
            duration: "6 phút",
            focus: "Triết lý dùng phím tắt độc quyền của Sean Kang để giải phóng hoàn toàn bàn tay phải và chuột."
          },
          {
            isPrimary: false,
            course: "Khóa Baby Resolve",
            chapter: "Chương 1 & Chương 2",
            title: "Bài 04.2 (Import Keyboard Presets) & Bài 02 (Live Save & Project Backups)",
            duration: "10 phút",
            focus: "Cài preset phím tắt và bật Live Save trong Preferences để DaVinci tự động lưu từng mili-giây, không sợ crash."
          }
        ],
        watchStrategy: "Mở DaVinci Resolve song song -> Bấm phím tắt Option + Cmd + K làm theo đúng 3 phút -> Đặt tay thử lên 4 phím Q-W-E-Spacebar để tạo phản xạ cơ bắp.",
        solution: {
          steps: [
            "Mở DaVinci Resolve -> Menu góc trái chọn <code>DaVinci Resolve -> Keyboard Customization</code> (hoặc bấm <code>Option + Command + K</code>).",
            "Bấm vào dấu 3 chấm góc phải trên -> <code>Import Preset</code> -> Chọn file phím tắt <code>Sean Kang 2025</code> trong folder tài nguyên.",
            "Học thuộc 5 phím thần thánh: <kbd class='solution-kbd'>Q</kbd> (Ripple Start to Playhead), <kbd class='solution-kbd'>W</kbd> (Ripple End to Playhead), <kbd class='solution-kbd'>E</kbd> (Split Clip), <kbd class='solution-kbd'>S</kbd> (Select Clip), <kbd class='solution-kbd'>D</kbd> (Ripple Delete).",
            "Vào <code>Preferences</code> (<code>Command + ,</code>) -> <code>User -> Project Save and Load</code> -> Tích bật <strong>Live Save</strong> & <strong>Project Backups every 10 mins</strong>."
          ],
          tip: "Live Save giúp bạn không bao giờ bị mất file khi DaVinci bị crash hoặc sập nguồn máy."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P1 - Thị Trường (Toàn cảnh giá cả, khách hàng & tư duy video ngắn)",
            duration: "31 phút",
            focus: "Hiểu vì sao khách hàng quốc tế trả $35-$60/video ngắn, họ cần tốc độ 24-48h và âm thanh sạch hơn là kỹ xảo màu mè."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 0.2",
            title: "Bài 03 - LIVE tìm RAW phần 2 (Bóc tách cấu trúc video creator lớn)",
            duration: "12 phút",
            focus: "Xem cách Sean Kang bóc tách 3 giây đầu tiên (Hook Retention) của các kênh triệu view."
          }
        ],
        watchStrategy: "Bật video <strong>P1 - Thị Trường (Chương 1.2)</strong> với tốc độ 1.25x và bật phụ đề tiếng Việt <code>P1 - Thị Trường.srt</code> đã được kiểm định sạch để ngấm tư duy làm giàu từ video ngắn.",
        solution: {
          steps: [
            "Ghi nhớ quy luật sinh tử: Khán giả quyết định xem tiếp hay lướt đi trong <strong>3 giây đầu tiên (Hook Retention)</strong>.",
            "Mở video thô của Matthiew Adams, nghe lướt toàn bộ nội dung với tốc độ 1.5x (nhấn phím <kbd class='solution-kbd'>L</kbd> 2 lần).",
            "Dùng phím <kbd class='solution-kbd'>M</kbd> (Marker) để ghim sẵn: Câu nói sốc/kịch tính nhất để cắt đưa lên đầu làm Hook, và các đoạn ừ à cần loại bỏ."
          ],
          tip: "Đừng vội thêm màu mè. Một video triệu view bắt đầu từ việc cắt nhịp A-Roll dồn dập, gãy gọn, không có khoảng thở thừa."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P3 - Thông số Timeline & FPS (12:03) & P4 - Cắt RAW và lưu ý khi cắt RAW (14:17)",
            duration: "26 phút",
            focus: "Thiết lập Timeline 1080x1920 30fps. Quy tắc vàng: Khẩu hình đi trước âm thanh 2-3 frames, không chém cụt âm đuôi (s, t, k, d), thao tác Q-W-E dứt khoát."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.1: Level 1 Cơ Bản",
            title: "Bài 03 - Thực hành video cho khách hàng Marcus (Xem chặng 06:00 - 22:00)",
            duration: "16 phút",
            focus: "Xem Sean Kang trực tiếp cắt thô A-Roll trên footage khách hàng quốc tế thật bằng cụm phím công thái học Q-W-E."
          }
        ],
        watchStrategy: "Đọc trước cẩm nang <code>chuong-1.2/TIMELINE_CHI_TIET.md</code> -> Mở video P3 & P4 trên IINA xem ở tốc độ 1.25x -> Mở DaVinci thực hành cắt ngay file RAW Matthiew Adams.",
        solution: {
          steps: [
            "<strong>B1 (Tạo Project & 3 Bins chuẩn):</strong> Bấm <code>Shift + 1</code> tạo New Project <code>Reel_01_Sprint1_Master</code> -> Vào Edit Page (<code>Shift + 4</code>) -> Chuột phải bảng Media Pool tạo 3 Bins: <code>RAWs</code>, <code>Timelines</code>, <code>Audio_SFX</code>.",
            "<strong>B2 (Import RAW & Tạo Timeline 9:16 30fps):</strong> Mở bin <code>RAWs</code> bấm <code>Cmd + I</code> chọn <code>RAW.mov</code> (Matthiew Adams) thả vào (chọn <em>Don't Change</em> frame rate) -> Bấm vào bin <code>Timelines</code> bấm <code>Cmd + N</code> -> Bỏ tích <em>Use Project Settings</em> -> Format: Tích chọn <strong>Use Vertical Resolution</strong> (1080 x 1920) & <strong>Timeline Frame Rate: 30 fps</strong> -> Kéo RAW xuống Timeline.",
            "<strong>B3 (Tư thế tay trái & Phóng to sóng âm):</strong> Chuyển bộ gõ macOS sang <strong>English (ABC)</strong> -> Bấm <code>Shift + W</code> (hoặc <code>Cmd + =</code>) phóng to sóng âm thanh màu xanh lá cây -> Đặt 4 ngón tay: Ngón áp út đè <kbd class='solution-kbd'>Q</kbd> (gọt đầu), ngón giữa đè <kbd class='solution-kbd'>W</kbd> (cắt đôi) / <kbd class='solution-kbd'>S</kbd> (xóa), ngón trỏ đè <kbd class='solution-kbd'>E</kbd> (gọt đuôi), ngón cái đè <code>Spacebar</code>.",
            "<strong>B4 (Cắt thô không cụt - không thừa):</strong> Nhìn sóng âm phồng to là có tiếng, phẳng lì là ừ à. Dứt câu bấm dừng -> Kéo kim qua đoạn ừ à đến đầu câu sau -> Bấm nhẹ <kbd class='solution-kbd'>Q</kbd> để gọt sạch khoảng lặng -> Chừa lại <strong>2 frame đệm</strong> tránh chém cụt âm đuôi (-s, -ed, -t) -> Rút gọn từ 2 phút xuống còn đúng <strong>30–45 giây</strong>."
          ],
          tip: "Bí quyết Master 1 lần: Xem video 'Elite C1.1 Bài 03 (Marcus)' chia 4 chặng: 0-6p (Setup Bins/Timeline), 6-22p (Cắt A-Roll Q-W-E), 22-35p (Âm thanh -6dB), 35-48p (Xuất file). Xem đến đâu bấm Pause làm theo đến đó!"
        },
        mapping: {
          troubleshoot: "Kẹt nhịp cắt / băn khoăn khi nào xóa - khi nào chia? Mở Main Zettel: <strong>nghe-thuat-rough-cut-a-roll-va-tu-duy-hai-vong-cat.md</strong>",
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P5 - Bố cục & Âm thanh (08:25)",
            duration: "8 phút",
            focus: "Quy tắc khoảng cách đỉnh đầu (Headroom 10-15%), Safe Zone 9:16 và chuẩn âm lượng giọng nói True Peak -6dB đến -3dB."
          },
          {
            isPrimary: false,
            course: "Khóa Baby Resolve",
            chapter: "Chương 9: Trang Fairlight Thực Chiến",
            title: "Bài 03 (Voice Isolation) & Bài 05 (Normalize Audio Levels)",
            duration: "12 phút",
            focus: "Cách bật Voice Isolation khử tiếng ồn môi trường và Normalize -6.0 dBFS tự động cho toàn bộ clip thoại."
          }
        ],
        watchStrategy: "Video P5 rất súc tích (8 phút), xem 1 lần duy nhất trên IINA -> Chuyển sang DaVinci áp dụng ngay Voice Isolation (75-80%) và Normalize -6dB lên audio track của Matthiew.",
        solution: {
          steps: [
            "Chọn toàn bộ track audio A1 trên Timeline.",
            "Mở Inspector -> Tab Audio -> Bật tính năng <strong>Voice Isolation</strong> (kéo thanh gạt về mức 75% - 85% để khử ồn quạt mà không làm méo tiếng).",
            "Chuột phải vào clip audio -> Chọn <strong>Normalize Audio Levels</strong> -> Chọn chuẩn <em>True Peak</em> -> Đặt Target là <strong>-6.0 dBFS</strong>.",
            "Vào trang Fairlight: Bật EQ cắt bỏ tần số trầm dưới 80Hz (High-Pass Filter) để tiếng nói trong trẻo và sáng giọng."
          ],
          tip: "Âm thanh dở là người xem tắt video ngay giây đầu tiên. Luôn giữ giọng nói ổn định ở mức -6dB, và nhạc nền ở mức -18dB đến -22dB."
        },
        mapping: {
          troubleshoot: "Kẹt lọc ồn / cân bằng âm lượng? Mở Main Zettel: <strong>chuan-hoa-bo-cuc-reframe-va-audio-leveling-truoc-khi-edit.md</strong>",
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P6 - Chạy sub & chỉnh sub (32:26) & P7 - Chỉnh sửa sub (61:22)",
            duration: "1h 33p",
            focus: "Kỹ thuật ngắt cụm sub 2-5 từ theo nhịp thở, chuyển subtitle sang Text+, đổi màu từ khóa Vàng neon / Đỏ cam, thêm viền Stroke đen 10px."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.1: Level 1 Cơ Bản",
            title: "Bài 02 (Cài đặt Snap Caption) & Bài 2.1 (Lỗi thường gặp với Snap Caption)",
            duration: "4 phút",
            focus: "Hiểu bản chất cách Snap Caption chuyển đổi subtitle thành Text+ tự động mà không bị đè track."
          }
        ],
        watchStrategy: "Xem P6 để nắm nhịp ngắt câu -> Tua nhanh P7 đến phút 15:00 xem cách tạo style chữ Text+ và đổi màu từ khóa -> Cài đặt template Snap Caption trong folder resources.",
        solution: {
          steps: [
            "Vào menu <code>Timeline -> Create Subtitles from Audio</code> (chọn Language: English, Max characters: 12-14 từ).",
            "Chọn track Subtitle -> Inspector -> Tab Style: Đổi font sang <strong>The Bold Font</strong> hoặc <strong>Montserrat Black</strong>, Size: 85, Stroke viền đen: 12px.",
            "Chuyển subtitle sang Text+ để custom: Màu chữ nền trắng, các từ khóa tiền bạc/hành động đổi màu Vàng (<code>#FFD700</code>) hoặc Xanh lá (<code>#22C55E</code>).",
            "Áp dụng Template <code>Snap Captions Template</code> trong thư mục <code>resources</code> để chữ tự động nảy nhẹ từng từ."
          ],
          tip: "Không để quá 3 dòng chữ xuất hiện cùng lúc. Tốt nhất là 1-3 từ nhảy nhịp nhàng theo đúng tốc độ nói của nhân vật."
        },
        mapping: {
          troubleshoot: "Kẹt tạo style sub / ngắt nhịp? Mở Main Zettel: <strong>quy-chuan-phu-de-va-kinetic-typography-alex-hormozi.md</strong>",
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.1 - Hoàn thiện Reel 1 Level 1 (Khách hàng Matthiew Adams)",
            duration: "25 phút",
            focus: "Thực hành dựng hoàn chỉnh file RAW Matthiew Adams từ A-Z: Cắt thô 18.6s, sub clean, chèn ảnh B-roll icon tiền và góc làm việc, xử lý bẫy viền Fusion bằng Compound Clip."
          },
          {
            isPrimary: false,
            course: "Khóa Baby Resolve",
            chapter: "Chương 10: Trang Deliver Xuất File",
            title: "Bài 01 & 02: Thiết lập render MP4 H.264 chuẩn mạng xã hội",
            duration: "10 phút",
            focus: "Thông số Render MP4 1080x1920 30fps, bitrate 15,000 Kbps sắc nét mà nhẹ máy."
          }
        ],
        watchStrategy: "Mở cẩm nang <code>~/studio/Projects/Reel_01_Matthiew/HUONG_DAN_THUC_HANH_REEL_01.md</code> -> Bật video P8.1 -> Vừa xem vừa dựng hoàn thiện Reel 1 và xuất file ngay vào máy.",
        solution: {
          steps: [
            "Kiểm tra lại toàn bộ: A-Roll liền mạch không vấp, lọc ồn -6dB sạch sẽ, phụ đề khớp 100% với lời nói.",
            "Áp dụng chuẩn Level 1 Sean Kang: Sub gọn gàng clean, cắt thô không cụt không thừa âm đuôi, Hook 3s mở đầu chiếm 50% thành bại.",
            "Chuyển sang trang <strong>Deliver</strong> (icon tên lửa): Format <code>MP4</code>, Codec <code>H.264</code>, Resolution <code>1080 x 1920</code>.",
            "Mục Quality: Chọn <em>Restrict to</em> <strong>15,000 Kb/s</strong> (file sắc nét mà dung lượng nhẹ chỉ ~20-30MB).",
            "Bấm <code>Add to Render Queue</code> -> <code>Render All</code> -> Lưu file vào <code>~/studio/Reels_Export/Reel_01_Matthiew_Basic.mp4</code>.",
            "Airdrop qua điện thoại xem lại thực tế để kiểm tra bố cục Safe Zone."
          ],
          tip: "Chuẩn nghiệm thu Reel 1: Âm thanh -6dB, cắt thô dứt khoát không phạm âm đuôi, sub clean không lỗi chính tả, hoàn thành timeline dưới 30 phút!"
        },
        mapping: {
          troubleshoot: "Kẹt render? Xem: <strong>Baby Resolve C10-B01 & B02 (Deliver MP4 chuẩn)</strong>",
          levelUp: "Nắm trọn nguyên lý 2 vòng cắt A-Roll: Mở Main Zettel <strong>nghe-thuat-rough-cut-a-roll-va-tu-duy-hai-vong-cat.md</strong>",
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.2 - Hoàn thiện Reel 2 Level 1 (30:56)",
            duration: "31 phút",
            focus: "Nghệ thuật Typography: Sắp xếp vị trí chữ dẫn dắt mắt nhìn, Emojis 3D minh họa, chèn SFX Pop/Click đúng mili-giây chữ nảy."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.1: Level 1 Cơ Bản",
            title: "Bài 07 - Bản chất các loại Text, Subtitles (10:00)",
            duration: "10 phút",
            focus: "Hiểu sâu sự khác biệt giữa Text thường, Text+ và Subtitle Track để không bị vỡ bố cục khi re-scale."
          }
        ],
        watchStrategy: "Xem P8.2 trên IINA -> Nhân bản Timeline Reel 1 -> Tinh chỉnh vị trí chữ và thêm 4-5 icon Emojis từ kho tài nguyên <code>resources/Icons-Emojies/</code> -> Render Reel 2.",
        solution: {
          steps: [
            "Nhân bản Timeline Reel 1 (<code>Command + D</code>) -> Đổi tên thành <code>Reel_02_Typography</code>.",
            "Căn chỉnh vị trí chữ theo Safe Zone 9:16: Đặt cụm chữ ở 1/3 phía trên (tầm mắt nhìn tự nhiên, tránh bị giao diện TikTok che).",
            "Chèn các Emojis 3D và icon PNG minh họa ngay cạnh từ khóa nổi bật.",
            "Rải âm thanh SFX <kbd class='solution-kbd'>Pop.wav</kbd> hoặc <kbd class='solution-kbd'>Click.wav</kbd> đúng frame icon và từ khóa xuất hiện.",
            "Render xuất file <code>Reel_02_Matthiew_Typography.mp4</code>."
          ],
          tip: "Quy tắc vàng: Mỗi khi một chi tiết đồ họa hoặc từ khóa quan trọng xuất hiện, bắt buộc phải có 1 tiếng SFX tinh tế đi kèm."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.3 - Hoàn thiện Reel 3 Level 1 (44:26)",
            duration: "44 phút",
            focus: "Kỹ thuật Punch-in Zoom (1.15x) mỗi khi chuyển ý, tạo chuyển động nảy cho cụm từ khóa (Pop-up scale keyframe), rải SFX Swoosh mượt mà."
          },
          {
            isPrimary: false,
            course: "Khóa Keyframe Animation",
            chapter: "Nguyên Lý Chuyển Động",
            title: "Bài 01 - 03: Bản chất Keyframe, Spline và Easing curves",
            duration: "15 phút",
            focus: "Làm chủ đồ thị Spline để chuyển động zoom và nảy chữ mượt mà tự nhiên, không bị giật khựng."
          }
        ],
        watchStrategy: "Xem P8.3 tập trung vào kỹ thuật cắt chia clip đổi góc máy -> Áp dụng trực tiếp vào dự án -> Render xuất file Reel 3.",
        solution: {
          steps: [
            "Nhân bản Timeline Reel 2 -> Đặt tên <code>Reel_03_DynamicZoom</code>.",
            "Cứ mỗi 3-5 giây (hoặc mỗi khi đổi ý), thực hiện 1 cú <strong>Punch-in Zoom</strong>: Cắt clip bằng phím <kbd class='solution-kbd'>E</kbd>, phóng to đoạn sau lên <code>Scale 1.15</code>.",
            "Áp dụng hiệu ứng <em>Dynamic Zoom</em> (chọn chế độ Slow Ease) ở các đoạn kể chuyện cao trào.",
            "Tạo hiệu ứng nảy cho chữ: Keyframe Size từ 1.2 co về 1.0 trong 4 frames.",
            "Render xuất file <code>Reel_03_Matthiew_Motion.mp4</code>."
          ],
          tip: "Thay đổi góc máy liên tục bằng Punch-in Zoom là vũ khí số 1 để giữ khán giả không bao giờ thấy nhàm chán."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.4 - Hoàn thiện Reel 4 Level 1 (80:58)",
            duration: "1h 21p",
            focus: "Dự án Master Level 1 tổng hợp: Chèn B-roll cảnh phim/stock, hòa trộn âm thanh Voice -6dB / Nhạc đệm -22dB / SFX -12dB, hoàn thiện sản phẩm thương mại cao cấp."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.1: Level 1 Cơ Bản",
            title: "Bài 04 - Thực hành video Style Alex Hormozi (45:00)",
            duration: "45 phút",
            focus: "Tham khảo phong cách dựng video triệu view của Alex Hormozi để tăng tính giải trí và giữ chân khán giả."
          }
        ],
        watchStrategy: "Đây là bài giảng Master tổng hợp của Level 1. Hãy xem từng chặng 20 phút -> Dừng lại thao tác trực tiếp trên DaVinci -> Xuất bản phẩm Master hoàn hảo nhất để đưa lên đầu Portfolio.",
        solution: {
          steps: [
            "Nhân bản Timeline -> Đặt tên <code>Reel_04_Commercial_Showcase</code>.",
            "Chèn B-Roll thực tế (footage stock trong kho <code>resources</code>) đè lên track V2 mỗi khi nhân vật mô tả một hành động.",
            "Thêm nhạc nền Lo-fi/Upbeat -> Kích hoạt <strong>Auto Ducking</strong> (hoặc hạ volume nhạc xuống -20dB khi có giọng nói).",
            "Áp dụng hiệu ứng chuyển cảnh Whoosh Transitions mượt mà giữa các cảnh quay.",
            "Render xuất file Master chất lượng cao nhất: <code>Reel_04_Commercial_Showcase.mp4</code>."
          ],
          tip: "Đây chính là video danh thiếp bỏ đầu tiên vào Portfolio. Khách hàng xem xong video này là muốn ký hợp đồng ngay!"
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 & Level 3",
            title: "David Goggins Part 1 (Chọn RAW & Cắt thô), Part 2 (Ý tưởng Edit), Part 3 (Làm Hook Intro)",
            duration: "37 phút",
            focus: "Chọn câu nói đanh thép nhất đưa lên 3 giây đầu, kỹ thuật Speed Ramp 350% -> 100% kèm Whoosh, Camera Shake nhẹ tạo năng lượng dồn dập."
          },
          {
            isPrimary: false,
            course: "Khóa Speed Ramp",
            chapter: "Chương 1: Speed Ramp Cơ Bản",
            title: "Speed Ramp kịch tính trên Edit page (Curve Ramping)",
            duration: "15 phút",
            focus: "Uốn cong đường cong tốc độ bằng Retime Curve để đoạn tăng tốc chuyển mượt sang slow-mo."
          }
        ],
        watchStrategy: "Xem Part 1 & Part 3 của Goggins trên IINA -> Mở DaVinci thực hành cắt đúng 3 giây đầu tiên cho clip động lực để tạo cảm giác bùng nổ ngay từ frame đầu.",
        solution: {
          steps: [
            "Mở folder tài nguyên David Goggins trong kho <code>resources</code>.",
            "Chọn câu nói đanh thép nhất cắt đưa lên 3 giây đầu làm Hook mở màn.",
            "Tạo hiệu ứng Speed Ramp: Cắt clip làm 3 đoạn -> Đoạn giữa tăng tốc 350% -> Đoạn cuối trả về 100% kèm âm thanh Whoosh.",
            "Tô chữ Hook sang màu Đỏ rực kết hợp hiệu ứng rung màn hình (Camera Shake nhẹ trong DaVinci)."
          ],
          tip: "Trong 3 giây đầu, không để sót 1 mili-giây khoảng trống nào. Cả hình ảnh, âm thanh và phụ đề phải dồn dập đập thẳng vào mắt người xem."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 & Level 3",
            title: "David Goggins Part 4 (Animation 1 & 2), Part 6 (Cắt đôi chữ Refuse), Part 7 & Part 8 (SFX & Nhạc)",
            duration: "40 phút",
            focus: "Kỹ thuật Polygon Mask cắt đôi chữ 'Refuse' trượt sang hai bên, phủ lớp Film Grain / Dust Overlay bụi bặm, Color Grading tương phản cao chất điện ảnh gai góc."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 5: Hiệu Ứng Thường Sử Dụng",
            title: "Effect 06 (Tạo Background) & Effect 15 (Animation Xé/Gấp giấy của Ali Abdaal)",
            duration: "13 phút",
            focus: "Thủ thuật tạo background tối kết hợp lớp xé giấy để làm nổi bật thông điệp."
          }
        ],
        watchStrategy: "Xem kỹ Part 6 về hiệu ứng cắt đôi chữ trong Fusion -> Làm theo từng thao tác -> Xuất file <code>Reel_David_Goggins_Hardcore.mp4</code>.",
        solution: {
          steps: [
            "Mở Fusion Page: Dùng Polygon Mask tạo hiệu ứng chữ xé đôi (Split Text Refuse) tách sang 2 bên.",
            "Thêm lớp phủ bụi điện ảnh (Film Grain / Dust Overlay) và hiệu ứng Glow viền đỏ.",
            "Trang Color: Đẩy Contrast cao, giảm bão hòa các gam màu ấm, tăng tông lạnh tạo chất điện ảnh cơ bắp, gai góc.",
            "Render xuất file hoàn chỉnh: <code>Reel_David_Goggins_Hardcore.mp4</code>."
          ],
          tip: "Niche Động lực thể hình (Gym & Mindset) là ngách có lượng khách hàng chi trả rất hào phóng trên Upwork."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 & Level 3",
            title: "Daniel Iles: Hook Amazon, Animation Icon (2 bài), Animation Amazon 2, Bevel chữ Alcoholics, Hook Harvard",
            duration: "1h 17p",
            focus: "Hiệu ứng nổi khối chữ Bevel Emboss, số tiền nhảy tự động bằng Modifier Text+ Counter, xoay logo 3D DVE, nhắm trúng tệp khách hàng Tài chính / Fintech trả $50-$70/video."
          },
          {
            isPrimary: false,
            course: "Khóa Fusion 101",
            chapter: "Chương 1: Nền Tảng Node Trong Fusion",
            title: "Bài 01 - 05: Merge Node, Transform, Background, DVE xoay 3D",
            duration: "20 phút",
            focus: "Nắm vững nguyên lý kết nối các Node trong Fusion để không bị rối dây hay mất hình."
          }
        ],
        watchStrategy: "Xem bài Bevel chữ và bài Animation Amazon -> Thực hành tạo bộ đếm số tiền từ 0 lên $10,000 -> Ghép âm thanh Cash Register -> Xuất file <code>Reel_Daniel_Iles_Finance.mp4</code>.",
        solution: {
          steps: [
            "Trong Fusion: Tạo mock-up thẻ ngân hàng và logo Amazon xoay 3D (DVE Node).",
            "Tạo hiệu ứng nổi khối chữ (Bevel Emboss) và hiệu ứng kính lúp phóng to số liệu.",
            "Tạo bộ đếm tiền tự động: Thêm Modifier <em>Text+ -> Counter</em> để số tiền nhảy từ 0 lên $10,000.",
            "Rải SFX tiếng tiền xu rơi (<kbd class='solution-kbd'>Cash_Register.wav</kbd>, <kbd class='solution-kbd'>Coin_Drop.wav</kbd>).",
            "Render xuất file <code>Reel_Daniel_Iles_Finance.mp4</code>."
          ],
          tip: "Niche Tài chính & Công nghệ (Fintech) sẵn sàng trả mức giá gấp đôi ($40 - $70/video) so với các kênh thông thường."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 & Level 3",
            title: "Jvevermind Part 1 - 5 (Cắt thô, Ý tưởng, B-roll, Animation chữ, Tracking intro) & Bài 25 - Khoai Lang Thang Xếp chữ",
            duration: "1h 53p",
            focus: "Nhịp thở Pacing chậm rãi cho video tâm sự/du lịch, kỹ thuật xếp chữ theo bố cục nghệ thuật, thiết kế âm thanh đa tầng (Soundscape), Color Space Transform (CST) Rec.709."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1",
            title: "Tổng kết Part 2 (Cách tìm ý tưởng Edit cho mọi công việc) & Part 3 (Cách tính giá video)",
            duration: "25 phút",
            focus: "Tư duy bóc tách ý tưởng của Sean Kang để gặp bất kỳ loại video nào cũng biết cách dựng và báo giá."
          }
        ],
        watchStrategy: "Tập trung xem Bài 25 Khoai Lang Thang và Jvevermind Part 4 & 5 -> Thực hành xếp chữ theo nhịp acoustic -> Xuất file <code>Reel_Cinematic_Storytelling.mp4</code>.",
        solution: {
          steps: [
            "Làm chủ nhịp thở Pacing: Kéo dài các khoảng ngắt nghỉ có chủ đích cho video tâm sự / du lịch.",
            "Chuyển đổi màu Log sang Rec.709 chuẩn điện ảnh bằng Color Space Transform (CST Node).",
            "Thiết kế soundscape đa tầng: Tiếng bước chân, tiếng chim hót, tiếng gió hòa cùng nhạc acoustic êm dịu.",
            "Render xuất file <code>Reel_Cinematic_Storytelling.mp4</code>."
          ],
          tip: "Kỹ năng kể chuyện cảm xúc chính là chìa khóa mở cánh cửa làm YouTube Long-Form chất lượng cao sau này."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Freelance MVP",
            chapter: "Chương 4: Mindset & Thiết Lập Portfolio",
            title: "Bài đọc: Thiết lập Portfolio đẹp - FREE & Chương 3 Phần 6: Thiết lập Website Portfolio cho riêng bạn",
            duration: "20 phút",
            focus: "Cấu trúc 3 folder Google Drive (Talking Head / Motivation / Finance), chọn 2 video đẹp nhất lên đầu trang, đặt tên file chuẩn."
          },
          {
            isPrimary: false,
            course: "Khóa Elite Pro",
            chapter: "Phần 5: Review Profile & Portfolio",
            title: "Review Profile / Tối ưu Portfolio thành viên trong khóa (Bóc tách lỗi sai khiến khách lướt qua)",
            duration: "25 phút",
            focus: "Tránh các lỗi portfolio phổ biến: Link bị khóa quyền truy cập, video quá dài, không ghi rõ vai trò editor."
          }
        ],
        watchStrategy: "Đọc Chương 4 Freelance MVP -> Tạo ngay folder Google Drive public -> Xem Phần 5 Elite Pro để checklist lại các lỗi trước khi gửi link cho khách.",
        solution: {
          steps: [
            "Tạo 1 folder Google Drive công khai: <code>[Your Name] - High Retention Short-Form Portfolio</code>.",
            "Chia 3 folder con: <code>01_Business_Talking_Head</code> (Reel 1 & 4), <code>02_High_Energy_Motivation</code> (David Goggins), <code>03_Finance_Motion</code> (Daniel Iles).",
            "Mở quyền truy cập: <em>Bất kỳ ai có liên kết đều có thể xem</em>.",
            "Tạo 1 trang web Notion hoặc GitHub Pages đơn giản nhúng link xem trực tiếp."
          ],
          tip: "Khách hàng bận rộn chỉ dành 30 giây để lướt portfolio. Hãy đặt 2 video đẹp nhất lên ngay hàng đầu!"
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Freelance MVP",
            chapter: "Chương 1: Fiverr từ A - Z",
            title: "Phần 1 - 5: Tổng quan, Lập Gigs & Tối ưu Gigs, Thực hành lập Gig thực tế, Cách để thuật toán Fiverr đánh giá cao",
            duration: "45 phút",
            focus: "Tiêu đề Gig SEO 'I will edit engaging tiktok reels alex hormozi style with high retention', thiết kế thumbnail Before/After 1280x769px, tải Reel 4 làm Gig Preview Video."
          },
          {
            isPrimary: false,
            course: "Khóa Freelance MVP",
            chapter: "Chương 5: Khách Hàng / Giao Tiếp",
            title: "Phần 4: Tính giá Công việc ($25 - $65 - $120)",
            duration: "15 phút",
            focus: "Chiến lược đặt 3 gói giá Basic / Standard / Premium để kích thích khách bấm đặt hàng nhanh."
          }
        ],
        watchStrategy: "Xem Phần 2 & 3 của Chương 1 trên IINA -> Mở trình duyệt làm theo từng trường form của Fiverr -> Upload video Reel 4 lên làm preview.",
        solution: {
          steps: [
            "Đặt tiêu đề Gig chuẩn SEO: <em>'I will edit engaging tiktok reels alex hormozi style with high retention'</em>.",
            "Thiết kế thumbnail kích thước 1280x769px dạng so sánh Before/After kèm chữ 'High Retention Editor'.",
            "Tải video Reel 4 lên làm Gig Preview Video (tăng 200% tỷ lệ click).",
            "Đặt 3 gói giá hợp lý: Basic ($25 - 1 video), Standard ($65 - 3 video), Premium ($120 - 6 video)."
          ],
          tip: "Ở giai đoạn đầu, hãy để giá khởi điểm $20-$25 để gom 3 đánh giá 5 sao đầu tiên thật nhanh."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2: Thực Hành từ A-Z & Kiếm Tiền",
            title: "Phần 4 (Thiết lập & Tối ưu profile), Phần 14 (Cách Viết Proposal/CV Ứng Tuyển), Phần 15 (Thực Hành Tìm Job - Nộp Proposal - Chốt Đơn)",
            duration: "50 phút",
            focus: "Công thức viết Proposal 3 phần dưới 5 dòng của Sean Kang: Nêu vấn đề tụt view -> Đính kèm 1 link video khớp nhất -> Đề xuất làm bài test ngắn 15s."
          },
          {
            isPrimary: false,
            course: "Khóa Freelance MVP",
            chapter: "Chương 2: Upwork",
            title: "Phần 4 (Lọc danh sách công việc), Phần 5 (Đánh giá công việc ngon), Phần 8 (Lưu ý khi viết Proposal)",
            duration: "30 phút",
            focus: "Cách soi Payment Verified, Hire Rate > 60%, tránh job lừa đảo hoặc ép giá."
          }
        ],
        watchStrategy: "Xem kỹ Phần 14 & 15 của Upwork MVP -> Viết nháp 1 mẫu Proposal theo công thức Sean Kang -> Bắt đầu gửi 3-5 proposal mỗi tối vào khung giờ vàng 20h - 23h.",
        solution: {
          steps: [
            "Đặt tiêu đề Profile Upwork: <em>Short-Form Video Editor | Alex Hormozi Style | TikTok & Reels Retention Specialist</em>.",
            "Viết Proposal theo công thức 3 phần của Sean Kang: Dòng 1 chỉ ra vấn đề tụt view của khách; Dòng 2 đính kèm link 1 video phù hợp nhất trong Portfolio; Dòng 3 đề xuất làm bài test 15s.",
            "Gửi đều đặn 3 - 5 Proposals mỗi ngày vào khung giờ 20h - 23h (giờ sáng làm việc của khách hàng US/UK)."
          ],
          tip: "Tuyệt đối không copy-paste văn mẫu dài dòng. Viết ngắn dưới 5 dòng và gọi tên khách hàng nếu biết."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2: Thực Hành & Kiếm Tiền",
            title: "Phần 17 (Nhắn Tin/Giao Tiếp Chuyên Nghiệp Với Khách Hàng) & Phần 18 ('Đọc Khách Như Một Cuốn Sách')",
            duration: "35 phút",
            focus: "Cách rep tin nhắn trong 5 phút, đàm phán hợp đồng Fixed-Price đầu tiên $30-$50, giao bài sớm trước deadline 6-12 tiếng để nhận review 5 sao tuyệt đối."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 & Level 3",
            title: "Tổng kết part 3 - Cách tính giá video (08:00)",
            duration: "8 phút",
            focus: "Biết cách tính giá theo phút/video để không bị hớ và tạo sự tự tin khi nói chuyện với khách ngoại quốc."
          }
        ],
        watchStrategy: "Xem Phần 17 & 18 trên Upwork MVP để chuẩn bị sẵn kịch bản trả lời tin nhắn khi có thông báo -> Khi khách ping, áp dụng ngay kịch bản để chốt đơn.",
        solution: {
          steps: [
            "Khi khách nhắn tin: Phản hồi ngay trong vòng 5 phút (cài app Upwork trên điện thoại).",
            "Đề xuất làm 1 video đầu tiên dạng Fixed-Price $30 - $50.",
            "Giao bài sớm hơn deadline 6-12 tiếng để tạo bất ngờ.",
            "Sửa bài nhanh gọn trong 1 lần duy nhất, sau đó xin đánh giá 5 sao kèm lời khen uy tín."
          ],
          tip: "Hợp đồng đầu tiên là bước ngoặt lớn nhất. Có 1 review 5 sao thì các job tiếp theo sẽ đến rất tự nhiên."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Freelance MVP",
            chapter: "Chương 5: Khách Hàng / Giao Tiếp",
            title: "Phần 1 (Các loại công việc), Phần 2 (Job Ngon & Không Ngon), Phần 5 (Cách làm việc với khách), Phần 6 (Giao tiếp hiệu quả)",
            duration: "40 phút",
            focus: "Chiến lược upsell từ 2 video lẻ thành hợp đồng Retainer 16 video/tháng ($600/tháng), thống nhất lịch nộp RAW thứ 2 - trả bài thứ 5."
          },
          {
            isPrimary: false,
            course: "Khóa Elite Pro",
            chapter: "Phần 4: Họp & Làm Việc Thực Tế",
            title: "Ghi lại Meeting hàng tuần (Cách Sean Kang làm việc và giữ chân khách hàng ruột nhiều năm)",
            duration: "30 phút",
            focus: "Tác phong chuyên nghiệp, cách nhận feedback và biến khách hàng thành đối tác lâu năm."
          }
        ],
        watchStrategy: "Sau khi giao bài Reel 2 hoặc 3 được khách khen -> Xem Phần 6 Chương 5 Freelance MVP -> Gửi tin nhắn đề xuất gói Retainer theo mẫu.",
        solution: {
          steps: [
            "Sau khi làm tốt 2-3 video lẻ, nhắn tin đề xuất: <em>'Để kênh của bạn nhất quán và tối ưu chi phí, tôi đề xuất gói 16 video/tháng với giá $600/tháng'</em>.",
            "Thống nhất quy trình giao nhận: Khách nộp RAW thứ 2, bạn trả bài thứ 5.",
            "Yêu cầu tạo Milestone thanh toán trước 50% hoặc thanh toán vào đầu tháng."
          ],
          tip: "Chỉ cần 2 khách hàng Retainer $600/tháng là bạn đã có dòng tiền đều đặn ~30 triệu VNĐ/tháng."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Chiến Lược Cá Nhân & Kỷ Luật",
            chapter: "La Bàn Sinh Tồn 2026 - 2027",
            title: "Khung giờ vàng Deep Work: 13:30 - 15:30 mỗi ngày (Tập trung 100% làm đồ án tốt nghiệp)",
            duration: "2 giờ / ngày",
            focus: "Ứng dụng AI tổng hợp tài liệu học thuật và viết báo cáo, bám sát giảng viên hướng dẫn để chỉnh sửa sớm."
          },
          {
            isPrimary: false,
            course: "Hệ thống Quản Trị Habits",
            chapter: "Habits 2-Mode System",
            title: "Duy trì kỷ luật nhị phân: Hoàn thành mục tiêu đồ án mỗi ngày trước khi mở máy edit video",
            duration: "Hàng ngày",
            focus: "Giải phóng hoàn toàn nghĩa vụ học vấn để ăn Tết trọn vẹn và tự do làm việc 100% cho tương lai."
          }
        ],
        watchStrategy: "Cài đặt báo thức 13:30 mỗi ngày -> Tắt thông báo MXH -> Làm liên tục 2 tiếng đồ án -> Tích xanh trên hệ thống Habits.",
        solution: {
          steps: [
            "Thiết lập khung giờ vàng: 13:30 - 15:30 mỗi ngày chỉ dành riêng cho đồ án, tắt điện thoại.",
            "Ứng dụng AI để lập dàn ý, tổng hợp tài liệu học thuật và viết báo cáo nhanh gấp 3 lần.",
            "Bám sát giảng viên hướng dẫn để chỉnh sửa sớm, bảo vệ đồ án tự tin điểm cao."
          ],
          tip: "Hoàn tất tốt nghiệp đúng hạn giúp bạn giải phóng 100% tâm trí để bước ra biển lớn và ăn Tết trọn vẹn niềm vui."
        },
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
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2 & Chương 3",
            title: "Chương 2 Phần 10: Cách Rút Tiền Thu Nhập Từ Upwork Về Ngân Hàng Việt Nam & Chương 3: Cách để trở thành một freelancer bền vững",
            duration: "20 phút",
            focus: "Cài đặt tài khoản ngân hàng nhận tiền USD về VNĐ tỷ giá tốt nhất, rút tiền trước ngày 25 Tết."
          },
          {
            isPrimary: false,
            course: "Lộ Trình Đường Dài",
            chapter: "Career Longevity Track",
            title: "Level 2 & Level 3: Mở rộng sang Long Form YouTube & Vibe Coding Tech Creator trong năm 2027",
            duration: "Đường dài",
            focus: "Tự thưởng cho bản thân và gia đình, ăn mừng thành quả cùng Diễm, sẵn sàng bứt phá năm 2027."
          }
        ],
        watchStrategy: "Xem Phần 10 Upwork MVP để chuẩn bị tài khoản rút tiền -> Xem lại toàn bộ thành quả 4 Sprints -> Tận hưởng một cái Tết Đinh Mùi rực rỡ và đàng hoàng!",
        solution: {
          steps: [
            "Rút tiền từ Upwork về tài khoản ngân hàng trước ngày 25 Tết.",
            "Tự thưởng cho bản thân và sắm Tết chu đáo cho gia đình bằng tiền kiếm được từ nghề dựng phim.",
            "Review lại hành trình 4 Sprints cùng Diễm và chuẩn bị kế hoạch phát triển dài hạn cho năm 2027."
          ],
          tip: "Bạn đã vượt qua bài test sinh tồn khắc nghiệt nhất. Bạn đã có nghề, có khách, có tương lai hoàn toàn chủ động!"
        },
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
