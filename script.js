const componentSlots = document.querySelectorAll("[data-component]");
const componentLanguage = document.documentElement.lang.startsWith("zh") ? "zh" : "en";

async function loadComponent(slot) {
  const componentName = slot.dataset.component;
  const componentPath = `components/${componentLanguage}/${componentName}.html`;
  const response = await fetch(componentPath, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(`Unable to load ${componentPath}: ${response.status}`);
  }

  slot.innerHTML = await response.text();
}

function updateYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear().toString();
}

function initializeQuickFactAnimations() {
  const facts = Array.from(document.querySelectorAll(".quick-fact"));
  if (!facts.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const animationTimers = new WeakMap();

  const replay = (fact) => {
    window.clearTimeout(animationTimers.get(fact));
    fact.classList.remove("is-animating");
    void fact.offsetWidth;
    fact.classList.add("is-animating");
    animationTimers.set(
      fact,
      window.setTimeout(() => fact.classList.remove("is-animating"), 2100),
    );
  };

  facts.forEach((fact) => {
    fact.addEventListener("pointerenter", () => replay(fact));
    fact.addEventListener("focus", () => replay(fact));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        facts.forEach((fact, index) => window.setTimeout(() => replay(fact), index * 180));
        observer.disconnect();
      });
    },
    { threshold: 0.6 },
  );

  observer.observe(document.querySelector(".quick-facts"));
}

async function restoreHashPosition() {
  if (!window.location.hash) return;

  const initialHash = window.location.hash;
  if (document.fonts?.ready) await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  const target = document.querySelector(initialHash);
  if (target) target.scrollIntoView({ block: "start" });

  // A second pass accounts for late image/font layout changes after component injection.
  await new Promise((resolve) => setTimeout(resolve, 350));
  if (window.location.hash === initialHash) target?.scrollIntoView({ block: "start" });
}

async function initializeSite() {
  try {
    await Promise.all(Array.from(componentSlots, loadComponent));
    updateYear();
    initializeQuickFactAnimations();
    await restoreHashPosition();
    document.documentElement.classList.add("site-ready");
  } catch (error) {
    console.error(error);
    const message = componentLanguage === "zh" ? "页面内容加载失败，请刷新重试。" : "Content failed to load. Please refresh the page.";
    document.body.insertAdjacentHTML("beforeend", `<p class="component-error">${message}</p>`);
  }
}

initializeSite();
