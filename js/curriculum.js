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
        output: "Chuẩn bị sẵn 4 RAW thực chiến (Matthiew, Sean, Lâm Trần, Josh) trong ~/workspace/studio",
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
        watchStrategy: "Đọc trước cẩm nang <code>chuong-1.2/TIMELINE_CHI_TIET.md</code> -> Mở video P3 & P4 trên IINA xem ở tốc độ 1.25x -> Kiểm tra sẵn 4 RAW thực chiến trong kho tài nguyên.",
        solution: {
          steps: [
            "Vào thư mục: <code>resources/Tài nguyên khoá học/RAW (Footages thô thực hành)/RAW Talking Head Video (từ gói Elite trở lên)/RAW thực tế của khách hàng (dạng dọc)/</code>.",
            "Chuẩn bị sẵn 4 file RAW thực chiến: <code>(Marketing) Matthiew Adams</code>, <code>Sean Kang/RAW Sean 2</code>, <code>(Real Estate) Lâm Trần/Video #9</code>, và <code>(Fitness) Josh William</code>.",
            "Mở DaVinci Resolve -> View -> Show Power Bins -> Kéo toàn bộ folder Sound Effects vào <strong>Master -> Power Bins</strong> để dự án nào cũng tự động có sẵn âm thanh."
          ],
          tip: "Power Bins lưu vĩnh viễn trên máy Mac của bạn. Hãy gom sẵn SFX thành các nhóm: Whoosh, Pop, Click, Riser, Impact để lấy ngay chỉ trong 1 giây."
        },
        mapping: {
          troubleshoot: "Kẹt giải nén/tổ chức? Xem: <strong>Baby Resolve C2-B01 (Database) & C3-B06 (Lưu Power Bins)</strong>",
          levelUp: "Muốn kho xịn hơn? Lấy trong: <strong>~/workspace/studio/resources/ (SFX, Font, Emojis)</strong>",
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
        title: "Tư duy cốt lõi trước khi thực hành (Chương 0 & C1.2 P1)",
        duration: "35 phút",
        effortHours: 1.0,
        output: "Thuộc lòng: Edit đẹp < View & Doanh thu; 3-5 giây đầu là sinh tử",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất (30/09/2026)",
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
        watchStrategy: "Mở IINA nghe P1 với tốc độ 1.25x -> Ghi nhớ 3 sự thật: Khách không mua kỹ xảo, khách mua Retention và sự tin cậy.",
        solution: {
          steps: [
            "Nghe kỹ Phần 1 Chương 1.2: Khách hàng chi trả cho cảm giác yên tâm và nhịp cắt dồn dập, không mua kỹ xảo quá đà.",
            "Nắm vững 3 chỉ số vàng: Hook Retention (3s đầu > 65%), Average View Duration (> 70%), CTA chuyển đổi.",
            "Tập trung toàn bộ năng lượng vào 4 sản phẩm Portfolio thực chiến để đi săn job."
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
        title: "Chương 1.2 - Phần 3 & 4: Timeline 9:16 & Cắt thô A-Roll (AI Augmented)",
        duration: "26 phút",
        effortHours: 2.0,
        output: "Timeline 1080x1920 sạch bóng câu vấp & khoảng lặng bằng Q-W-E + Script AI",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất (30/09/2026)",
            title: "P3 - Thông số Timeline & FPS (12:03) & P4 - Cắt RAW và lưu ý khi cắt RAW (14:17)",
            duration: "26 phút",
            focus: "Thiết lập Timeline 1080x1920 30fps. Quy tắc vàng: Khẩu hình đi trước âm thanh 2-3 frames, không chém cụt âm đuôi (s, t, k, d), thao tác Q-W-E dứt khoát kết hợp auto_roughcut.py."
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
        watchStrategy: "Xem video P3 & P4 trên IINA ở tốc độ 1.25x -> Nắm chắc quy tắc 'Đủ âm đuôi & đủ khẩu hình miệng mở' -> Chạy tool auto_roughcut.py để sinh FCPXML nạp vào Resolve rồi dùng phím T/Q/W tinh chỉnh trong 3 phút.",
        solution: {
          steps: [
            "<strong>B1 (Tự động hóa 80% bằng Tool):</strong> Chạy lệnh <code>python3 studio/scripts/auto_roughcut.py [path_raw] --mode fast</code> -> Nhận ngay file <code>.fcpxml</code> sạch 100% khoảng lặng chỉ trong 3 giây.",
            "<strong>B2 (Nạp FCPXML vào Resolve):</strong> Vào File -> Import -> Timeline -> Chọn file <code>.fcpxml</code> vừa sinh -> Toàn bộ các nhát cắt ripple-cut tự động nằm ngay ngắn trên timeline 1080x1920 30fps.",
            "<strong>B3 (Tinh chỉnh cơ bắp 20% còn lại):</strong> Nhấn phím <kbd class='solution-kbd'>T</kbd> (Trim Edit Mode) hoặc dùng cụm <kbd class='solution-kbd'>Q - W - E</kbd> lướt qua các mối nối -> Kiểm tra quy tắc Sean Kang: Chừa đệm mở môi (+70ms) và đệm nhả âm (+100ms) để câu nói tròn vành rõ chữ.",
            "<strong>B4 (Kiểm duyệt dứt khoát):</strong> Loại bỏ các câu nói vấp lặp lại. Rút gọn file thô từ 2-3 phút xuống còn đúng <strong>45–60 giây</strong> cô đọng."
          ],
          tip: "Kỷ luật thép: Không dùng chuột bấm vào icon dao lam. Tay trái khóa cứng trên cụm Q-W-E để đạt tốc độ cắt thô dưới 10 phút/video!"
        },
        mapping: {
          troubleshoot: "Kẹt nhịp cắt / lệch khẩu hình? Mở Main Zettel: <strong>nghe-thuat-rough-cut-a-roll-va-tu-duy-hai-vong-cat.md</strong>",
          levelUp: "Sử dụng script: <strong>studio/scripts/auto_roughcut.py</strong> với cờ --noise-db và --head-margin",
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
        title: "Chương 1.2 - Phần 6 & 7: Phụ đề & Style chữ 1 Dòng Đổ Bóng",
        duration: "1h 33p",
        effortHours: 3.0,
        output: "Subtitles 1 dòng không hộp, ngắt nhịp 3-5 từ, đổ bóng atmospheric depth",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P6 - Chạy sub & chỉnh sub (32:26) & P7 - Chỉnh sửa sub (61:22)",
            duration: "1h 33p",
            focus: "Kỹ thuật ngắt cụm sub 3-5 từ theo nhịp thở (0.8s-1.4s), đổi sang Text+ 1 dòng không viền hộp đen, text-shadow đổ bóng sâu, highlight từ khóa Vàng hổ phách #F59E0B."
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
            "Chạy script auto_roughcut.py tự sinh file <code>.srt</code> đã sửa chính tả tiếng Việt hoặc vào menu <code>Timeline -> Create Subtitles from Audio</code>.",
            "Chọn track Subtitle -> Inspector -> Tích chọn <strong>Use Track Style</strong>.",
            "Style chuẩn điện ảnh 2026: Font <strong>Inter</strong> hoặc <strong>Montserrat Black</strong>, Size: 65–75, Màu chữ: Trắng kem <code>#FAF7F2</code>, Highlight từ khóa: Vàng hổ phách <code>#F59E0B</code>.",
            "Bỏ hoàn toàn background container box. Thêm Drop Shadow đa tầng (Opacity 85%, Blur 10, Distance 4) để chữ nổi bật trên mọi nền sáng tối.",
            "Vị trí Y: Kéo thanh trượt Y về mức <strong>-0.75 đến -0.80</strong> (rơi đúng Super Safe Zone, không bị che bởi caption TikTok/Reels)."
          ],
          tip: "Tuyệt đối không dùng khung hộp đen 2-3 dòng nặng nề. Dùng caption 1 dòng dứt khoát 3-5 từ/nhịp thở!"
        },
        mapping: {
          troubleshoot: "Kẹt tạo style sub / ngắt nhịp? Mở Main Zettel: <strong>quy-chuan-phu-de-va-kinetic-typography-alex-hormozi.md</strong>",
          levelUp: "Dùng Preset có sẵn: <strong>resources/Presets_Templates/Snap Captions Template/</strong>",
          monetize: "70% người dùng lướt video tắt tiếng. Phụ đề bắt mắt giữ chân 80% người xem."
        }
      },
      {
        id: "s1_t4",
        title: "Chương 1.2 - Phần 8.1: 🎯 XUẤT XƯỞNG REEL 1 (Matthiew Adams)",
        duration: "25 phút",
        effortHours: 3.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL 1 (PORTFOLIO_01_Matthiew_Marketing.mp4)",
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
        watchStrategy: "Mở project <code>Reel_01_Learning_4-Reels</code> -> Xem video P8.1 -> Vừa xem vừa dựng hoàn thiện Reel 1 và xuất file ngay vào máy.",
        solution: {
          steps: [
            "Kiểm tra lại toàn bộ: A-Roll liền mạch không vấp, lọc ồn -6dB sạch sẽ, phụ đề khớp 100% với lời nói.",
            "Áp dụng chuẩn Level 1 Sean Kang: Sub gọn gàng clean, cắt thô không cụt không thừa âm đuôi, Hook 3s mở đầu chiếm 50% thành bại.",
            "Chuyển sang trang <strong>Deliver</strong> (icon tên lửa): Format <code>MP4</code>, Codec <code>H.264</code>, Resolution <code>1080 x 1920</code>.",
            "Mục Quality: Chọn <em>Restrict to</em> <strong>15,000 Kb/s</strong> (file sắc nét mà dung lượng nhẹ chỉ ~20-30MB).",
            "Bấm <code>Add to Render Queue</code> -> <code>Render All</code> -> Lưu file vào <code>Reel_01_Learning_4-Reels/05_EXPORTS/PORTFOLIO_01_Matthiew_Marketing.mp4</code>.",
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
        title: "Chương 1.2 - Phần 8.2: 🎯 XUẤT XƯỞNG REEL 2 (Sean Kang Upwork 99%)",
        duration: "31 phút",
        effortHours: 3.5,
        output: "XUẤT XƯỞNG FILE MP4 REEL 2 (PORTFOLIO_02_SeanKang_UpworkMaster.mp4)",
        isOutput: true,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.2 - Hoàn thiện Reel 2 Level 1 (30:56)",
            duration: "31 phút",
            focus: "Thực hành video Sean Kang Upwork: Thay thế toàn bộ graphic che đầu bằng 5 cảnh B-Roll Full Cutaway 1080x1920 (Stress, Gõ phím, Tăng trưởng, Làm việc, Đếm tiền)."
          },
          {
            isPrimary: false,
            course: "Khóa Baby Resolve",
            chapter: "Chương 6: Edit Page",
            title: "Bài 07 - Bản chất các loại Text, Subtitles (10:00)",
            duration: "10 phút",
            focus: "Phân biệt Subtitle Track vs Text+ Title trên Video Track, quản lý layer V1 (A-Roll) và V2 (B-Roll)."
          }
        ],
        watchStrategy: "Mở project <code>Sean_Kang_Reel02_Upwork_HyperFrames</code> đối chiếu timeline DaVinci Resolve -> Hoàn thiện màu sắc và nhạc nền Lofi Affogato -> Xuất file Master.",
        solution: {
          steps: [
            "Track V1: A-Roll Sean Kang 28.20s gọt sạch bằng tool auto-cut.",
            "Track V2: 5 B-roll Full Cutaway chuyển cảnh dứt khoát tại các mốc: 2.8s (Stress), 5.5s (18M tài khoản), 11.2s (+6M tăng trưởng), 17.5s (10% hoạt động), 20.2s (5% kiếm > $1).",
            "Track A1/A2/A3: Giọng nói -6dB, Nhạc nền Lofi Affogato -16dB, 8 điểm Whoosh + tiếng Coin keng 20.2s + Click 26.2s.",
            "Render xuất file Master: <code>PORTFOLIO_02_SeanKang_UpworkMaster.mp4</code>."
          ],
          tip: "B-roll Full Cutaway giúp loại bỏ hoàn toàn cảm giác ngột ngạt khi nhìn mãi một khuôn mặt nói chuyện, tăng retention lên gấp đôi."
        },
        mapping: {
          troubleshoot: "Kẹt layer B-roll che sub? Xem Main Zettel: <strong>b-roll-full-cutaway-va-ky-thuat-depth-sandwich.md</strong>",
          levelUp: "Tham khảo dự án mẫu: <strong>Projects/Code_Video_Lab/Sean_Kang_Reel02_Upwork_HyperFrames/</strong>",
          monetize: "Video phong cách Sabba OpenEdit / Cố vấn chuyên gia được định giá $50-$80/Reel trên Upwork."
        }
      },
      {
        id: "s1_t6",
        title: "Chương 1.2 - Phần 8.3 & Real Estate: 🎯 XUẤT XƯỞNG REEL 3 (Lâm Trần #9)",
        duration: "44 phút",
        effortHours: 3.5,
        output: "XUẤT XƯỞNG FILE MP4 REEL 3 (PORTFOLIO_03_LamTran_RealEstate.mp4)",
        isOutput: true,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.3 - Hoàn thiện Reel 3 Level 1 (44:26)",
            duration: "44 phút",
            focus: "Thực hành dựng video khách hàng Bất Động Sản Lâm Trần (Video #9 Cash Flow vs Appreciation): Gọt 40 khoảng lặng, cắt nhịp dồn dập, đồng bộ phụ đề chính xác số liệu tiền tệ."
          },
          {
            isPrimary: false,
            course: "Khóa Baby Resolve",
            chapter: "Chương 6: Edit Page",
            title: "Bài 09 - Dynamic Zoom (Tính năng quan trọng)",
            duration: "4 phút",
            focus: "Tạo chuyển động đẩy máy nhẹ (Slow Push-in) trên A-roll giúp cảnh quay tĩnh có chiều sâu điện ảnh."
          }
        ],
        watchStrategy: "Mở project <code>LamTran_Video9_RoughCut</code> -> Sử dụng file FCPXML và SRT đã kiểm duyệt -> Thêm Dynamic Zoom nhẹ và render xuất file.",
        solution: {
          steps: [
            "Mở timeline từ file <code>LamTran_Video9_RoughCut.fcpxml</code> (đã gọt sạch 40 khoảng lặng, rút từ 106s xuống 90s).",
            "Bật Dynamic Zoom (Ease In) với độ phóng đại nhẹ 1.05x để hình ảnh Lâm Trần chuyển động mượt mà hướng về người xem.",
            "Track Subtitle: Áp dụng Track Style font Inter 70px, màu kem ấm, highlight các số liệu: 1.000 đô, 12.000 đô, 600.000 đô, 40.000 đô.",
            "Render xuất file hoàn chỉnh: <code>PORTFOLIO_03_LamTran_RealEstate.mp4</code>."
          ],
          tip: "Ngách Bất Động Sản (Real Estate) tại Mỹ và Úc trả giá cao nhất trên Upwork ($50 - $100/Reel). Đây là 'vũ khí sát thủ' trong Portfolio của bạn!"
        },
        mapping: {
          troubleshoot: "Kẹt Dynamic Zoom? Xem: <strong>Baby Resolve C6-B09 (Dynamic Zoom)</strong>",
          levelUp: "Tham khảo file dự án: <strong>Projects/DaVinci_Reels/LamTran_Video9_RoughCut/</strong>",
          monetize: "Khách hàng Bất Động Sản luôn ký hợp đồng dài hạn (Retainer 8-12 video/tháng)."
        }
      },
      {
        id: "s1_t7",
        title: "Chương 1.2 - Phần 8.4: 🎯 XUẤT XƯỞNG REEL 4 (Josh William Gym)",
        duration: "1h 21p",
        effortHours: 4.0,
        output: "XUẤT XƯỞNG FILE MP4 REEL 4 (PORTFOLIO_04_JoshWilliam_Fitness.mp4)",
        isOutput: true,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 1.2: Cập Nhật Mới Nhất",
            title: "P8.4 - Hoàn thiện Reel 4 Level 1.5 nâng cao (1h 21p)",
            duration: "1h 21p",
            focus: "Dựng video Gym Josh William: Xử lý file RAW đã cắt sẵn, tạo nhịp cắt chuyển động cơ bắp, chèn B-roll tập gym, đẩy năng lượng âm thanh lên mức cực đại."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2",
            title: "Bài 01 - 03: David Goggins Cắt thô & Hook Intro",
            duration: "37 phút",
            focus: "Học cách tạo nhịp điệu dồn dập cho các video thể hình và phát triển bản thân."
          }
        ],
        watchStrategy: "Mở project <code>Reel_03_Learning_4-Reels</code> hoặc <code>Code_Video_Lab/Josh_William_Fitness</code> -> Dựng theo P8.4 -> Xuất file hoàn thiện.",
        solution: {
          steps: [
            "Kiểm soát A-roll: Cắt lại các điểm neo để subtitle không bị thòi thụt (bài học P4).",
            "Chèn B-roll tập tạ, uống whey xen kẽ nhịp nhàng theo câu nói của Josh.",
            "Sound Design: Sử dụng âm thanh va đập mạnh (Heavy Hits & Impacts) ở 3 giây đầu.",
            "Render xuất file hoàn chỉnh: <code>PORTFOLIO_04_JoshWilliam_Fitness.mp4</code>."
          ],
          tip: "Reel thể hình cần năng lượng cao và nhịp thở dồn dập. Đảm bảo âm thanh nhạc nền và SFX hỗ trợ tối đa cho giọng nói."
        },
        mapping: {
          troubleshoot: "Kẹt nhịp cắt nhanh? Xem: <strong>Elite C1.2 P8.4 (Mức độ 1.5 nâng cao)</strong>",
          levelUp: "Nâng cấp lên Level 2: Áp dụng hiệu ứng cắt đôi chữ Refuse của David Goggins",
          monetize: "Niche Fitness/Gym luôn có nhu cầu dựng video hàng ngày cực kỳ lớn trên mạng xã hội."
        }
      }
    ]
  },
  {
    id: "s2",
    title: "SPRINT 2: CHỮ KÝ TRIỆU VIEW & ĐỘT PHÁ LEVEL 2 (GOGGINS, DANIEL ILES & HOOK AI)",
    desc: "Nâng cấp từ thợ cắt sub lên Editor giá cao: Làm chủ Hook 3s, Icon Animation và B-roll Staging 2026",
    pill: "Đột Phá Kỹ Xảo",
    color: "#f59e0b",
    targetWeek: 3,
    tasks: [
      {
        id: "s2_t1",
        title: "Case Study David Goggins: Hook 3s Sát Thủ & Cắt Đôi Chữ (Level 2)",
        duration: "41 phút",
        effortHours: 3.5,
        output: "Hook 3 giây mở màn giật nhịp kịch tính kết hợp hiệu ứng chữ nổ tung",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 Mức Độ Trung Cấp",
            title: "Bài 03 (Làm Hook Intro - 28p), Bài 06 (Hiệu ứng cắt đôi chữ Refuse - 7p), Bài 08 (SFX & Nhạc nền - 6p)",
            duration: "41 phút",
            focus: "Công thức giữ chân người xem 3s đầu: Polygon Mask cắt đôi chữ 'Refuse' trượt sang hai bên, Speed Ramp giật tốc độ, âm thanh Impact nổ tung."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.2: Level 2 Cập Nhật Mới (14/04/2026)",
            title: "Bước 3.1 (Tạo câu Hook bằng AI - 10p) & Bước 3.2 (Animation Hook Main Point - 50p)",
            duration: "1h 00p",
            focus: "Quy trình mới nhất của Sean Kang: Dùng AI gợi ý ý tưởng Hook kịch tính và tạo animation cho luận điểm chính."
          }
        ],
        watchStrategy: "Xem kỹ Bài 03 và Bài 06 của Chương 2.1 trên IINA -> Mở DaVinci thực hành ngay hiệu ứng Split Text trong Fusion -> Áp dụng thử vào 3s đầu của Reel Josh William.",
        solution: {
          steps: [
            "Mở Fusion Page trên đoạn Hook 3 giây đầu: Dùng Text+ kết hợp node <code>Polygon</code> để tạo mask chia đôi chữ.",
            "Keyframe chuyển động: Nửa trên chữ trượt lên trên góc trái, nửa dưới trượt xuống dưới góc phải kèm Motion Blur (độ mờ chuyển động).",
            "Trang Edit: Đặt âm thanh <code>Heavy_Whoosh.wav</code> đúng frame chữ bắt đầu tách đôi, kết thúc bằng tiếng <code>Impact_Thud.wav</code> khi câu thoại chốt vang lên.",
            "Tạo hiệu ứng giật khung hình nhẹ (Camera Shake / Flash White 2 frames) tạo cảm giác bùng nổ năng lượng."
          ],
          tip: "3 giây đầu quyết định 80% thành bại của video. Nếu người xem không dừng lại ở 3 giây đầu, 57 giây phía sau coi như vứt đi!"
        },
        mapping: {
          troubleshoot: "Kẹt node Fusion? Xem: <strong>Fusion 101 - Bài 01 (Cơ bản về Merge và Mask)</strong>",
          levelUp: "Xem thêm bản cập nhật: <strong>Elite C2.2 Bước 3.2 (Tạo animation Hook - 50p)</strong>",
          monetize: "Khách hàng sẵn sàng trả thêm $30-$50 cho video có Hook mở màn sáng tạo và giữ chân người xem."
        }
      },
      {
        id: "s2_t2",
        title: "Case Study Daniel Iles: Motion Graphic Icon & Viền Chữ Bevel Nổi Khối",
        duration: "51 phút",
        effortHours: 4.0,
        output: "Popup biểu tượng chuyển động 3D DVE và chữ nổi khối kim loại sang trọng",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2 Mức Độ Trung Cấp",
            title: "Bài 14, 15, 16 (Animation Icon & Logo Amazon - 45p) & Bài 18 (Viền chữ Bevel đẹp - 15p)",
            duration: "1h 00p",
            focus: "Kỹ thuật biến các icon tĩnh thành chuyển động sống động (Scale nảy nhẹ, DVE xoay 3D), viền chữ Bevel nổi khối vàng kim loại phong cách tài chính."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.2: Level 2 Cập Nhật Mới (14/04/2026)",
            title: "Bước 4.1 (Ý tưởng Animation 3D) & Bước 4.4 (Animation Logo)",
            duration: "24 phút",
            focus: "Cách đặt các yếu tố đồ họa vào không gian 3D của Fusion để minh họa cho số liệu tài chính."
          }
        ],
        watchStrategy: "Xem Bài 15 & 18 của Chương 2.1 -> Thực hành tạo 1 preset Text+ Bevel màu vàng kim loại -> Lưu vào Power Bins dùng trọn đời.",
        solution: {
          steps: [
            "Vào Text+ -> Tab Shading: Bật Element 2 (Redline/Viền ngoài), chọn Shading Type: <em>Bevel Emboss</em>.",
            "Chỉnh Light Angle và Softness để chữ có độ dày nổi khối như đúc bằng vàng hoặc kim loại cao cấp.",
            "Tạo hiệu ứng Icon nảy: Kéo icon PNG từ kho <code>resources/Icons-Emojies</code> vào Timeline -> Bật Keyframe Size: Frame 0 (0%), Frame 6 (115%), Frame 10 (100%) tạo độ nảy đàn hồi (Overshoot bounce).",
            "Thêm tiếng <code>pop.wav</code> hoặc <code>click.wav</code> vào đúng frame icon bung ra."
          ],
          tip: "Đây là phong cách làm nên thương hiệu của Daniel Iles (kênh tài chính 3 triệu followers). Các kênh tài chính và crypto cực kỳ chuộng style này!"
        },
        mapping: {
          troubleshoot: "Kẹt thông số Bevel? Xem kỹ: <strong>Elite C2.1 Bài 18 (Làm hiệu ứng Bevel chữ Alcoholics)</strong>",
          levelUp: "Preset có sẵn: Sử dụng các template trong <strong>resources/Text Presets/</strong>",
          monetize: "Niche Tài chính/Đầu tư (Finance & Real Estate) trả mức giá cao nhất thị trường ($70-$120/video)."
        }
      },
      {
        id: "s2_t3",
        title: "Quy Trình Level 2 Mới (Chương 2.2): B-Roll Staging & Hoàn Thiện Timeline",
        duration: "1h 15p",
        effortHours: 3.5,
        output: "Dây chuyền sản xuất video Level 2 hoàn chỉnh không che mặt diễn giả",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.2: Level 2 Cập Nhật Mới Nhất (14/04/2026)",
            title: "Bước 4.2 (Khung tăng lượng), Bước 4.3 (Ý tưởng thêm B-roll - 16p), Bước 5 (Chọn nhạc nền & trau chuốt - 9p)",
            duration: "49 phút",
            focus: "Tư duy B-roll Staging hiện đại: Thay thế hoàn toàn sticker hoạt hình bằng Full Cutaway có gắn tag ngữ cảnh, cân bằng dải tần nhạc nền và hiệu ứng âm thanh."
          },
          {
            isPrimary: false,
            course: "Khóa DaVinci Elite",
            chapter: "Chương 2.1: Level 2",
            title: "Bài 21 - 24: Sean Kang Video P1 - P4 (Tư duy Flow chung & Thêm B-roll)",
            duration: "36 phút",
            focus: "Quan sát trực tiếp Sean Kang dựng từ đầu đến cuối 1 video thực tế theo phong cách Level 2."
          }
        ],
        watchStrategy: "Xem Bước 4.3 và Bước 5 của Chương 2.2 -> Đối chiếu với dự án Reel 02 Sean Kang chúng ta đã dựng thành công -> Đúc kết thành phản xạ.",
        solution: {
          steps: [
            "Quét transcript tìm các điểm rơi đắt giá: Số liệu thống kê, nỗi đau khách hàng, thành quả.",
            "Tại các điểm này: Chuyển cảnh Full màn hình sang video B-roll 1080x1920 (Track V2) đè lên diễn giả.",
            "Đặt Kicker Tag (ví dụ: <code>#THỐNG KÊ 2024</code>) ở góc trên để định hướng não bộ người xem.",
            "Track Audio: Áp dụng Auto-Ducking hạ nhạc nền -16dB khi có giọng nói, giữ tiếng Whoosh nổi bật ở -4dB."
          ],
          tip: "Một video đạt chuẩn Level 2 phải có sự kết hợp hài hòa giữa nhịp cắt A-roll nhanh, B-roll đắt giá và âm thanh sống động."
        },
        mapping: {
          troubleshoot: "Kẹt tìm B-roll? Quét kho: <strong>~/workspace/studio/resources/Broll/</strong>",
          levelUp: "Học tư duy flow: Xem <strong>Elite C2.1 Bài 22 (Tư duy Flow chung)</strong>",
          monetize: "Sở hữu kỹ năng Level 2 giúp bạn tự tin nhận các hợp đồng $500 - $1,500/tháng."
        }
      }
    ]
  },
  {
    id: "s3",
    title: "SPRINT 3: TỔNG TẤN CÔNG THỊ TRƯỜNG & SĂN JOB (UPWORK MVP & PROPOSAL 15S)",
    desc: "Đóng gói Portfolio 4 REEL, tối ưu Profile chuẩn SEO và gửi 20 Proposal sát thủ kèm Free 15s Sample",
    pill: "Săn Job Thực Chiến",
    color: "#ec4899",
    targetWeek: 4,
    tasks: [
      {
        id: "s3_t1",
        title: "Đóng gói 'Bộ Tứ Sát Thủ' Portfolio vào Google Drive & Web",
        duration: "1 buổi",
        effortHours: 3.0,
        output: "Link Portfolio chuyên nghiệp chứa 4 video đỉnh nhất (Real Estate, Business, Fitness, Finance)",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Freelance MVP",
            chapter: "Chương 4: Mindset & Thiết Lập Portfolio",
            title: "Bài đọc: Thiết lập Portfolio đẹp - FREE & Chương 3 Phần 6: Thiết lập Website Portfolio cho riêng bạn",
            duration: "20 phút",
            focus: "Cấu trúc 4 video đại diện cho 4 ngách màu mỡ nhất: Real Estate (Lâm Trần), B2B Business (Sean Reel 2), Fitness (Josh), Finance (Daniel Iles)."
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
        watchStrategy: "Đọc Chương 4 Freelance MVP -> Tạo ngay folder Google Drive public -> Đặt tên file chuẩn mực: [Niche] - [Title] by LangPN.mp4.",
        solution: {
          steps: [
            "Tạo 1 folder Google Drive công khai: <code>Lang Pham Ngoc - High-Retention Short-Form Video Portfolio</code>.",
            "Tải lên 4 video hoàn chỉnh đã xuất xưởng ở Sprint 1 & 2:",
            "  1. <code>01_Real_Estate_CashFlow_LamTran.mp4</code> (Bất Động Sản)",
            "  2. <code>02_B2B_Consulting_Upwork_SeanKang.mp4</code> (Kinh Doanh / Cố Vấn)",
            "  3. <code>03_High_Energy_Fitness_JoshWilliam.mp4</code> (Thể Hình / Động Lực)",
            "  4. <code>04_Finance_Crypto_DanielIles.mp4</code> (Tài Chính / Icon Motion)",
            "Mở quyền truy cập: <em>Bất kỳ ai có liên kết đều có thể xem (Anyone with the link can view)</em>."
          ],
          tip: "Khách hàng bận rộn chỉ dành 30 giây để lướt portfolio. Hãy đặt 2 video đẹp nhất (Lâm Trần & Sean Kang) lên ngay hàng đầu!"
        },
        mapping: {
          troubleshoot: "Tối ưu Profile: Xem <strong>Elite Pro Phần 5 (Review Profile/Tối ưu Portfolio thành viên)</strong>",
          levelUp: "Dùng trang web portfolio cá nhân nhúng link Google Drive",
          monetize: "Portfolio đẹp + xem nhanh trên điện thoại = 90% cơ hội được khách bấm rep tin nhắn."
        }
      },
      {
        id: "s3_t2",
        title: "Tối Ưu Profile Upwork Đạt Chuẩn 100% & Lấy Tick Xanh (Upwork MVP)",
        duration: "Chương 2",
        effortHours: 3.5,
        output: "Profile Upwork hoàn chỉnh 100%, có Tick Xanh xác thực và danh mục Portfolio nhúng",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2: Thực Hành Từ A-Z & Kiếm Tiền Trên Tài Khoản Mới",
            title: "Phần 4 (Thiết lập và tối ưu profile - 15p), Phần 5 (Cách để có Tick Xanh Upwork - 8p), Phần 6 (Thiết Lập Dự Án Project Catalog - 12p)",
            duration: "35 phút",
            focus: "Công thức đặt Title chuẩn SEO Upwork, viết Bio tập trung vào chỉ số giữ chân (Retention Rate), tải video trực tiếp lên mục Portfolio của Upwork."
          },
          {
            isPrimary: false,
            course: "Khóa Freelance MVP",
            chapter: "Chương 2: Upwork",
            title: "Phần 2 & 3: Cách SEO Profile Upwork & Thực hành tối ưu",
            duration: "25 phút",
            focus: "Cách cài đặt từ khóa Tag kỹ năng: DaVinci Resolve, Short-Form Video, TikTok Video Editing, Alex Hormozi Style."
          }
        ],
        watchStrategy: "Xem Phần 4 & 5 của Upwork MVP trên IINA -> Mở trình duyệt làm theo từng bước: Xác thực CCCD lấy Tick Xanh -> Điền Bio theo mẫu.",
        solution: {
          steps: [
            "<strong>Tiêu đề Profile (Title):</strong> <em>Short-Form Video Editor | High-Retention Reels & Shorts for Real Estate & B2B Creators (Alex Hormozi & Sabba Style)</em>.",
            "<strong>Mô tả Bio:</strong> Đi thẳng vào vấn đề: 'I help Coaches, Real Estate Agents, and B2B Creators turn raw talking-head footage into high-retention Reels/Shorts with seamless pacing, 1-line aesthetic captions, and cinematic B-roll.'",
            "<strong>Kỹ năng (Skills):</strong> Chọn đúng 10 tags: DaVinci Resolve, Video Editing, Short-Form Video, TikTok, Instagram Reels, YouTube Shorts, Color Grading, Audio Editing, Subtitles, Motion Graphics.",
            "<strong>Xác thực danh tính (ID Verification):</strong> Tải CCCD lên để lấy huy hiệu Tick Xanh (tăng 300% độ uy tín với khách hàng US/UK)."
          ],
          tip: "Tuyệt đối không viết Bio như một lá thư xin việc sinh viên. Hãy viết như một đối tác tăng trưởng giải quyết bài toán giữ chân người xem!"
        },
        mapping: {
          troubleshoot: "Kẹt xác thực Tick Xanh? Xem: <strong>Upwork MVP Chương 2 Bài 05</strong>",
          levelUp: "Tạo thêm Project Catalog: Xem <strong>Upwork MVP Chương 2 Bài 06</strong>",
          monetize: "Profile chuẩn SEO giúp thuật toán Upwork tự động đẩy bạn vào tầm ngắm của khách hàng."
        }
      },
      {
        id: "s3_t3",
        title: "Chiến Dịch Gửi Proposal 'Vũ Khí 15s Sample' (Upwork MVP Chương 2)",
        duration: "Chương 2",
        effortHours: 6.0,
        output: "Gửi 15 - 20 Proposal chất lượng cao, đạt tỷ lệ phản hồi > 30%",
        isOutput: false,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2: Thực Hành Từ A-Z & Kiếm Tiền",
            title: "Phần 13 (Cách Tìm Job Phù Hợp), Phần 14 (Cách Viết Proposal Đánh Trúng Tim Đen), Phần 15 (Thực Hành Tìm Job & Chốt Đơn)",
            duration: "55 phút",
            focus: "Công thức viết Proposal 3 phần dưới 5 dòng của Sean Kang: Nêu vấn đề tụt view -> Đính kèm 1 link video khớp nhất -> Đề xuất làm bài test ngắn 15s miễn phí."
          },
          {
            isPrimary: false,
            course: "Khóa Freelance MVP",
            chapter: "Chương 2: Upwork",
            title: "Phần 4 (Lọc danh sách công việc), Phần 5 (Đánh giá công việc ngon), Phần 8 (Lưu ý khi viết Proposal)",
            duration: "30 phút",
            focus: "Cách lọc Job: Payment Verified, Khách đã chi tiêu > $500, Hire Rate > 60%, tránh xa các job lừa đảo hoặc ép giá $5."
          }
        ],
        watchStrategy: "Xem kỹ Phần 14 & 15 của Upwork MVP -> Bắt đầu chiến dịch nộp 2-3 proposal mỗi tối vào khung giờ vàng 20h - 23h (giờ sáng nước Mỹ).",
        solution: {
          steps: [
            "<strong>Bộ lọc tìm việc:</strong> Keyword <code>Reels editor</code>, <code>Short form video</code>, <code>TikTok editor</code>, <code>Talking head</code>. Lọc: Payment Verified, Client Spent > $500, Rating 4.8+.",
            "<strong>Vũ khí tối thượng - Chiến thuật 'Free 15-Second Sample':</strong> Khi thấy job có file RAW đính kèm: Tải ngay 30s đầu về -> Chạy lệnh <code>python3 studio/scripts/auto_roughcut.py [raw]</code> -> Kéo vào DaVinci lắp 1 dòng sub xịn và 1 B-roll trong 5 phút -> Xuất file 15s gửi kèm Proposal!",
            "<strong>Mẫu Proposal 3 phần thần thánh:</strong>",
            "  - Dòng 1: 'Hi [Client Name], I noticed your raw footage has great energy but could hook viewers 2x faster with tighter pacing in the first 3 seconds.'",
            "  - Dòng 2: 'Here is a 15-second sample I cut directly from your raw file: [Link Loom / Google Drive]'",
            "  - Dòng 3: 'And here is my full portfolio with similar real estate/business videos: [Link Portfolio]. If you like this pacing, let's connect!'",
            "Gửi đều đặn 2–3 Proposals mỗi ngày, kiên trì liên tục trong 7 ngày."
          ],
          tip: "Khách hàng nhận được 50 proposals toàn chữ. Người duy nhất tải file của họ về và edit sẵn 15s xem thử CHẮC CHẮN sẽ là người được gọi phỏng vấn!"
        },
        mapping: {
          troubleshoot: "Cách lọc job ngon: Xem <strong>Freelance MVP Chương 2 Bài 04 & 05</strong>",
          levelUp: "Sử dụng script auto_roughcut.py để tạo sample 15s trong 5 phút!",
          monetize: "Tỷ lệ chốt đơn của chiến thuật 15s Sample lên tới 60–80% đối với tài khoản mới."
        }
      },
      {
        id: "s3_t4",
        title: "🎯 CHỐT HỢP ĐỒNG ĐẦU TIÊN & NHẬN THANH TOÁN (VICTORY MILESTONE)",
        duration: "Cột mốc",
        effortHours: 7.0,
        output: "KÝ HỢP ĐỒNG UPWORK ĐẦU TIÊN & NHẬN LƯƠNG TRƯỚC TẾT 2027",
        isOutput: true,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2: Thực Hành & Kiếm Tiền",
            title: "Phần 17 (Nhắn Tin/Giao Tiếp Chuyên Nghiệp Với Khách Hàng) & Phần 18 ('Đọc Khách Như Một Cuốn Sách')",
            duration: "35 phút",
            focus: "Cách rep tin nhắn trong 5 phút, đàm phán hợp đồng Fixed-Price đầu tiên $35-$50/video, giao bài sớm trước deadline 6-12 tiếng để nhận review 5 sao tuyệt đối."
          },
          {
            isPrimary: false,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2",
            title: "Phần 10: Cách Rút Tiền Thu Nhập Từ Upwork Về Ngân Hàng Việt Nam",
            duration: "10 phút",
            focus: "Thiết lập tài khoản ngân hàng nhận tiền USD qua chuyển khoản Wire/Payoneer/Direct to Local Bank an toàn."
          }
        ],
        watchStrategy: "Khi có thông báo tin nhắn từ Upwork: Mở ứng dụng Upwork trên điện thoại rep ngay -> Giữ phong thái chuyên nghiệp, điềm tĩnh, tập trung vào giải pháp.",
        solution: {
          steps: [
            "Khi khách nhắn tin: Phản hồi ngay trong vòng 5 phút (tốc độ rep quyết định 70% việc khách có thuê bạn hay chuyển sang người khác).",
            "Đàm phán hợp đồng đầu tiên: Đừng kỳ vọng giá $100 ngay lập tức. Hãy chốt mức giá hợp lý $35 – $50 cho video đầu tiên để lấy hợp đồng và **Review 5 sao**.",
            "Giao sản phẩm đầu tiên: Dựng chuẩn chỉ, sạch sẽ, xuất file 1080x1920 sắc nét, bàn giao sớm trước thời hạn 6 tiếng.",
            "Sau khi khách hài lòng và duyệt thanh toán: Lịch sự đề nghị khách để lại 1 đánh giá 5 sao chân thành trên trang cá nhân.",
            "Đề xuất hợp đồng tháng (Monthly Retainer): 'I can deliver 8-12 videos like this every month for $400 - $600. Would you be interested?'"
          ],
          tip: "Hợp đồng đầu tiên là chiếc chìa khóa vàng mở toang toàn bộ cánh cửa tự do tài chính. Hãy bảo vệ nó bằng sự tận tâm 100%!"
        },
        mapping: {
          troubleshoot: "Cách nhắn tin chuyên nghiệp: Xem <strong>Upwork MVP Chương 2 Bài 17 & 18</strong>",
          levelUp: "Cách rút tiền về ngân hàng: Xem <strong>Upwork MVP Chương 2 Bài 10</strong>",
          monetize: "🎉 CỘT MỐC SINH TỬ ĐÃ HOÀN THÀNH: BẠN CHÍNH THỨC TRỞ THÀNH FREELANCER QUỐC TẾ CÓ THU NHẬP USD!"
        }
      }
    ]
  },
  {
    id: "s4",
    title: "SPRINT 4: CHỐT MONTHLY RETAINER & TỐT NGHIỆP AN TOÀN (TẾT 2027)",
    desc: "Nâng cấp lên hợp đồng tháng $500 - $1,500/tháng, bảo lưu/hoàn thành việc học và ăn Tết trọn vẹn",
    pill: "Tự Do Tài Chính",
    color: "#6366f1",
    targetWeek: 5,
    tasks: [
      {
        id: "s4_t1",
        title: "Đàm phán Hợp đồng Retainer cố định ($500 - $1,000 / tháng)",
        duration: "Chiến lược",
        effortHours: 15.0,
        output: "Có ít nhất 1-2 khách hàng quen đặt lịch dựng video hàng tuần",
        isOutput: true,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Freelance MVP",
            chapter: "Chương 5: Khách Hàng / Giao Tiếp",
            title: "Phần 1 - 5: Cách giữ chân khách hàng dài hạn, upsell gói dịch vụ và biến khách lẻ thành hợp đồng tháng",
            duration: "30 phút",
            focus: "Chiến lược chuyển đổi từ làm việc theo từng video lẻ (Per-video) sang gói đối tác cố định (Monthly Retainer)."
          },
          {
            isPrimary: false,
            course: "Khóa Upwork MVP",
            chapter: "Chương 3: Tổng Kết",
            title: "Cách để trở thành một freelancer bền vững",
            duration: "15 phút",
            focus: "Tư duy xây dựng thương hiệu cá nhân bền vững, quản trị thời gian và mở rộng quy mô thu nhập."
          }
        ],
        watchStrategy: "Xem kỹ Chương 5 của Freelance MVP -> Áp dụng ngay khi khách hàng đầu tiên khen ngợi sản phẩm của bạn.",
        solution: {
          steps: [
            "Sau khi hoàn thành xuất sắc video đầu tiên, chủ động đề xuất gói tháng: 'I have 2 open slots for long-term clients this month. I can handle 8 videos for $400/mo or 12 videos for $550/mo with 24h turnaround.'",
            "Ký hợp đồng Milestone trên Upwork theo từng tuần hoặc từng tháng.",
            "Duy trì quy trình làm việc chuẩn mực: Nhận RAW thứ 2 -> Giao bài thứ 4 -> Không bao giờ trễ hẹn."
          ],
          tip: "Doanh thu ổn định đến từ Retainer. Chỉ cần 2 khách hàng $500/tháng, bạn đã có thu nhập 25–30 triệu VNĐ/tháng ngay tại nhà!"
        },
        mapping: {
          troubleshoot: "Kẹt đàm phán giá? Xem: <strong>Freelance MVP Chương 5</strong>",
          levelUp: "Mở rộng sang dịch vụ trọn gói (Script + B-roll + Edit)",
          monetize: "Tự do tài chính: Thu nhập cố định bằng USD trước Tết Nguyên Đán 2027!"
        }
      },
      {
        id: "s4_t2",
        title: "Giải phóng áp lực học vấn & Tận hưởng thành quả trước Tết",
        duration: "Cột mốc",
        effortHours: 25.0,
        output: "Hoàn tất thủ tục bảo lưu/thi cử IUH, tài khoản ting ting lương USD trước Tết Đinh Mùi",
        isOutput: true,
        recommendedLessons: [
          {
            isPrimary: true,
            course: "Khóa Upwork MVP",
            chapter: "Chương 2",
            title: "Phần 20: Hoàn Thành Thử Thách Kiếm Tiền Từ Tài Khoản Upwork Mới",
            duration: "12 phút",
            focus: "Tổng kết toàn bộ hành trình từ con số 0 đến khi nhận tiền thực tế trong tài khoản."
          }
        ],
        watchStrategy: "Tự thưởng cho bản thân một buổi nghỉ ngơi trọn vẹn cùng Diễm sau khi hoàn thành mục tiêu dòng tiền!",
        solution: {
          steps: [
            "Hoàn tất các bài thi/đồ án học kỳ tại trường IUH hoặc nộp đơn bảo lưu để dồn 100% thời gian cho công việc dựng phim thực chiến.",
            "Rút toàn bộ thu nhập USD từ Upwork về tài khoản ngân hàng Techcombank/MBBank trước ngày 25 Tết.",
            "Ăn Tết Đinh Mùi 2027 trong sự tự hào, tự chủ tài chính và bước vào năm mới với vị thế của một AI Video Specialist chuyên nghiệp!"
          ],
          tip: "Do you want a brilliant future, or a life of poverty and humiliation? Bạn đã chọn một tương lai rực rỡ và đã biến nó thành hiện thực!"
        },
        mapping: {
          troubleshoot: "Chúc mừng Thuyền trưởng Lang & Diễm đã về đích xuất sắc!",
          levelUp: "Tiến lên nấc thang tiếp theo: AI Captain & Automation Specialist 2027",
          monetize: "🏆 SỨ MỆNH HOÀN THÀNH: TỰ DO TÀI CHÍNH TRƯỚC TẾT NGUYÊN ĐÁN 2027!"
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
