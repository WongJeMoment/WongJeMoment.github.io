const year = document.querySelector("#year");

const translations = {
  zh: {
    pageTitle: "Wong Je — 机器人与感知",
    metaDescription: "Wong Je 的个人主页，关注机器人感知、事件视觉、6D 位姿估计与智能抓取。",
    skipLink: "跳到主要内容",
    brandLabel: "Wong Je 首页",
    navLabel: "主要导航",
    "nav.about": "关于",
    "nav.focus": "方向",
    "nav.projects": "项目",
    "nav.contact": "联系我",
    "hero.titleLineOne": "让机器人",
    "hero.titleLineTwo": "看见、理解、行动。",
    "hero.introBefore": "你好，我是",
    "hero.introAfter": "。我关注机器人感知、事件视觉、6D 位姿估计与智能抓取，并持续探索从算法原型到实时系统的完整路径。",
    "hero.viewProjects": "查看项目",
    "facts.locationLabel": "所在地",
    "facts.locationValue": "中国上海",
    "facts.focusLabel": "当前方向",
    "facts.focusValue": "具身智能",
    "facts.toolsLabel": "常用工具",
    avatarLabel: "Wong Je 的头像",
    "status.label": "正在探索",
    "status.value": "机器人学习",
    "about.label": "01 / 关于",
    "about.title": "把感知变成可靠的机器人能力。",
    "about.paragraphOne": "我的项目聚焦于机器人如何从复杂环境中获取信息：从事件相机的低延迟视觉，到物体位姿估计、目标跟踪与抓取决策。",
    "about.paragraphTwo": "我喜欢动手构建完整系统，在仿真中快速验证想法，再把算法推进到实时运行。这里记录我的开源实验、研究原型与持续学习过程。",
    "focus.label": "02 / 方向",
    "focus.title": "研究与实践方向",
    "focus.intro": "围绕机器人与真实世界交互所需的感知、估计和控制能力。",
    "focus.eventVision": "利用事件相机的高时间分辨率与低延迟特性，探索动态场景中的检测、跟踪和抓取。",
    "focus.robotPerception": "研究 6D 位姿估计、RGB-D 感知与空间理解，让机器人获得可用于行动的环境表示。",
    "focus.learningSimulation": "通过物理仿真和强化学习训练机器人技能，并关注从策略验证到真实部署的落差。",
    "projects.label": "03 / 代表项目",
    "projects.title": "代表项目",
    "projects.viewAll": "全部项目",
    "projects.catchingBoxes": "基于 Isaac Lab 与强化学习的 Unitree G1 双手接箱和全身平衡任务。",
    "projects.pose": "面向机器人操作的物体六自由度位姿估计实验与实现。",
    "projects.eventCamera": "使用事件相机探索低延迟目标感知与机器人抓取检测。",
    "projects.slam": "机器人定位、建图与环境理解方向的实践项目。",
    "contact.eyebrow": "保持联系",
    "contact.titleLineOne": "一起讨论机器人、感知，",
    "contact.titleLineTwo": "或者下一个有趣的想法。",
    "contact.action": "在 GitHub 找到我",
    "footer.tagline": "以好奇心设计与构建。",
    switchLabel: "Switch to English",
    switchText: "EN",
  },
  en: {
    pageTitle: "Wong Je — Robotics & Perception",
    metaDescription: "Wong Je's personal website, focused on robot perception, event-based vision, 6D pose estimation, and intelligent grasping.",
    skipLink: "Skip to main content",
    brandLabel: "Wong Je home",
    navLabel: "Main navigation",
    "nav.about": "About",
    "nav.focus": "Focus",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.titleLineOne": "Helping robots",
    "hero.titleLineTwo": "see, understand, and act.",
    "hero.introBefore": "Hi, I'm",
    "hero.introAfter": ". I work on robot perception, event-based vision, 6D pose estimation, and intelligent grasping—exploring the full path from algorithm prototypes to real-time systems.",
    "hero.viewProjects": "View projects",
    "facts.locationLabel": "Location",
    "facts.locationValue": "Shanghai, China",
    "facts.focusLabel": "Current focus",
    "facts.focusValue": "Embodied AI",
    "facts.toolsLabel": "Build with",
    avatarLabel: "Portrait of Wong Je",
    "status.label": "NOW EXPLORING",
    "status.value": "Robot Learning",
    "about.label": "01 / ABOUT",
    "about.title": "Turning perception into reliable robotic capability.",
    "about.paragraphOne": "My projects explore how robots acquire information from complex environments—from the low-latency vision of event cameras to object pose estimation, target tracking, and grasp planning.",
    "about.paragraphTwo": "I enjoy building complete systems: validating ideas quickly in simulation, then advancing the algorithms toward real-time operation. This site documents my open-source experiments, research prototypes, and ongoing learning.",
    "focus.label": "02 / FOCUS",
    "focus.title": "Research & practice",
    "focus.intro": "Perception, estimation, and control for robots interacting with the real world.",
    "focus.eventVision": "Using the high temporal resolution and low latency of event cameras to explore detection, tracking, and grasping in dynamic scenes.",
    "focus.robotPerception": "Studying 6D pose estimation, RGB-D perception, and spatial understanding to give robots actionable representations of their surroundings.",
    "focus.learningSimulation": "Training robotic skills through physics simulation and reinforcement learning, with an eye on the gap between policy validation and real-world deployment.",
    "projects.label": "03 / SELECTED WORK",
    "projects.title": "Selected projects",
    "projects.viewAll": "View all projects",
    "projects.catchingBoxes": "A Unitree G1 box-catching and whole-body balancing task built with Isaac Lab and reinforcement learning.",
    "projects.pose": "Experiments and implementations for six-degree-of-freedom object pose estimation in robotic manipulation.",
    "projects.eventCamera": "Exploring low-latency object perception and robotic grasp detection with event cameras.",
    "projects.slam": "A hands-on project in robot localization, mapping, and environmental understanding.",
    "contact.eyebrow": "LET'S CONNECT",
    "contact.titleLineOne": "Let's talk robotics, perception,",
    "contact.titleLineTwo": "or the next interesting idea.",
    "contact.action": "Find me on GitHub",
    "footer.tagline": "Designed & built with curiosity.",
    switchLabel: "切换到中文",
    switchText: "中",
  },
};

const languageToggle = document.querySelector(".language-toggle");
const languageToggleLabel = document.querySelector(".language-toggle-label");
const metaDescription = document.querySelector("#meta-description");

function setLanguage(language) {
  const selectedLanguage = translations[language] ? language : "zh";
  const copy = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage === "zh" ? "zh-CN" : "en";
  document.title = copy.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (copy[key]) element.setAttribute("aria-label", copy[key]);
  });

  if (metaDescription) metaDescription.setAttribute("content", copy.metaDescription);

  if (languageToggle && languageToggleLabel) {
    languageToggle.setAttribute("aria-label", copy.switchLabel);
    languageToggle.setAttribute("title", copy.switchLabel);
    languageToggleLabel.textContent = copy.switchText;
    languageToggle.dataset.language = selectedLanguage;
  }

  try {
    localStorage.setItem("preferred-language", selectedLanguage);
  } catch {
    // The switch still works when browser storage is unavailable.
  }
}

let savedLanguage = null;

try {
  savedLanguage = localStorage.getItem("preferred-language");
} catch {
  // Keep the default language when browser storage is unavailable.
}

setLanguage(savedLanguage || "zh");

languageToggle?.addEventListener("click", () => {
  const nextLanguage = languageToggle.dataset.language === "zh" ? "en" : "zh";
  setLanguage(nextLanguage);
});

if (year) {
  year.textContent = new Date().getFullYear().toString();
}
