const DEFAULT_PROFILE = Object.freeze({
  school: "示例大学",
  studentId: "2024020018",
  name: "演示用户",
  gender: "女",
  runs: 35,
});

const SUPPORTED_GENDERS = new Set(["男", "女", "其他"]);

export function sanitizeName(value, fallback) {
  const cleaned = String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, "")
    .slice(0, 18);

  return cleaned || fallback;
}

export function sanitizeDigits(value, fallback) {
  const cleaned = String(value ?? "").replace(/\D/g, "").slice(0, 18);

  return cleaned || fallback;
}

export function sanitizeRuns(value, fallback = DEFAULT_PROFILE.runs) {
  const parsed = Number.parseInt(sanitizeDigits(value, String(fallback)), 10);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(0, Math.min(parsed, 999));
}

export function sanitizeGender(value, fallback = DEFAULT_PROFILE.gender) {
  const cleaned = sanitizeName(value, fallback);

  return SUPPORTED_GENDERS.has(cleaned) ? cleaned : fallback;
}

export function createProfile(search = "") {
  const params = new URLSearchParams(search);

  return {
    school: sanitizeName(params.get("school"), DEFAULT_PROFILE.school),
    studentId: sanitizeDigits(params.get("studentId"), DEFAULT_PROFILE.studentId),
    name: sanitizeName(params.get("name"), DEFAULT_PROFILE.name),
    gender: sanitizeGender(params.get("gender"), DEFAULT_PROFILE.gender),
    runs: sanitizeRuns(params.get("runs"), DEFAULT_PROFILE.runs),
  };
}

export function buildRunScoreMessage(runs) {
  return [
    "本学期已锻炼",
    `阳光跑:${sanitizeRuns(runs)}次`,
    "此处只展示实际锻炼成绩。其他相关",
    "各种成绩请至【发现-课外锻炼-锻炼",
    "查询】页面查询。",
  ].join("\n");
}
