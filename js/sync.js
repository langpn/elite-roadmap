// =========================================================================
// REALTIME DUAL-SYNC & LIVE PRESENCE ENGINE (SSE STREAM + FIREBASE RTDB)
// =========================================================================

import { ACCOUNTS } from './curriculum.js';

export const LOCAL_STORAGE_KEY = "elite_duo_progress_v9";

export let duoState = {
  lang: {},
  diem: {},
  customQuota: { lang: null, diem: null }
};

// Presence state for both users
export let presenceState = {
  lang: { online: false, lastSeen: 0 },
  diem: { online: false, lastSeen: 0 }
};

// Activity tracker for user idle detection (15 mins timeout)
let lastUserActivity = Date.now();
let isCurrentlyIdle = false;
const IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 phút không tương tác -> Coi như off/idle

function registerActivityListeners() {
  const onActivity = () => {
    lastUserActivity = Date.now();
    if (isCurrentlyIdle) {
      isCurrentlyIdle = false;
      const user = localStorage.getItem("elite_current_user");
      if (user) {
        sendPresenceHeartbeat(user, 'online');
      }
    }
  };

  ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'].forEach(evt => {
    window.addEventListener(evt, onActivity, { passive: true });
  });
}

if (typeof window !== "undefined") {
  registerActivityListeners();
}

// Load Local Cache
try {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    duoState = JSON.parse(cached);
    if (!duoState.lang) duoState.lang = {};
    if (!duoState.diem) duoState.diem = {};
    if (!duoState.customQuota) duoState.customQuota = { lang: null, diem: null };
  }
} catch (e) {
  console.warn("Storage parse error:", e);
}

export function saveLocalCache() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(duoState));
}

// -------------------------------------------------------------------------
// REALTIME STREAM VIA SSE (NTFY) + PRESENCE DETECTION
// -------------------------------------------------------------------------
const REALTIME_TOPIC = "elite_duo_sync_lang_diem_2027";
const SSE_URL = `https://ntfy.sh/${REALTIME_TOPIC}/sse`;
const PUBLISH_URL = `https://ntfy.sh/${REALTIME_TOPIC}`;
let eventSource = null;
let onSyncUpdateCallback = null;
let presenceTimer = null;

export function setSyncUpdateCallback(cb) {
  onSyncUpdateCallback = cb;
}

export function initRealtimeStream() {
  try {
    setSyncStatus('syncing', 'Đang kết nối...');

    // 1. Fetch latest cached broadcast messages
    fetch(`${PUBLISH_URL}/json?poll=1`)
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split("\n");
        lines.forEach(line => {
          if (line) {
            try {
              const event = JSON.parse(line);
              if (event.message) {
                const payload = JSON.parse(event.message);
                applyCloudPayload(payload, false);
              }
            } catch (err) {}
          }
        });
        if (onSyncUpdateCallback) onSyncUpdateCallback();
      })
      .catch(() => {});

    // 2. Open Persistent SSE Connection
    if (eventSource) eventSource.close();
    eventSource = new EventSource(SSE_URL);

    eventSource.onopen = () => {
      setSyncStatus('synced', 'Live & Cloud Synced');
    };

    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.event === "message" && data.message) {
          const payload = JSON.parse(data.message);
          applyCloudPayload(payload, true);
        }
      } catch (err) {}
    };

    eventSource.onerror = () => {
      setSyncStatus('warning', 'Live Reconnecting...');
    };
  } catch (e) {
    setSyncStatus('warning', 'Local Only');
  }

  // Setup presence event listeners
  window.addEventListener('beforeunload', () => {
    const user = localStorage.getItem("elite_current_user");
    if (user) {
      const payload = JSON.stringify({
        sender: user,
        type: "presence",
        status: "offline",
        timestamp: Date.now()
      });
      navigator.sendBeacon(PUBLISH_URL, payload);
    }
  });

  document.addEventListener('visibilitychange', () => {
    const user = localStorage.getItem("elite_current_user");
    if (user) {
      if (document.visibilityState === 'visible') {
        sendPresenceHeartbeat(user, 'online');
      }
    }
  });
}

function applyCloudPayload(payload, showToastNotification) {
  if (!payload || !payload.sender) return;

  const sender = payload.sender;

  // Handle Presence Heartbeat Event (Only update presence pill, DO NOT re-render entire DOM!)
  if (payload.type === "presence") {
    presenceState[sender] = {
      online: payload.status === "online",
      lastSeen: payload.timestamp || Date.now()
    };
    if (window.renderPresenceIndicators) {
      window.renderPresenceIndicators();
    }
    return;
  }

  // Handle Task State Event
  let hasChange = false;

  if (payload.fullState && payload.fullState[sender]) {
    duoState[sender] = payload.fullState[sender];
    hasChange = true;
  } else if (payload.taskId !== undefined) {
    if (!duoState[sender]) duoState[sender] = {};
    duoState[sender][payload.taskId] = payload.state;
    hasChange = true;
  }

  if (hasChange) {
    // If user made a change, they are obviously online!
    presenceState[sender] = {
      online: true,
      lastSeen: Date.now()
    };

    saveLocalCache();
    if (onSyncUpdateCallback) onSyncUpdateCallback();

    // Show friendly toast if partner completed a task
    const currentUserKey = localStorage.getItem("elite_current_user");
    if (showToastNotification && currentUserKey && sender !== currentUserKey && payload.taskTitle) {
      if (window.showToast) {
        window.showToast(`${ACCOUNTS[sender].avatar} ${ACCOUNTS[sender].name} vừa hoàn thành: ${payload.taskTitle}!`);
      }
    }
  }
}

export function sendPresenceHeartbeat(currentUserKey, status = 'online') {
  if (!currentUserKey) return;

  const payload = {
    sender: currentUserKey,
    type: "presence",
    status: status,
    timestamp: Date.now()
  };

  fetch(PUBLISH_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  }).catch(() => {});

  if (duoRef && auth && auth.currentUser) {
    duoRef.child('presence').child(currentUserKey).set({
      status: status,
      timestamp: Date.now()
    }).catch(() => {});
  }
}

export function startPresenceLoop(userKey) {
  stopPresenceLoop();
  if (!userKey) return;

  // Mark online immediately & reset activity timer
  lastUserActivity = Date.now();
  isCurrentlyIdle = false;
  sendPresenceHeartbeat(userKey, 'online');
  presenceState[userKey] = { online: true, lastSeen: Date.now() };

  // Setup Firebase RTDB onDisconnect to auto-mark offline if connection drops
  if (duoRef && auth && auth.currentUser) {
    try {
      const presenceUserRef = duoRef.child('presence').child(userKey);
      presenceUserRef.onDisconnect().set({
        status: 'offline',
        timestamp: Date.now()
      }).catch(() => {});
    } catch (e) {}
  }

  // Heartbeat every 20 seconds with idle detection
  presenceTimer = setInterval(() => {
    const idleDuration = Date.now() - lastUserActivity;
    if (idleDuration > IDLE_TIMEOUT_MS) {
      if (!isCurrentlyIdle) {
        isCurrentlyIdle = true;
        sendPresenceHeartbeat(userKey, 'offline');
        presenceState[userKey] = { online: false, lastSeen: lastUserActivity };
        if (window.renderPresenceIndicators) window.renderPresenceIndicators();
      }
      return;
    }

    sendPresenceHeartbeat(userKey, 'online');
    presenceState[userKey] = { online: true, lastSeen: Date.now() };
  }, 20000);
}

export function stopPresenceLoop() {
  if (presenceTimer) {
    clearInterval(presenceTimer);
    presenceTimer = null;
  }
}

export function broadcastChange(currentUserKey, taskId, state, taskTitle) {
  saveLocalCache();
  if (!currentUserKey) return;

  const payload = {
    sender: currentUserKey,
    taskId: taskId,
    state: state,
    taskTitle: taskTitle,
    fullState: {
      lang: duoState.lang,
      diem: duoState.diem
    },
    timestamp: Date.now()
  };

  fetch(PUBLISH_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  }).catch(() => {});

  if (duoRef && auth && auth.currentUser) {
    setSyncStatus('syncing', 'Đang lưu Database...');
    duoRef.child(currentUserKey).set(duoState[currentUserKey])
      .then(() => {
        duoRef.child('updatedAt').set(Date.now());
        duoRef.child('lastUpdatedBy').set(currentUserKey);
        setSyncStatus('synced', 'Database Synced (Cloud)');
      })
      .catch(err => {
        console.error("Firebase write error:", err);
        setSyncStatus('warning', 'Lỗi Database: ' + err.code);
        if (window.showToast) window.showToast("Lỗi lưu Database: " + (err.message || err.code));
      });
  }
}

export function setSyncStatus(status, text) {
  const dot = document.getElementById("syncDot");
  const label = document.getElementById("syncStatusText");
  if (dot) dot.className = "sync-dot " + status;
  if (label) label.innerText = text;
}

// -------------------------------------------------------------------------
// FIREBASE RTDB BACKUP
// -------------------------------------------------------------------------
export const firebaseConfig = {
  apiKey: "AIzaSyBfj1pBg6Px0pUhERNuRxzPJCqwL9h0G1k",
  authDomain: "my-habits-bbe5b.firebaseapp.com",
  databaseURL: "https://my-habits-bbe5b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-habits-bbe5b",
  storageBucket: "my-habits-bbe5b.firebasestorage.app",
  messagingSenderId: "46496314879",
  appId: "1:46496314879:web:0011dad743b74200f423ca"
};

export let auth = null;
export let db = null;
export let duoRef = null;

try {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.database();
  // Using path under habits_vault_history which is already permitted in Firebase Rules!
  duoRef = db.ref('habits_vault_history/elite_duo_progress');

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  duoRef.on('value', snapshot => {
    const val = snapshot.val();
    if (val) {
      if (val.lang) duoState.lang = val.lang;
      if (val.diem) duoState.diem = val.diem;
      if (val.presence) {
        if (val.presence.lang) {
          presenceState.lang = {
            online: val.presence.lang.status === "online",
            lastSeen: val.presence.lang.timestamp || 0
          };
        }
        if (val.presence.diem) {
          presenceState.diem = {
            online: val.presence.diem.status === "online",
            lastSeen: val.presence.diem.timestamp || 0
          };
        }
      }
      saveLocalCache();
      if (onSyncUpdateCallback) onSyncUpdateCallback();
      setSyncStatus('synced', 'Database Synced (Cloud)');
    }
  }, err => {
    console.warn("Firebase RTDB notice:", err.message);
  });
} catch (e) {
  console.warn("Firebase init notice:", e);
}

// -------------------------------------------------------------------------
// EXPOSE SYNC DEBUG TOOLS
// -------------------------------------------------------------------------
if (typeof window !== "undefined") {
  window.__ELITE_DEBUG__ = window.__ELITE_DEBUG__ || {};
  window.__ELITE_DEBUG__.getDuoState = () => duoState;
  window.__ELITE_DEBUG__.getPresenceState = () => presenceState;
  window.__ELITE_DEBUG__.simulatePresence = (user, status) => {
    presenceState[user] = {
      online: status === 'online',
      lastSeen: Date.now()
    };
    if (window.renderPresenceIndicators) window.renderPresenceIndicators();
    console.log(`[DEBUG] Simulated ${user} presence as: ${status}`);
  };
  window.__ELITE_DEBUG__.forceSaveLocal = () => saveLocalCache();
}
