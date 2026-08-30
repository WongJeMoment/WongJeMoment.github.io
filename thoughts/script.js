const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear().toString();

const progressBar = document.querySelector(".reading-progress span");

function updateReadingProgress() {
  if (!progressBar) return;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
}

if (progressBar) {
  updateReadingProgress();
  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);
}
