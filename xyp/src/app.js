import {
  buildRunScoreMessage,
  createProfile,
  sanitizeDigits,
  sanitizeName,
  sanitizeRuns,
} from "./profile.js";

const STORAGE_KEY = "sunshine-run-demo-profile";

const fields = {
  school: document.querySelector('[data-field="school"]'),
  studentId: document.querySelector('[data-field="studentId"]'),
  name: document.querySelector('[data-field="name"]'),
  gender: document.querySelector('[data-field="gender"]'),
  scoreMessage: document.querySelector('[data-field="scoreMessage"]'),
};

const settingsForm = document.querySelector(".settings-dialog");

let profile = loadProfile();

renderProfile(profile);
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
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModals();
  }
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(settingsForm);
  const nextProfile = {
    ...profile,
    school: sanitizeName(formData.get("school"), profile.school),
    studentId: sanitizeDigits(formData.get("studentId"), profile.studentId),
    name: sanitizeName(formData.get("name"), profile.name),
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
      studentId: sanitizeDigits(parsed.studentId, "2024020018"),
      name: sanitizeName(parsed.name, "演示用户"),
      gender: sanitizeName(parsed.gender, "女"),
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
  settingsForm.elements.runs.value = nextProfile.runs;
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
