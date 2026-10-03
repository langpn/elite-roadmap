// =========================================================================
// MAIN APP ORCHESTRATOR, PREDICTIVE UI, PRESENCE & FULL SYLLABUS ENGINE
// =========================================================================

import { ROADMAP_SPRINTS, TET_DATE, JOB_PAYOUT_DEADLINE, JOB_NEEDED_HOURS, ACCOUNTS } from './curriculum.js';
import { ALL_COURSES_DATA } from './all_courses.js';
import { duoState, presenceState, initRealtimeStream, setSyncUpdateCallback, saveLocalCache, broadcastChange } from './sync.js';
import {
  initAuth,
  currentUserKey,
  handleTaskClick,
  alertNotOwner,
  setAuthChangedCallback,
  openAuthModal,
  closeAuthModal,
  closeAuthModalOnBg,
  selectLoginAccount,
  handleLogin,
  handleLogout
} from './auth.js';

let pinnedSprintId = localStorage.getItem("elite_pinned_sprint") || null;
let currentSprintFilter = null; // null = use effective sprint (pinned or active)

// Mode state: 'sprints' (Chiến dịch Tết) hoặc 'courses' (Toàn bộ khóa học)
let activeMainMode = localStorage.getItem("elite_main_mode") || 'sprints';
let selectedCourseKey = localStorage.getItem("elite_selected_course") || 'elite';

// Global toast helper
export function showToast(msg) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.innerText = msg;
    toast.className = "show";
    setTimeout(() => { toast.className = ""; }, 3000);
  }
}
window.showToast = showToast;

// Expose modal and click handlers to window for inline HTML events
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.closeAuthModalOnBg = closeAuthModalOnBg;
window.selectLoginAccount = selectLoginAccount;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleTaskClick = handleTaskClick;
window.alertNotOwner = alertNotOwner;
window.filterSprint = filterSprint;
window.autoRebalanceQuota = autoRebalanceQuota;
window.toggleSprintBody = toggleSprintBody;
window.togglePinSprint = togglePinSprint;
window.switchMainMode = switchMainMode;
window.selectCourse = selectCourse;
window.handleSyllabusLessonToggle = handleSyllabusLessonToggle;
window.toggleChapterSyllabus = toggleChapterSyllabus;

// -------------------------------------------------------------------------
// MODE SWITCHER (SPRINT ROADMAP vs FULL COURSE SYLLABUS)
// -------------------------------------------------------------------------
export function switchMainMode(mode) {
  activeMainMode = mode;
  localStorage.setItem("elite_main_mode", mode);

  const btnSprints = document.getElementById("btnModeSprints");
  const btnCourses = document.getElementById("btnModeCourses");
  const sprintSec = document.getElementById("sprintModeSection");
  const courseSec = document.getElementById("courseModeSection");

  if (mode === 'sprints') {
    if (btnSprints) btnSprints.className = "view-mode-btn active";
    if (btnCourses) btnCourses.className = "view-mode-btn";
    if (sprintSec) sprintSec.style.display = "block";
    if (courseSec) courseSec.style.display = "none";
  } else {
    if (btnSprints) btnSprints.className = "view-mode-btn";
    if (btnCourses) btnCourses.className = "view-mode-btn active";
    if (sprintSec) sprintSec.style.display = "none";
    if (courseSec) courseSec.style.display = "flex";
  }

  renderUI();
}

export function selectCourse(courseKey) {
  selectedCourseKey = courseKey;
  localStorage.setItem("elite_selected_course", courseKey);
  renderCourseSyllabusUI();
}

export function toggleChapterSyllabus(headerEl) {
  const body = headerEl.nextElementSibling;
  if (body) {
    body.style.display = body.style.display === "none" ? "flex" : "none";
  }
}

// -------------------------------------------------------------------------
// SYLLABUS LESSON CLICK HANDLER WITH DUO RULES
// -------------------------------------------------------------------------
export function handleSyllabusLessonToggle(lessonId, lessonTitle) {
  if (!currentUserKey) {
    openAuthModal();
    showToast("Vui lòng nhập mật khẩu tài khoản để đánh dấu hoàn thành bài học!");
    return;
  }

  if (!duoState[currentUserKey]) duoState[currentUserKey] = {};
  duoState[currentUserKey][lessonId] = !duoState[currentUserKey][lessonId];
  const isDone = duoState[currentUserKey][lessonId];

  broadcastChange(currentUserKey, lessonId, isDone, lessonTitle);
  renderUI();

  showToast(`${ACCOUNTS[currentUserKey].avatar} ${ACCOUNTS[currentUserKey].name}: ${isDone ? 'Đã hoàn thành bài học!' : 'Đã bỏ hoàn thành'}`);
}

// -------------------------------------------------------------------------
// RELATIVE TIME HELPER & PRESENCE DISPLAY
// -------------------------------------------------------------------------
function formatRelativeTime(diffMs) {
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return "vừa xong";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}p trước`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h trước`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d trước`;
}

function renderPresenceIndicators() {
  const now = Date.now();
  const presenceLangEl = document.getElementById("presenceLang");
  const presenceDiemEl = document.getElementById("presenceDiem");

  if (presenceLangEl) {
    const isLangOnline = presenceState.lang.online && (now - presenceState.lang.lastSeen < 45000);
    if (isLangOnline) {
      presenceLangEl.className = "presence-pill online";
      presenceLangEl.innerHTML = `<span class="presence-dot"></span>Đang học`;
    } else {
      presenceLangEl.className = "presence-pill offline";
      const relTime = presenceState.lang.lastSeen ? `Off ${formatRelativeTime(now - presenceState.lang.lastSeen)}` : "Đang off";
      presenceLangEl.innerHTML = `<span class="presence-dot"></span>${relTime}`;
    }
  }

  if (presenceDiemEl) {
    const isDiemOnline = presenceState.diem.online && (now - presenceState.diem.lastSeen < 45000);
    if (isDiemOnline) {
      presenceDiemEl.className = "presence-pill online";
      presenceDiemEl.innerHTML = `<span class="presence-dot"></span>Đang học`;
    } else {
      presenceDiemEl.className = "presence-pill offline";
      const relTime = presenceState.diem.lastSeen ? `Off ${formatRelativeTime(now - presenceState.diem.lastSeen)}` : "Đang off";
      presenceDiemEl.innerHTML = `<span class="presence-dot"></span>${relTime}`;
    }
  }
}

// -------------------------------------------------------------------------
// DYNAMIC ACTIVE SPRINT & PIN ENGINE
// -------------------------------------------------------------------------
export function getActiveSprintId() {
  const user = currentUserKey || 'lang';
  for (const sprint of ROADMAP_SPRINTS) {
    const isSprintFinished = sprint.tasks.every(t => duoState[user] && duoState[user][t.id]);
    if (!isSprintFinished) {
      return sprint.id;
    }
  }
  return 's1';
}

export function getEffectiveSprintFilter() {
  if (pinnedSprintId) return pinnedSprintId;
  return getActiveSprintId();
}

export function togglePinSprint(sprintId, e) {
  if (e) e.stopPropagation();

  if (pinnedSprintId === sprintId) {
    pinnedSprintId = null;
    localStorage.removeItem("elite_pinned_sprint");
    currentSprintFilter = getActiveSprintId();
    showToast("Đã bỏ ghim! Hệ thống sẽ tự động mở Sprint bạn đang làm.");
  } else {
    pinnedSprintId = sprintId;
    localStorage.setItem("elite_pinned_sprint", pinnedSprintId);
    currentSprintFilter = sprintId;
    const sprintObj = ROADMAP_SPRINTS.find(s => s.id === sprintId);
    showToast(`📌 Đã ghim: ${sprintObj ? sprintObj.pill : sprintId} làm trọng tâm hàng đầu!`);
  }

  renderUI();
}

// -------------------------------------------------------------------------
// STATS, COUNTDOWN & ADAPTIVE FORECASTING
// -------------------------------------------------------------------------
function getRemainingDays(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function calculateStats(userKey) {
  let totalTasks = 0;
  let completedTasks = 0;
  let completedVideos = 0;
  let completedHours = 0;

  ROADMAP_SPRINTS.forEach(sprint => {
    sprint.tasks.forEach(t => {
      totalTasks++;
      if (duoState[userKey] && duoState[userKey][t.id]) {
        completedTasks++;
        completedHours += t.effortHours;
        if (t.isOutput) completedVideos++;
      }
    });
  });

  const pct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  return { pct, completedTasks, totalTasks, completedVideos, completedHours };
}

export function calculateCourseStats(courseKey, userKey) {
  const course = ALL_COURSES_DATA.find(c => c.id === courseKey);
  if (!course) return { total: 0, done: 0, pct: 0 };

  let total = 0;
  let done = 0;

  course.chapters.forEach(chap => {
    chap.lessons.forEach(l => {
      total++;
      if (duoState[userKey] && duoState[userKey][l.id]) {
        done++;
      }
    });
  });

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, pct };
}

export function autoRebalanceQuota() {
  const daysToJob = Math.max(1, getRemainingDays(JOB_PAYOUT_DEADLINE));
  const weeksToJob = Math.max(1, daysToJob / 7);

  const langStat = calculateStats('lang');
  const diemStat = calculateStats('diem');

  const langRemain = Math.max(0, JOB_NEEDED_HOURS - langStat.completedHours);
  const diemRemain = Math.max(0, JOB_NEEDED_HOURS - diemStat.completedHours);

  duoState.customQuota = {
    lang: (langRemain / weeksToJob).toFixed(1),
    diem: (diemRemain / weeksToJob).toFixed(1)
  };

  saveLocalCache();
  renderUI();
  showToast("Đã tự động tái cân bằng chỉ tiêu theo thời gian thực!");
}

function updatePredictiveEngine() {
  const daysToTet = getRemainingDays(TET_DATE);
  const daysToJob = getRemainingDays(JOB_PAYOUT_DEADLINE);
  const weeksToJob = Math.max(1, (daysToJob / 7));

  const countdownEl = document.getElementById("daysLeftBadge");
  if (countdownEl) {
    countdownEl.innerText = `⏳ Còn ${daysToTet} ngày đến Tết • ${daysToJob} ngày đến mốc Nhận Lương`;
  }

  const langStat = calculateStats('lang');
  const diemStat = calculateStats('diem');

  const needLangHours = Math.max(0, JOB_NEEDED_HOURS - langStat.completedHours);
  const needDiemHours = Math.max(0, JOB_NEEDED_HOURS - diemStat.completedHours);

  const targetLang = duoState.customQuota?.lang || (needLangHours / weeksToJob).toFixed(1);
  const targetDiem = duoState.customQuota?.diem || (needDiemHours / weeksToJob).toFixed(1);

  const quotaLangEl = document.getElementById("weeklyQuotaLang");
  const quotaDiemEl = document.getElementById("weeklyQuotaDiem");
  if (quotaLangEl) quotaLangEl.innerText = `${targetLang}h / tuần`;
  if (quotaDiemEl) quotaDiemEl.innerText = `${targetDiem}h / tuần`;

  // Forecast Lang
  const forecastLangEl = document.getElementById("forecastLang");
  if (forecastLangEl) {
    if (langStat.completedHours >= JOB_NEEDED_HOURS) {
      forecastLangEl.innerHTML = `<span style="color: #10b981; font-weight: 700;">🟢 ĐÃ ĐẠT CHỈ TIÊU CÓ JOB!</span> Tiến độ xuất sắc, sẵn sàng nhận lương!`;
    } else {
      const pace = (targetLang / 6).toFixed(1);
      forecastLangEl.innerHTML = `Đã tích lũy: <strong>${langStat.completedHours.toFixed(1)}h / ${JOB_NEEDED_HOURS}h</strong>. Cần duy trì <strong>~${pace}h/ngày</strong> (nghỉ 1 ngày/tuần) để chốt job trước <strong>25/12/2026</strong>.`;
    }
  }

  // Forecast Diễm
  const forecastDiemEl = document.getElementById("forecastDiem");
  if (forecastDiemEl) {
    if (diemStat.completedHours >= JOB_NEEDED_HOURS) {
      forecastDiemEl.innerHTML = `<span style="color: #10b981; font-weight: 700;">🟢 ĐÃ ĐẠT CHỈ TIÊU CÓ JOB!</span> Tiến độ xuất sắc, sẵn sàng nhận lương!`;
    } else {
      const pace = (targetDiem / 6).toFixed(1);
      forecastDiemEl.innerHTML = `Đã tích lũy: <strong>${diemStat.completedHours.toFixed(1)}h / ${JOB_NEEDED_HOURS}h</strong>. Cần duy trì <strong>~${pace}h/ngày</strong> để kịp nhận lương trước Tết!`;
    }
  }
}

// -------------------------------------------------------------------------
// SPRINT FILTERING & UI RENDERING
// -------------------------------------------------------------------------
export function filterSprint(sprintId) {
  currentSprintFilter = sprintId;
  renderUI();
}

export function toggleSprintBody(headerEl) {
  const body = headerEl.nextElementSibling;
  if (body) {
    body.style.display = body.style.display === "none" ? "flex" : "none";
  }
}

function renderSprintNavTabs(effectiveFilter, activeSprintId) {
  const navContainer = document.querySelector(".sprint-nav");
  if (!navContainer) return;

  const tabs = [
    { id: "all", label: "Tất cả Sprint" },
    { id: "s0", label: "Sprint 0: Vũ Khí (3.0h)" },
    { id: "s1", label: "Sprint 1: 4 REEL (22.5h)" },
    { id: "s2", label: "Sprint 2: Triệu View (19.0h)" },
    { id: "s3", label: "Sprint 3: Săn Job (19.5h)" },
    { id: "s4", label: "Sprint 4: Nhận Lương (40.0h)" }
  ];

  navContainer.innerHTML = tabs.map(tab => {
    const isSelected = effectiveFilter === tab.id;
    const isPinned = pinnedSprintId === tab.id;
    const isActiveCurrent = !pinnedSprintId && activeSprintId === tab.id;

    let badgeIcon = "";
    if (isPinned) badgeIcon = "📌 ";
    else if (isActiveCurrent) badgeIcon = "🔥 ";

    let extraClass = "";
    if (isSelected) extraClass += " active";
    if (isPinned || isActiveCurrent) extraClass += " focus-tab";

    return `
      <button class="sprint-tab ${extraClass}" onclick="filterSprint('${tab.id}')">
        ${badgeIcon}${tab.label}
      </button>
    `;
  }).join("");
}

// -------------------------------------------------------------------------
// FULL COURSE SYLLABUS CHECKLIST UI RENDERING
// -------------------------------------------------------------------------
export function renderCourseSyllabusUI() {
  const selectorBar = document.getElementById("courseSelectorBar");
  const overviewCard = document.getElementById("courseOverviewCard");
  const syllabusContainer = document.getElementById("syllabusContainer");

  if (!selectorBar || !overviewCard || !syllabusContainer) return;

  // 1. Render Course Selection Tabs with Realtime Progress
  selectorBar.innerHTML = ALL_COURSES_DATA.map(course => {
    const isSelected = course.id === selectedCourseKey;
    const langCourseStat = calculateCourseStats(course.id, 'lang');
    const diemCourseStat = calculateCourseStats(course.id, 'diem');

    return `
      <button class="course-btn ${isSelected ? 'active' : ''}" onclick="selectCourse('${course.id}')">
        <span>${course.icon}</span>
        <span>${course.name}</span>
        <span style="font-size: 10px; font-family: 'JetBrains Mono', monospace; opacity: 0.8;">
          (L:${langCourseStat.pct}% | D:${diemCourseStat.pct}%)
        </span>
      </button>
    `;
  }).join("");

  // 2. Render Selected Course Overview & Stats
  const activeCourse = ALL_COURSES_DATA.find(c => c.id === selectedCourseKey) || ALL_COURSES_DATA[0];
  const langCourseStat = calculateCourseStats(activeCourse.id, 'lang');
  const diemCourseStat = calculateCourseStats(activeCourse.id, 'diem');

  overviewCard.innerHTML = `
    <div class="course-overview-header">
      <div class="course-title-main">
        <span>${activeCourse.icon}</span>
        <span>${activeCourse.name}</span>
      </div>
      <div class="course-stats-duo">
        <span style="color: #38bdf8;">⚡ Lang: ${langCourseStat.done}/${langCourseStat.total} bài (${langCourseStat.pct}%)</span>
        <span style="color: #f472b6;">🌸 Diễm: ${diemCourseStat.done}/${diemCourseStat.total} bài (${diemCourseStat.pct}%)</span>
      </div>
    </div>
    <div style="font-size: 12px; color: var(--text-dim);">
      Tất cả các bài học được trích xuất trực tiếp từ video của Sean Kang • Bấm để đánh dấu hoàn thành từng bài học
    </div>
  `;

  // 3. Render Chapters and Lessons
  syllabusContainer.innerHTML = activeCourse.chapters.map((chap, cIdx) => {
    const chapLessons = chap.lessons;
    const langChapDone = chapLessons.filter(l => duoState.lang && duoState.lang[l.id]).length;
    const diemChapDone = chapLessons.filter(l => duoState.diem && duoState.diem[l.id]).length;

    return `
      <div class="syllabus-chapter-card">
        <div class="syllabus-chapter-header" onclick="toggleChapterSyllabus(this)">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: ${activeCourse.color}; font-weight: 800;">Chương ${cIdx + 1}:</span>
            <span>${chap.title}</span>
          </div>
          <div style="font-size: 11.5px; font-family: 'JetBrains Mono', monospace; color: var(--text-dim);">
            L: ${langChapDone}/${chapLessons.length} • D: ${diemChapDone}/${chapLessons.length} ▼
          </div>
        </div>
        <div class="syllabus-body">
          ${chapLessons.map(lesson => {
            const langDone = !!(duoState.lang && duoState.lang[lesson.id]);
            const diemDone = !!(duoState.diem && duoState.diem[lesson.id]);

            let myDone = false;
            if (currentUserKey === 'lang') myDone = langDone;
            else if (currentUserKey === 'diem') myDone = diemDone;

            return `
              <div class="syllabus-lesson-row ${myDone ? 'is-done' : ''}">
                <div class="syllabus-left" onclick="handleSyllabusLessonToggle('${lesson.id}', '${lesson.title.replace(/'/g, "\\'")}')" title="${currentUserKey ? `Đánh dấu hoàn thành cho ${ACCOUNTS[currentUserKey].name}` : 'Bấm để đăng nhập'}">
                  <div class="checkbox">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div class="syllabus-title">${lesson.title}</div>
                  <span class="syllabus-duration">⏱️ ${lesson.duration}</span>
                </div>

                <!-- Duo Status Badges -->
                <div class="duo-status-badges">
                  <span class="user-pill ${langDone ? 'lang-done' : 'lang-pending'}"
                        onclick="${currentUserKey === 'lang' ? `handleSyllabusLessonToggle('${lesson.id}', '${lesson.title.replace(/'/g, "\\'")}')` : `alertNotOwner('lang')`}"
                        style="cursor: ${currentUserKey === 'lang' ? 'pointer' : 'default'}; font-size: 10px;"
                        title="Lang: ${langDone ? 'Đã hoàn thành' : 'Chưa học'}">
                    ⚡ Lang ${langDone ? '✓' : '...'}
                  </span>
                  <span class="user-pill ${diemDone ? 'diem-done' : 'diem-pending'}"
                        onclick="${currentUserKey === 'diem' ? `handleSyllabusLessonToggle('${lesson.id}', '${lesson.title.replace(/'/g, "\\'")}')` : `alertNotOwner('diem')`}"
                        style="cursor: ${currentUserKey === 'diem' ? 'pointer' : 'default'}; font-size: 10px;"
                        title="Diễm: ${diemDone ? 'Đã hoàn thành' : 'Chưa học'}">
                    🌸 Diễm ${diemDone ? '✓' : '...'}
                  </span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }).join("");
}

// -------------------------------------------------------------------------
// RENDER MASTER UI
// -------------------------------------------------------------------------
export function renderUI() {
  const activeSprintId = getActiveSprintId();
  const effectiveFilter = currentSprintFilter || getEffectiveSprintFilter();

  const langStat = calculateStats('lang');
  const diemStat = calculateStats('diem');

  const barLang = document.getElementById("barLang");
  const badgeLang = document.getElementById("badgeLang");
  if (barLang) barLang.style.width = langStat.pct + "%";
  if (badgeLang) badgeLang.innerText = `${langStat.pct}% • ${langStat.completedVideos} Video • ${langStat.completedHours.toFixed(1)}h`;

  const barDiem = document.getElementById("barDiem");
  const badgeDiem = document.getElementById("badgeDiem");
  if (barDiem) barDiem.style.width = diemStat.pct + "%";
  if (badgeDiem) badgeDiem.innerText = `${diemStat.pct}% • ${diemStat.completedVideos} Video • ${diemStat.completedHours.toFixed(1)}h`;

  updatePredictiveEngine();
  renderPresenceIndicators();

  if (activeMainMode === 'courses') {
    renderCourseSyllabusUI();
    return;
  }

  renderSprintNavTabs(effectiveFilter, activeSprintId);

  const container = document.getElementById("sprintContainer");
  if (!container) return;
  container.innerHTML = "";

  ROADMAP_SPRINTS.forEach(sprint => {
    if (effectiveFilter !== 'all' && sprint.id !== effectiveFilter) return;

    const isPinned = pinnedSprintId === sprint.id;
    const isActiveRunning = !pinnedSprintId && activeSprintId === sprint.id;

    const card = document.createElement("div");
    card.className = `sprint-card ${isPinned ? 'is-pinned' : ''}`;

    const sprintTotalHours = sprint.tasks.reduce((s, t) => s + t.effortHours, 0);

    card.innerHTML = `
      <div class="sprint-header" onclick="toggleSprintBody(this)">
        <div class="sprint-title-wrap">
          <span class="sprint-pill" style="background: ${sprint.color}15; color: ${sprint.color}; border: 1px solid ${sprint.color}35;">
            ${sprint.pill}
          </span>
          <div>
            <div class="sprint-title" style="display: flex; align-items: center; gap: 8px;">
              <span>${sprint.title}</span>
              ${isPinned ? `<span style="font-size: 11px; color: #f59e0b; background: rgba(245, 158, 11, 0.15); padding: 1px 7px; border-radius: 4px; font-weight: 800;">📌 ĐANG GHIM</span>` : ''}
              ${isActiveRunning ? `<span style="font-size: 11px; color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 1px 7px; border-radius: 4px; font-weight: 800;">🔥 ĐANG LÀM</span>` : ''}
            </div>
            <div class="sprint-desc">${sprint.desc} • Tổng effort: <strong>${sprintTotalHours.toFixed(1)} giờ</strong></div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <!-- Pin Sprint Button -->
          <button class="pin-btn ${isPinned ? 'is-pinned' : ''}" onclick="togglePinSprint('${sprint.id}', event)" title="${isPinned ? 'Bỏ ghim Sprint' : 'Ghim Sprint này làm trọng tâm hàng đầu'}">
            📌 ${isPinned ? 'Đang Ghim' : 'Ghim'}
          </button>
          <div style="font-size: 18px; color: var(--text-dim);">▼</div>
        </div>
      </div>

      <div class="sprint-body">
        ${sprint.tasks.map(task => {
          const langDone = !!(duoState.lang && duoState.lang[task.id]);
          const diemDone = !!(duoState.diem && duoState.diem[task.id]);

          let myDone = false;
          if (currentUserKey === 'lang') myDone = langDone;
          else if (currentUserKey === 'diem') myDone = diemDone;

          return `
            <div class="task-item ${myDone ? 'my-done' : ''} ${task.isOutput ? 'is-deliverable' : ''}" id="task-${task.id}">
              <div class="task-main">
                <div class="task-left" onclick="handleTaskClick('${task.id}', '${task.title}')" title="${currentUserKey ? `Bấm để đánh dấu tiến độ của ${ACCOUNTS[currentUserKey].name}` : 'Bấm để đăng nhập'}">
                  <div class="checkbox">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div class="task-details">
                    <div class="task-header-row">
                      <span class="task-title">${task.title}</span>
                      <span class="effort-badge">⚡ ${task.effortHours}h effort</span>
                      <span class="duration-tag">⏱️ ${task.duration}</span>
                      ${task.isOutput ? `<span class="output-pill">🎯 SẢN PHẨM CẦM TAY</span>` : ''}
                    </div>
                    <div class="output-text">🚀 Đích đến: ${task.output}</div>
                  </div>
                </div>

                <!-- Duo Live Status Badges -->
                <div class="duo-status-badges">
                  <span class="user-pill ${langDone ? 'lang-done' : 'lang-pending'}" 
                        onclick="${currentUserKey === 'lang' ? `handleTaskClick('${task.id}', '${task.title}')` : `alertNotOwner('lang')`}"
                        style="cursor: ${currentUserKey === 'lang' ? 'pointer' : 'default'};"
                        title="Lang: ${langDone ? 'Đã hoàn thành' : 'Chưa xong'}">
                    ⚡ Lang ${langDone ? '✓' : '...'}
                  </span>
                  <span class="user-pill ${diemDone ? 'diem-done' : 'diem-pending'}" 
                        onclick="${currentUserKey === 'diem' ? `handleTaskClick('${task.id}', '${task.title}')` : `alertNotOwner('diem')`}"
                        style="cursor: ${currentUserKey === 'diem' ? 'pointer' : 'default'};"
                        title="Diễm: ${diemDone ? 'Đã hoàn thành' : 'Chưa xong'}">
                    🌸 Diễm ${diemDone ? '✓' : '...'}
                  </span>
                </div>
              </div>

              <!-- Smart Mapping Triad -->
              <div class="mapping-grid">
                <div class="map-box troubleshoot">
                  <span>💡 <strong>Khúc mắc kỹ thuật:</strong> ${task.mapping.troubleshoot}</span>
                </div>
                <div class="map-box level-up">
                  <span>🚀 <strong>Gợi ý tiến xa hơn:</strong> ${task.mapping.levelUp}</span>
                </div>
                <div class="map-box monetize">
                  <span>💰 <strong>Tư duy kiếm tiền:</strong> ${task.mapping.monetize}</span>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    container.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  setSyncUpdateCallback(() => renderUI());
  setAuthChangedCallback(() => renderUI());
  initAuth();
  initRealtimeStream();

  // Restore active view mode
  switchMainMode(activeMainMode);
  renderUI();

  // Keep presence status refreshed smoothly every 5 seconds
  setInterval(() => {
    renderPresenceIndicators();
  }, 5000);
});
