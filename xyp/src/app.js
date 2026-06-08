import {
  buildRunScoreMessage,
  createProfile,
  sanitizeDigits,
  sanitizeGender,
  sanitizeName,
  sanitizeRuns,
} from "./profile.js";
import {
  canUseFullscreen,
  getFullscreenButtonLabel,
  getFullscreenHelpText,
  isStandaloneDisplay,
} from "./fullscreen.js";

const STORAGE_KEY = "sunshine-run-page-profile-v2";

const fields = {
  school: document.querySelector('[data-field="school"]'),
  studentId: document.querySelector('[data-field="studentId"]'),
  name: document.querySelector('[data-field="name"]'),
  gender: document.querySelector('[data-field="gender"]'),
  scoreMessage: document.querySelector('[data-field="scoreMessage"]'),
  fullscreenHelp: document.querySelector('[data-field="fullscreenHelp"]'),
};

const settingsForm = document.querySelector(".settings-dialog");
const fullscreenButton = document.querySelector('[data-action="fullscreen"]');
const standaloneQuery = window.matchMedia("(display-mode: standalone)");

let profile = loadProfile();

renderProfile(profile);
renderFullscreenButton();
openInitialModal();

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");

  if (!target) {
    return;
  }

  const action = target.dataset.action;

  if (action === "score") {
    openModal("score");
  }

  if (action === "settings") {
    fillSettingsForm(profile);
    openModal("settings");
  }

  if (action === "close") {
    closeModals();
  }

  if (action === "fullscreen") {
    toggleFullscreen();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModals();
  }
});

document.addEventListener("fullscreenchange", renderFullscreenButton);

if (standaloneQuery.addEventListener) {
  standaloneQuery.addEventListener("change", renderFullscreenButton);
} else if (standaloneQuery.addListener) {
  standaloneQuery.addListener(renderFullscreenButton);
}

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(settingsForm);
  const nextProfile = {
    ...profile,
    school: sanitizeName(formData.get("school"), profile.school),
    studentId: sanitizeDigits(formData.get("studentId"), profile.studentId),
    name: sanitizeName(formData.get("name"), profile.name),
    gender: sanitizeGender(formData.get("gender"), profile.gender),
    runs: sanitizeRuns(formData.get("runs"), profile.runs),
  };

  profile = nextProfile;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
  renderProfile(nextProfile);
  closeModals();
});

function loadProfile() {
  const urlProfile = createProfile(window.location.search);
  const savedProfile = readSavedProfile();

  if (window.location.search) {
    return urlProfile;
  }

  return savedProfile ? { ...urlProfile, ...savedProfile } : urlProfile;
}

function readSavedProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    return {
      school: sanitizeName(parsed.school, "示例大学"),
      studentId: sanitizeDigits(parsed.studentId, "学号"),
      name: sanitizeName(parsed.name, "用户"),
      gender: sanitizeGender(parsed.gender, "女"),
      runs: sanitizeRuns(parsed.runs, 35),
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function renderProfile(nextProfile) {
  fields.school.textContent = nextProfile.school;
  fields.studentId.textContent = nextProfile.studentId;
  fields.name.textContent = nextProfile.name;
  fields.gender.textContent = nextProfile.gender;
  fields.scoreMessage.textContent = buildRunScoreMessage(nextProfile.runs);
}

function fillSettingsForm(nextProfile) {
  settingsForm.elements.school.value = nextProfile.school;
  settingsForm.elements.studentId.value = nextProfile.studentId;
  settingsForm.elements.name.value = nextProfile.name;
  settingsForm.elements.gender.value = nextProfile.gender;
  settingsForm.elements.runs.value = nextProfile.runs;
}

async function toggleFullscreen() {
  if (!canUseFullscreen(document)) {
    renderFullscreenButton();
    showFullscreenHelp();
    return;
  }

  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await document.documentElement.requestFullscreen();
  }

  renderFullscreenButton();
}

function renderFullscreenButton() {
  const isSupported = canUseFullscreen(document);
  const isFullscreen = Boolean(document.fullscreenElement);
  const isStandalone = getStandaloneState();

  fullscreenButton.textContent = getFullscreenButtonLabel(isSupported, isFullscreen, isStandalone);
  fullscreenButton.disabled = isStandalone;

  if (isSupported && !isStandalone) {
    hideFullscreenHelp();
  }
}

function showFullscreenHelp() {
  const text = getFullscreenHelpText(canUseFullscreen(document), getStandaloneState());

  if (!text) {
    hideFullscreenHelp();
    return;
  }

  fields.fullscreenHelp.textContent = text;
  fields.fullscreenHelp.hidden = false;
}

function hideFullscreenHelp() {
  fields.fullscreenHelp.textContent = "";
  fields.fullscreenHelp.hidden = true;
}

function getStandaloneState() {
  return isStandaloneDisplay(navigator, standaloneQuery);
}

function openModal(name) {
  closeModals();
  document.querySelector(`[data-modal="${name}"]`).hidden = false;
}

function closeModals() {
  document.querySelectorAll("[data-modal]").forEach((modal) => {
    modal.hidden = true;
  });
}

function openInitialModal() {
  const params = new URLSearchParams(window.location.search);
  const modal = params.get("modal");

  if (modal === "score" || modal === "settings") {
    if (modal === "settings") {
      fillSettingsForm(profile);
    }

    openModal(modal);
  }
}
