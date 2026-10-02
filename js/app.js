// =========================================================================
// MAIN APP ORCHESTRATOR & PREDICTIVE UI ENGINE
// =========================================================================

import { ROADMAP_SPRINTS, TET_DATE, JOB_PAYOUT_DEADLINE, JOB_NEEDED_HOURS, ACCOUNTS } from './curriculum.js';
import { duoState, initRealtimeStream, setSyncUpdateCallback, saveLocalCache } from './sync.js';
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

let currentSprintFilter = 's1';

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
  document.querySelectorAll(".sprint-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("onclick").includes(sprintId));
  });
  renderUI();
}

export function toggleSprintBody(headerEl) {
  const body = headerEl.nextElementSibling;
  if (body) {
    body.style.display = body.style.display === "none" ? "flex" : "none";
  }
}

export function renderUI() {
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

  const container = document.getElementById("sprintContainer");
  if (!container) return;
  container.innerHTML = "";

  ROADMAP_SPRINTS.forEach(sprint => {
    if (currentSprintFilter !== 'all' && sprint.id !== currentSprintFilter) return;

    const card = document.createElement("div");
    card.className = "sprint-card";

    const sprintTotalHours = sprint.tasks.reduce((s, t) => s + t.effortHours, 0);

    card.innerHTML = `
      <div class="sprint-header" onclick="toggleSprintBody(this)">
        <div class="sprint-title-wrap">
          <span class="sprint-pill" style="background: ${sprint.color}15; color: ${sprint.color}; border: 1px solid ${sprint.color}35;">
            ${sprint.pill}
          </span>
          <div>
            <div class="sprint-title">${sprint.title}</div>
            <div class="sprint-desc">${sprint.desc} • Tổng effort: <strong>${sprintTotalHours.toFixed(1)} giờ</strong></div>
          </div>
        </div>
        <div style="font-size: 18px; color: var(--text-dim);">▼</div>
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
  renderUI();
});
