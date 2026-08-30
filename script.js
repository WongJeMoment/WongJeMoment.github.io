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
    await restoreHashPosition();
    document.documentElement.classList.add("site-ready");
  } catch (error) {
    console.error(error);
    const message = componentLanguage === "zh" ? "页面内容加载失败，请刷新重试。" : "Content failed to load. Please refresh the page.";
    document.body.insertAdjacentHTML("beforeend", `<p class="component-error">${message}</p>`);
  }
}

initializeSite();
