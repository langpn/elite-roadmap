// =========================================================================
// UI STATE PERSISTENCE STORE & CENTRALIZED DEBUGGING ENGINE
// =========================================================================

const UI_STORAGE_KEY = "elite_ui_store_v1";

const DEFAULT_UI_STATE = {
  mainMode: "sprints",           // 'sprints' | 'courses' | 'career'
  selectedSprintFilter: "all",   // 'all' | 's0' | 's1' | 's2' | 's3' | 's4'
  selectedCourseId: "baby-resolve", // 'baby-resolve' | 'elite' | ...
  collapsedSprints: {},          // { [sprintId]: boolean (true = closed) }
  collapsedChapters: {}          // { [chapterId]: boolean (true = closed) }
};

let uiState = { ...DEFAULT_UI_STATE };

// Initialize store from localStorage
try {
  const saved = localStorage.getItem(UI_STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    uiState = {
      ...DEFAULT_UI_STATE,
      ...parsed,
      collapsedSprints: { ...parsed.collapsedSprints },
      collapsedChapters: { ...parsed.collapsedChapters }
    };
  }
} catch (e) {
  console.warn("[UIStore] Parse error, using default state:", e);
}

function persist() {
  try {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(uiState));
  } catch (e) {
    console.warn("[UIStore] Failed to persist UI state:", e);
  }
}

export const uiStore = {
  // --- Main Mode ('sprints' | 'courses' | 'career') ---
  getMainMode() {
    return uiState.mainMode || "sprints";
  },
  setMainMode(mode) {
    if (["sprints", "courses", "career"].includes(mode)) {
      uiState.mainMode = mode;
      persist();
    }
  },

  // --- Sprint Filter ('all' | sprintId) ---
  getSelectedSprint() {
    return uiState.selectedSprintFilter || "all";
  },
  setSelectedSprint(filterId) {
    uiState.selectedSprintFilter = filterId;
    persist();
  },

  // --- Course Syllabus Selection ---
  getSelectedCourse() {
    return uiState.selectedCourseId || "baby-resolve";
  },
  setSelectedCourse(courseId) {
    uiState.selectedCourseId = courseId;
    persist();
  },

  // --- Sprint Accordion Collapse State ---
  isSprintCollapsed(sprintId) {
    return !!uiState.collapsedSprints[sprintId];
  },
  toggleSprintCollapse(sprintId) {
    uiState.collapsedSprints[sprintId] = !uiState.collapsedSprints[sprintId];
    persist();
    return uiState.collapsedSprints[sprintId];
  },
  setSprintCollapse(sprintId, isCollapsed) {
    uiState.collapsedSprints[sprintId] = !!isCollapsed;
    persist();
  },

  // --- Chapter Accordion Collapse State ---
  isChapterCollapsed(chapterId) {
    return !!uiState.collapsedChapters[chapterId];
  },
  toggleChapterCollapse(chapterId) {
    uiState.collapsedChapters[chapterId] = !uiState.collapsedChapters[chapterId];
    persist();
    return uiState.collapsedChapters[chapterId];
  },
  setChapterCollapse(chapterId, isCollapsed) {
    uiState.collapsedChapters[chapterId] = !!isCollapsed;
    persist();
  },

  // --- Full State Operations ---
  getState() {
    return JSON.parse(JSON.stringify(uiState));
  },
  reset() {
    uiState = JSON.parse(JSON.stringify(DEFAULT_UI_STATE));
    persist();
    return uiState;
  }
};

// =========================================================================
// EXPOSE DEBUG CONSOLE DIAGNOSTICS FOR DEVELOPER TOOLS
// =========================================================================
if (typeof window !== "undefined") {
  window.__ELITE_DEBUG__ = {
    getUIState: () => uiStore.getState(),
    resetUIState: () => {
      uiStore.reset();
      console.log("[DEBUG] UI state reset to defaults. Reloading page...");
      window.location.reload();
    },
    exportAllLocalData: () => {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("elite_"));
      const dump = {};
      keys.forEach(k => {
        try { dump[k] = JSON.parse(localStorage.getItem(k)); }
        catch (e) { dump[k] = localStorage.getItem(k); }
      });
      console.log("[DEBUG] All Elite Local Storage Dump:", dump);
      return dump;
    }
  };
}
