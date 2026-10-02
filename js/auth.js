// =========================================================================
// AUTHENTICATION & STRICT OWNERSHIP MANAGEMENT
// =========================================================================

import { ACCOUNTS } from './curriculum.js';
import {
  auth,
  duoState,
  broadcastChange,
  startPresenceLoop,
  stopPresenceLoop,
  sendPresenceHeartbeat
} from './sync.js';

export let currentUserKey = null; // 'lang', 'diem', or null
export let selectedLoginAccountKey = "lang";
let onAuthChangedCallback = null;

export function setAuthChangedCallback(cb) {
  onAuthChangedCallback = cb;
}

export function initAuth() {
  if (auth) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const email = (user.email || "").toLowerCase();
        currentUserKey = email.includes("diembd") ? "diem" : "lang";
        localStorage.setItem("elite_current_user", currentUserKey);

        updateIdentityUI(true);
        const authedDisplay = document.getElementById("authed-user-display");
        if (authedDisplay) {
          authedDisplay.innerText = `${ACCOUNTS[currentUserKey].avatar} ${ACCOUNTS[currentUserKey].name} (${user.email})`;
        }

        // Start Live Presence Heartbeat
        startPresenceLoop(currentUserKey);
      } else {
        if (currentUserKey) {
          sendPresenceHeartbeat(currentUserKey, 'offline');
        }
        stopPresenceLoop();

        currentUserKey = null;
        localStorage.removeItem("elite_current_user");
        updateIdentityUI(false);
        const authedDisplay = document.getElementById("authed-user-display");
        if (authedDisplay) authedDisplay.innerText = "Chưa đăng nhập";
      }

      if (onAuthChangedCallback) onAuthChangedCallback(currentUserKey);
    });
  }
}

export function updateIdentityUI(isLoggedIn) {
  const badge = document.getElementById("userIdentityBadge");
  const avatar = document.getElementById("userAvatar");
  const nameDisplay = document.getElementById("userNameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  if (isLoggedIn && currentUserKey && ACCOUNTS[currentUserKey]) {
    const u = ACCOUNTS[currentUserKey];
    if (badge) badge.className = `identity-badge user-${currentUserKey}`;
    if (avatar) avatar.innerText = u.avatar;
    if (nameDisplay) nameDisplay.innerText = `${u.name} (Đang học)`;
    if (logoutBtn) logoutBtn.style.display = "inline-flex";
  } else {
    if (badge) badge.className = "identity-badge user-guest";
    if (avatar) avatar.innerText = "🔒";
    if (nameDisplay) nameDisplay.innerText = "Đăng nhập để học";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

export function selectLoginAccount(key) {
  selectedLoginAccountKey = key;
  const btnLang = document.getElementById("btnPickLang");
  const btnDiem = document.getElementById("btnPickDiem");
  if (btnLang) btnLang.className = "account-btn " + (key === 'lang' ? 'selected-lang' : '');
  if (btnDiem) btnDiem.className = "account-btn " + (key === 'diem' ? 'selected-diem' : '');
}

export function handleLogin() {
  const passInput = document.getElementById("auth-pass");
  const pass = passInput ? passInput.value : "";
  const errBox = document.getElementById("auth-error");
  const targetEmail = ACCOUNTS[selectedLoginAccountKey].email;

  if (!pass) {
    if (errBox) {
      errBox.textContent = "Vui lòng nhập mật khẩu tài khoản.";
      errBox.style.display = "block";
    }
    return;
  }

  if (errBox) errBox.style.display = "none";
  if (window.showToast) window.showToast("Đang xác thực tài khoản...");

  if (auth) {
    auth.signInWithEmailAndPassword(targetEmail, pass)
      .then(() => {
        closeAuthModal();
        if (window.showToast) {
          window.showToast(`Chào mừng ${ACCOUNTS[selectedLoginAccountKey].avatar} ${ACCOUNTS[selectedLoginAccountKey].name}! Quyền chỉnh sửa đã được mở khóa.`);
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        let msg = "Mật khẩu không chính xác.";
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          msg = "Mật khẩu không đúng. Vui lòng kiểm tra lại.";
        } else if (err.code === 'auth/user-not-found') {
          msg = "Tài khoản chưa được kích hoạt trên Firebase.";
        } else if (err.message) {
          msg = err.message;
        }
        if (errBox) {
          errBox.textContent = msg;
          errBox.style.display = "block";
        }
      });
  }
}

export function handleLogout() {
  if (auth) {
    if (currentUserKey) {
      sendPresenceHeartbeat(currentUserKey, 'offline');
    }
    stopPresenceLoop();

    auth.signOut().then(() => {
      closeAuthModal();
      if (window.showToast) {
        window.showToast("Đã đăng xuất. Checklist đã chuyển về chế độ bảo vệ!");
      }
    });
  }
}

export function openAuthModal() {
  const modal = document.getElementById("auth-modal");
  const isAuthed = !!(auth && auth.currentUser);
  const unauthedView = document.getElementById("modal-unauthed");
  const authedView = document.getElementById("modal-authed");

  if (unauthedView) unauthedView.style.display = isAuthed ? "none" : "block";
  if (authedView) authedView.style.display = isAuthed ? "block" : "none";
  if (modal) modal.className = "modal-backdrop open";

  if (!isAuthed) {
    selectLoginAccount(currentUserKey || 'lang');
    setTimeout(() => {
      const passField = document.getElementById("auth-pass");
      if (passField) passField.focus();
    }, 150);
  }
}

export function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  const passField = document.getElementById("auth-pass");
  const errBox = document.getElementById("auth-error");

  if (modal) modal.className = "modal-backdrop";
  if (passField) passField.value = "";
  if (errBox) errBox.style.display = "none";
}

export function closeAuthModalOnBg(e) {
  if (e.target.id === "auth-modal") closeAuthModal();
}

// STRICT PERMISSION: Chỉ người đăng nhập đúng tài khoản mới được tick
export function handleTaskClick(taskId, taskTitle) {
  if (!currentUserKey) {
    openAuthModal();
    if (window.showToast) {
      window.showToast("Vui lòng nhập mật khẩu tài khoản để mở khóa quyền đánh dấu tiến độ!");
    }
    return;
  }

  if (!duoState[currentUserKey]) duoState[currentUserKey] = {};
  duoState[currentUserKey][taskId] = !duoState[currentUserKey][taskId];
  const isDone = duoState[currentUserKey][taskId];

  broadcastChange(currentUserKey, taskId, isDone, taskTitle);
  if (onAuthChangedCallback) onAuthChangedCallback(currentUserKey);

  if (window.showToast) {
    window.showToast(`${ACCOUNTS[currentUserKey].avatar} ${ACCOUNTS[currentUserKey].name}: ${isDone ? 'Đã hoàn thành!' : 'Đã bỏ tick'}`);
  }
}

export function alertNotOwner(ownerKey) {
  if (!currentUserKey) {
    openAuthModal();
    return;
  }
  if (window.showToast) {
    window.showToast(`Bạn đang đăng nhập với tư cách ${ACCOUNTS[currentUserKey].name}. Chỉ có ${ACCOUNTS[ownerKey].name} mới có quyền sửa tiến độ của ${ACCOUNTS[ownerKey].name}!`);
  }
}
