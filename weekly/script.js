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

const tocLinks = Array.from(document.querySelectorAll(".report-toc a"));
const reportSections = Array.from(document.querySelectorAll(".report-section[id]"));

if (tocLinks.length && reportSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleSection) return;
      tocLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visibleSection.target.id}`);
      });
    },
    { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.3, 0.6] },
  );

  reportSections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.pause();
    });
  });
});
