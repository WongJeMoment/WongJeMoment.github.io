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
const slideDeck = document.querySelector(".slide-deck");
const slidePreviousButtons = Array.from(document.querySelectorAll("[data-slide-prev]"));
const slideNextButtons = Array.from(document.querySelectorAll("[data-slide-next]"));
const slidePagination = document.querySelector("[data-slide-pagination]");

if (slideDeck && slideCounter && slidePagination && slides.length) {
  let currentSlideIndex = 0;
  const pageButtons = slides.map((slide, index) => {
    const button = document.createElement("button");
    const pageNumber = String(index + 1).padStart(2, "0");
    const pageTitle = slide.querySelector("footer p")?.textContent || `第 ${index + 1} 页`;

    button.type = "button";
    button.textContent = pageNumber;
    button.setAttribute("aria-label", `打开第 ${index + 1} 页：${pageTitle}`);
    button.addEventListener("click", () => showSlide(index));
    slidePagination.append(button);
    return button;
  });

  function pauseSlideMedia(slide) {
    slide.querySelectorAll("video").forEach((video) => video.pause());
  }

  function playSlideAnimations(slide) {
    slide.querySelectorAll("video.ppt-animation").forEach((video) => {
      video.play().catch(() => {});
    });
  }

  function showSlide(requestedIndex, { updateHash = true } = {}) {
    const nextIndex = Math.min(Math.max(requestedIndex, 0), slides.length - 1);
    currentSlideIndex = nextIndex;

    slides.forEach((slide, index) => {
      const isActive = index === currentSlideIndex;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");

      if (isActive) playSlideAnimations(slide);
      else pauseSlideMedia(slide);
    });

    pageButtons.forEach((button, index) => {
      if (index === currentSlideIndex) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });

    slideCounter.textContent = slides[currentSlideIndex].dataset.slideNumber;
    slidePreviousButtons.forEach((button) => {
      button.disabled = currentSlideIndex === 0;
    });
    slideNextButtons.forEach((button) => {
      button.disabled = currentSlideIndex === slides.length - 1;
    });

    if (updateHash) {
      const activeSlide = slides[currentSlideIndex];
      history.replaceState(null, "", `${location.pathname}${location.search}#${activeSlide.id}`);
    }
  }

  slidePreviousButtons.forEach((button) => {
    button.addEventListener("click", () => showSlide(currentSlideIndex - 1));
  });
  slideNextButtons.forEach((button) => {
    button.addEventListener("click", () => showSlide(currentSlideIndex + 1));
  });

  slideDeck.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentSlideIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentSlideIndex + 1);
    }
  });

  slideDeck.classList.add("is-slide-mode");
  const hashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
  showSlide(hashIndex >= 0 ? hashIndex : 0, { updateHash: false });
}

document.querySelectorAll("video[controls]").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video[controls]").forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.pause();
    });
  });
});

const fullscreenButton = document.querySelector("[data-fullscreen]");

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
