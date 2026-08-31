const reportRoot = document.documentElement;
const reportGate = document.querySelector("[data-report-gate]");
const reportGateForm = document.querySelector("[data-report-gate-form]");
const reportGateError = document.querySelector("[data-report-gate-error]");
const reportPassword = document.querySelector("#report-password");
const reportAccessKey = "weekly-report-access-2026-08-21";
const reportPasswordHash = "06c59eec127261d5bcba283f7b8bc6d9cbeb20efc12a262a8809f98e60ed5a76";

function startReportMedia() {
  const activeSlide = document.querySelector(".ppt-slide:not([hidden])") || document.querySelector(".ppt-slide");

  document.querySelectorAll("video[data-autoplay]").forEach((video) => {
    video.autoplay = true;
    video.muted = true;
    if (activeSlide?.contains(video)) video.play().catch(() => {});
  });
}

function unlockReport() {
  try {
    sessionStorage.setItem(reportAccessKey, "granted");
  } catch (error) {
    // Access still works for the current page if session storage is unavailable.
  }

  reportRoot.dataset.reportAccess = "granted";
  reportRoot.classList.add("report-unlocking");
  reportRoot.classList.remove("report-locked");
  startReportMedia();

  window.setTimeout(() => {
    reportRoot.classList.remove("report-unlocking");
    reportGate?.setAttribute("hidden", "");
    document.querySelector(".slide-deck")?.focus({ preventScroll: true });
  }, 460);
}

async function hashPassword(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

if (reportRoot.dataset.reportAccess === "granted") {
  reportGate?.setAttribute("hidden", "");
  startReportMedia();
} else {
  reportPassword?.focus({ preventScroll: true });
}

reportGateForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!reportPassword || !reportGateError) return;

  const submitButton = reportGateForm.querySelector("button[type='submit']");
  submitButton?.setAttribute("disabled", "");
  reportGateError.textContent = "正在验证…";

  try {
    const submittedHash = await hashPassword(reportPassword.value);
    if (submittedHash === reportPasswordHash) {
      reportGateError.textContent = "验证成功";
      unlockReport();
      return;
    }

    reportGateError.textContent = "密码不正确，请重新输入。";
    reportPassword.value = "";
    reportPassword.focus();
  } catch (error) {
    reportGateError.textContent = "当前浏览器无法完成验证，请更换现代浏览器后重试。";
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});
