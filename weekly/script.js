const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear().toString();

const progressBar = document.querySelector(".reading-progress span");

function updateReadingProgress() {
  if (!progressBar) return;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
}

window.addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();

const monthLinks = Array.from(document.querySelectorAll("[data-month-link]"));
const monthSections = Array.from(document.querySelectorAll("[data-month-section]"));

if (monthLinks.length && monthSections.length) {
  const monthObserver = new IntersectionObserver(
    (entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (!current) return;

      monthLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.monthLink === current.target.id);
      });
    },
    { rootMargin: "-15% 0px -70%", threshold: 0 },
  );

  monthSections.forEach((section) => monthObserver.observe(section));
}

const slideCounter = document.querySelector("[data-current-slide]");
const slides = Array.from(document.querySelectorAll(".ppt-slide"));

if (slideCounter && slides.length) {
  const slideObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (current) slideCounter.textContent = current.target.dataset.slideNumber;
    },
    { rootMargin: "-18% 0px -52%", threshold: [0.1, 0.45, 0.75] },
  );

  slides.forEach((slide) => slideObserver.observe(slide));
}

document.querySelectorAll("video[controls]").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video[controls]").forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.pause();
    });
  });
});

const fullscreenButton = document.querySelector("[data-fullscreen]");
const slideDeck = document.querySelector(".slide-deck");

if (fullscreenButton && slideDeck && document.fullscreenEnabled) {
  fullscreenButton.addEventListener("click", async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await slideDeck.requestFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.textContent = document.fullscreenElement ? "退出全屏" : "全屏浏览";
  });
} else if (fullscreenButton) {
  fullscreenButton.hidden = true;
}
