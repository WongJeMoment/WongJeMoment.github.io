const memoirRoot = document.documentElement;
const memoirGate = document.querySelector("[data-memoir-gate]");
const memoirGateForm = document.querySelector("[data-memoir-gate-form]");
const memoirGateError = document.querySelector("[data-memoir-gate-error]");
const memoirPassword = document.querySelector("#memoir-password");
const memoirAccessKey = "undergraduate-memoir-access-2021-2024";
const memoirPasswordHash = "54dc9a3d748b2429f93e88da4fc6d5516994b14763d399003ba2461124924718";

function unlockMemoir() {
  try {
    sessionStorage.setItem(memoirAccessKey, "granted");
  } catch (error) {
    // The current page can still unlock when session storage is unavailable.
  }

  memoirRoot.dataset.memoirAccess = "granted";
  memoirRoot.classList.add("memoir-unlocking");
  memoirRoot.classList.remove("memoir-locked");

  window.setTimeout(() => {
    memoirRoot.classList.remove("memoir-unlocking");
    memoirGate?.setAttribute("hidden", "");
    document.querySelector(".memoir-nav")?.focus({ preventScroll: true });
  }, 480);
}

async function hashMemoirPassword(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

if (memoirRoot.dataset.memoirAccess === "granted") {
  memoirGate?.setAttribute("hidden", "");
} else {
  memoirPassword?.focus({ preventScroll: true });
}

memoirGateForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!memoirPassword || !memoirGateError) return;

  const submitButton = memoirGateForm.querySelector("button[type='submit']");
  submitButton?.setAttribute("disabled", "");
  memoirGateError.textContent = "正在验证…";

  try {
    const submittedHash = await hashMemoirPassword(memoirPassword.value);
    if (submittedHash === memoirPasswordHash) {
      memoirGateError.textContent = "回答正确";
      unlockMemoir();
      return;
    }

    memoirGateError.textContent = "答案不正确，请再想想。";
    memoirPassword.value = "";
    memoirPassword.focus();
  } catch (error) {
    memoirGateError.textContent = "当前浏览器无法完成验证，请更换现代浏览器后重试。";
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear().toString();

const photos = Array.from(document.querySelectorAll(".memory-photo"));
const lightbox = document.querySelector("#memory-lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let activePhotoIndex = 0;

function showPhoto(index) {
  activePhotoIndex = (index + photos.length) % photos.length;
  const photo = photos[activePhotoIndex];
  const sourceImage = photo.querySelector("img");
  lightboxImage.src = sourceImage.src;
  lightboxImage.alt = sourceImage.alt;
  lightboxCaption.textContent = `${String(activePhotoIndex + 1).padStart(3, "0")} · ${photo.dataset.caption}`;
  if (!lightbox.open) lightbox.showModal();
}

photos.forEach((photo, index) => photo.addEventListener("click", () => showPhoto(index)));

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(activePhotoIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(activePhotoIndex + 1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showPhoto(activePhotoIndex - 1);
  if (event.key === "ArrowRight") showPhoto(activePhotoIndex + 1);
});
