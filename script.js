gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.85, touchMultiplier: 1.25 });

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const translations = {
  pt: {
    "intro__word": "OLA!",
    "header.status": "DISPONÍVEL PARA PROJETOS",
    "header.contact": "CONTATO",
    "hero.role": "DESIGNER · DEVELOPER · VIDEO EDITOR",
    "hero.small": "criando para quem<br />quer ir mais alto",
    "hero.manifesto": "Ideias que encontram<br />forma, ritmo e altitude.",
    "hero.cta": "VER<br />TRABALHOS",
    "about.label": "SOBRE MIM",
    "about.title": "Transformo ideias em experiências que ficam na cabeça.",
    "about.copy": "Sou um criativo multidisciplinar que mistura design, desenvolvimento e edição para dar uma assinatura única a cada projeto.",
    "about.cta": "VAMOS CRIAR ALGO",
    "projects.label": "PROJETOS SELECIONADOS",
    "projects.title": "Meus projetos.",
    "projects.copy": "Uma seleção de identidades, sites e imagens em movimento.",
    "services.label": "O QUE EU FAÇO",
    "services.design.title": "Design",
    "services.design.copy": "Identidade, direção de arte, interfaces e sistemas visuais.",
    "services.web.title": "Web Development",
    "services.web.copy": "Sites expressivos, responsivos e vivos em cada detalhe.",
    "services.video.title": "Vídeo &amp; Motion",
    "services.video.copy": "Edição, ritmo e narrativas que seguram o olhar.",
    "world.label": "ORIGEM / LOCALIZAÇÃO",
    "world.live": "LIVE SIGNAL",
    "world.eyebrow": "COORDENADAS ENCONTRADAS",
    "world.title": "De onde<br /><em>eu venho.</em>",
    "world.copy": "Uma pequena pausa entre o céu e a terra. Gire o globo e encontre a minha base.",
    "world.hint": "ARRASTE PARA GIRAR <b>↔</b>",
    "world.origin.label": "ORIGEM",
    "world.status.label": "STATUS",
    "world.status.value": "ABERTO A NOVOS PROJETOS",
    "world.email": "E-MAIL <i>↗</i>",
    "world.instagram": "INSTAGRAM <i>↗</i>",
    "world.linkedin": "LINKEDIN <i>↗</i>",
    "world.note": "A seta aponta para o próximo contato.",
    "contact.label": "CONTATO",
    "contact.pretitle": "TEM ALGO EM MENTE? VAMOS TIRAR DO PAPEL.",
    "contact.title": "Crie<br /><em>comigo.</em>",
  },
  en: {
    "intro__word": "HI!",
    "header.status": "AVAILABLE FOR PROJECTS",
    "header.contact": "CONTACT",
    "hero.role": "DESIGNER · DEVELOPER · VIDEO EDITOR",
    "hero.small": "creating for those<br />who want to go higher",
    "hero.manifesto": "Ideas that find<br />form, rhythm and altitude.",
    "hero.cta": "VIEW<br />WORK",
    "about.label": "ABOUT ME",
    "about.title": "I turn ideas into experiences that stay with you.",
    "about.copy": "I am a multidisciplinary creative blending design, development and editing to give every project a unique signature.",
    "about.cta": "LET'S CREATE",
    "projects.label": "SELECTED PROJECTS",
    "projects.title": "Projects.",
    "projects.copy": "A selection of identities, websites and moving images.",
    "services.label": "WHAT I DO",
    "services.design.title": "Design",
    "services.design.copy": "Identity, art direction, interfaces and visual systems.",
    "services.web.title": "Web Development",
    "services.web.copy": "Expressive, responsive websites alive in every detail.",
    "services.video.title": "Video &amp; Motion",
    "services.video.copy": "Editing, rhythm and stories that hold the gaze.",
    "world.label": "ORIGIN / LOCATION",
    "world.live": "LIVE SIGNAL",
    "world.eyebrow": "COORDINATES FOUND",
    "world.title": "Where I<br /><em>come from.</em>",
    "world.copy": "A small pause between sky and earth. Spin the globe and find my base.",
    "world.hint": "DRAG TO ROTATE <b>↔</b>",
    "world.origin.label": "ORIGIN",
    "world.status.label": "STATUS",
    "world.status.value": "OPEN TO NEW PROJECTS",
    "world.email": "E-MAIL <i>↗</i>",
    "world.instagram": "INSTAGRAM <i>↗</i>",
    "world.linkedin": "LINKEDIN <i>↗</i>",
    "world.note": "The arrow points to the next contact.",
    "contact.label": "CONTACT",
    "contact.pretitle": "GOT SOMETHING IN MIND? LET'S BRING IT TO LIFE",
    "contact.title": "Create<br /><em>with me.</em>",
  },
};

const safeStorage = {
  get(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* private browsing */ } },
};

const themeToggle = document.querySelector("#theme-toggle");
const themeIcons = {
  sun: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="currentColor"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/></svg>',
};
const languageToggle = document.querySelector("#language-toggle");
let activeLanguage = safeStorage.get("portfolio-language", "pt");

function applyTheme(theme) {
  const isNight = theme === "night";
  document.body.classList.toggle("night-theme", isNight);
  document.documentElement.dataset.theme = isNight ? "night" : "day";
  if (themeToggle) {
    themeToggle.querySelector(".theme-toggle__icon").innerHTML = isNight ? themeIcons.sun : themeIcons.moon;
    themeToggle.setAttribute("aria-pressed", String(isNight));
    themeToggle.setAttribute("aria-label", isNight ? "Ativar modo claro" : "Ativar modo noturno");
  }
  safeStorage.set("portfolio-theme", isNight ? "night" : "light");
  document.dispatchEvent(new CustomEvent("portfolio-theme-change", { detail: { theme: isNight ? "night" : "day" } }));
}

function applyLanguage(language) {
  activeLanguage = language === "en" ? "en" : "pt";
  document.documentElement.lang = activeLanguage === "en" ? "en" : "pt-BR";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[activeLanguage][element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  if (languageToggle) {
    languageToggle.querySelector(".language-toggle__active").textContent = activeLanguage.toUpperCase();
    languageToggle.setAttribute("aria-label", activeLanguage === "pt" ? "Mudar idioma para inglês" : "Change language to Portuguese");
  }
  safeStorage.set("portfolio-language", activeLanguage);
  document.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language: activeLanguage } }));
}

themeToggle?.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("night-theme") ? "light" : "night");
});
languageToggle?.addEventListener("click", () => {
  applyLanguage(activeLanguage === "pt" ? "en" : "pt");
});
applyTheme(safeStorage.get("portfolio-theme", "light"));
applyLanguage(activeLanguage);

const glow = document.querySelector(".cursor-glow");

// Cloud assets are optional: once the user adds the files, the image replaces the soft fallback automatically.
document.querySelectorAll("[data-cloud-src]").forEach((cloud) => {
  const source = cloud.dataset.cloudSrc;
  const image = new Image();
  image.onload = () => { cloud.src = source; };
  image.onerror = () => { cloud.classList.add("cloud-image--missing"); };
  image.src = source;
});

// A small magnetic cursor that expands into a labeled orb on interactive elements.
const customCursor = document.querySelector(".custom-cursor");
const customCursorLabel = customCursor?.querySelector(".custom-cursor__label");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (customCursor && finePointer.matches) {
  document.body.classList.add("has-custom-cursor");
  const moveCursorX = gsap.quickTo(customCursor, "x", { duration: 0.18, ease: "power3.out" });
  const moveCursorY = gsap.quickTo(customCursor, "y", { duration: 0.18, ease: "power3.out" });
  const tiltCursor = gsap.quickTo(customCursor, "rotation", { duration: 0.35, ease: "power3.out" });
  const squashCursorX = gsap.quickTo(customCursor, "scaleX", { duration: 0.35, ease: "power3.out" });
  const squashCursorY = gsap.quickTo(customCursor, "scaleY", { duration: 0.35, ease: "power3.out" });
  const moveGlowX = glow ? gsap.quickTo(glow, "left", { duration: 0.45, ease: "power3.out" }) : null;
  const moveGlowY = glow ? gsap.quickTo(glow, "top", { duration: 0.45, ease: "power3.out" }) : null;
  let activeCursorTarget = null;
  let previousPointer = { x: 0, y: 0 };

  const getCursorLabel = (target) => {
    const key = target.dataset.cursorLabel;
    const labels = {
      "VER TRABALHOS": { pt: "VER TRABALHOS", en: "VIEW WORK" },
      CONTATO: { pt: "CONTATO", en: "CONTACT" },
      TEMA: { pt: "TEMA", en: "THEME" },
      IDIOMA: { pt: "IDIOMA", en: "LANGUAGE" },
      "EXPLORAR BH": { pt: "EXPLORAR BH", en: "EXPLORE BH" },
      CRIAR: { pt: "CRIAR", en: "CREATE" },
      "VER PROJETO": { pt: "VER PROJETO", en: "VIEW PROJECT" },
      "E-MAIL": { pt: "E-MAIL", en: "E-MAIL" },
      INSTAGRAM: { pt: "INSTAGRAM", en: "INSTAGRAM" },
      LINKEDIN: { pt: "LINKEDIN", en: "LINKEDIN" },
      "ENVIAR E-MAIL": { pt: "ENVIAR E-MAIL", en: "SEND E-MAIL" },
    };
    if (key && labels[key]) return labels[key][activeLanguage];
    if (target.matches(".earth-stage canvas")) return activeLanguage === "en" ? "ROTATE GLOBE" : "GIRAR GLOBO";
    if (target.matches(".service")) return activeLanguage === "en" ? "EXPLORE" : "EXPLORAR";
    return target.tagName === "BUTTON" ? (activeLanguage === "en" ? "INTERACT" : "INTERAGIR") : (activeLanguage === "en" ? "OPEN" : "ABRIR");
  };

  const cursorTargets = document.querySelectorAll("a, button, .service, .earth-stage canvas");
  cursorTargets.forEach((target) => {
    target.addEventListener("pointerenter", () => {
      activeCursorTarget = target;
      customCursorLabel.textContent = getCursorLabel(target);
      customCursor.classList.add("is-hover");
    });
    target.addEventListener("pointerleave", () => {
      activeCursorTarget = null;
      customCursor.classList.remove("is-hover");
    });
  });
  document.addEventListener("portfolio-language-change", () => {
    if (activeCursorTarget) customCursorLabel.textContent = getCursorLabel(activeCursorTarget);
  });

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    let cursorX = event.clientX;
    let cursorY = event.clientY;
    if (activeCursorTarget) {
      const bounds = activeCursorTarget.getBoundingClientRect();
      cursorX += (bounds.left + bounds.width / 2 - cursorX) * 0.12;
      cursorY += (bounds.top + bounds.height / 2 - cursorY) * 0.12;
    }
    const velocityX = cursorX - previousPointer.x;
    const velocityY = cursorY - previousPointer.y;
    const velocity = Math.min(Math.hypot(velocityX, velocityY), 32);
    customCursor.classList.add("is-visible");
    moveCursorX(cursorX);
    moveCursorY(cursorY);
    tiltCursor(Math.max(-16, Math.min(16, velocityX * 0.45)));
    squashCursorX(1 + velocity * 0.004);
    squashCursorY(1 - velocity * 0.0025);
    moveGlowX?.(event.clientX);
    moveGlowY?.(event.clientY);
    previousPointer = { x: cursorX, y: cursorY };
  });
}

const heroTitleSpans = document.querySelectorAll(".hero__title span");

if (!reduceMotion) {
  const magneticTargets = document.querySelectorAll(".round-link, .header-contact, .theme-toggle, .language-toggle, .text-link, .world__info-links a");
  magneticTargets.forEach((target) => {
    const xTo = gsap.quickTo(target, "x", { duration: 0.42, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.42, ease: "power3.out" });
    target.addEventListener("pointermove", (event) => {
      const bounds = target.getBoundingClientRect();
      xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.12);
      yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.12);
    });
    target.addEventListener("pointerleave", () => {
      gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, .45)" });
    });
  });
  gsap.to(".header-status__dot, .live-dot", { scale: 1.22, opacity: 0.62, duration: 1.25, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.2 });
  gsap.to(".round-link", { y: -3, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".earth-stage__pointer", { x: 5, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".world__grid", { backgroundPosition: "70px 70px", duration: 22, ease: "none", repeat: -1 });
  gsap.to(".earth-stage__reticle", { rotation: 360, duration: 75, ease: "none", repeat: -1 });
  gsap.to(".earth-stage__marker", { scale: 1.16, opacity: 0.72, duration: 1.45, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".world__copy h2 em", { textShadow: "0 0 1.4rem rgba(117,229,247,.32)", duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true });
}

const intro = document.querySelector(".intro");
const header = document.querySelector(".site-header");
const heroItems = document.querySelectorAll(".hero > *:not(.cloud-layer)");

const introTimeline = gsap.timeline({
  onComplete: () => { intro.style.display = "none"; }
});

  introTimeline
  .from(".intro__eyebrow", { opacity: 0, y: 14, duration: 0.55, ease: "power3.out" })
  .from(".intro__word", { opacity: 0, yPercent: 120, skewY: -4, duration: 1.1, ease: "power4.out" }, "<.1")
  .to(".intro__cloud--one", { xPercent: 24, yPercent: -38, duration: 1.2, ease: "slow(0.35,0.65,0.75)" }, "<.15")
  .to(".intro__cloud--two", { xPercent: -10, yPercent: 32, duration: 1.2, ease: "slow(0.35,0.65,0.75)" }, "<")
  .to(intro, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<.35")
  .from(header, { opacity: 0, y: -20, duration: 0.7, ease: "power3.out" }, "<.5")
  .from(heroItems, { opacity: 0, y: 26, stagger: 0.1, duration: 0.85, ease: "power3.out" }, "<.3");

if (!reduceMotion) {
  document.querySelectorAll("[data-speed]").forEach((layer) => {
    gsap.to(layer, { yPercent: Number(layer.dataset.speed) * -100, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
  });

  gsap.utils.toArray(".about h2, .projects__intro h2").forEach((title) => {
    gsap.from(title, { y: 75, opacity: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: title, start: "top 88%" } });
  });

  gsap.utils.toArray(".project").forEach((project, index) => {
    gsap.from(project, { y: 100, opacity: 0, rotate: index % 2 ? 2 : -2, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: project, start: "top 90%" } });
  });

  gsap.from(".service-list", { y: 48, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".service-list", start: "top 88%" } });
  gsap.to(".contact__sky", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.from(".world__copy, .world__info", { y: 45, opacity: 0, stagger: 0.16, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".world", start: "top 76%" } });
  gsap.from(".earth-stage", { scale: 0.82, opacity: 0, rotateY: -12, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: ".world", start: "top 82%" } });
  gsap.to(".earth-stage", { yPercent: -5, ease: "none", scrollTrigger: { trigger: ".world", start: "top bottom", end: "bottom top", scrub: 1.4 } });
  gsap.from(".earth-stage__status, .earth-stage__hint, .earth-stage__pointer", { y: 18, opacity: 0, stagger: 0.12, duration: 0.8, ease: "back.out(1.5)", scrollTrigger: { trigger: ".world", start: "top 70%" } });
  gsap.from(".world__info-line, .world__info-links a", { x: 28, opacity: 0, stagger: 0.08, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: ".world__info", start: "top 78%" } });
}

window.addEventListener("pointermove", (event) => {
  if (window.innerWidth > 700 && !finePointer.matches) {
    glow.style.opacity = "1";
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }

  if (window.innerWidth > 700 && window.heroTitleSpans && heroTitleSpans.length) {
    const { left, top, width, height } = heroTitleSpans[0].parentElement.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    const distance = Math.hypot(x, y) * 2;
    const intensity = Math.max(0, 1 - distance) * 0.55;

    heroTitleSpans.forEach((span, index) => {
      const offset = (index - 1) * 0.22;
      const phase = Math.min(1, Math.abs(intensity + offset));
      gsap.set(span, {
        x: x * 14 * phase,
        y: y * 7 * phase,
        skewX: x * 5 * phase,
        skewY: y * 3 * phase,
        scale: 1 + phase * 0.05,
        rotation: x * y * 4,
        filter: `blur(${phase * 0.2}px)`,
        force3D: true,
      });
    });
  }
});

window.addEventListener("pointerleave", () => {
  if (heroTitleSpans && heroTitleSpans.length) {
    gsap.to(heroTitleSpans, {
      x: 0,
      y: 0,
      skewX: 0,
      skewY: 0,
      scale: 1,
      rotation: 0,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "elastic.out(1, 0.42)",
    });
  }
});

const siteHeader = document.querySelector(".site-header");
const siteHeaderGlassMap = document.querySelector("#site-header-glass-map");

const updateSiteHeaderGlassMap = () => {
  if (!siteHeader || !siteHeaderGlassMap) return;
  const { width, height } = siteHeader.getBoundingClientRect();
  const edge = Math.min(width, height) * 0.035;
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect width="${width}" height="${height}" fill="black"/><rect width="${width}" height="${height}" rx="999" fill="url(#r)"/><rect width="${width}" height="${height}" rx="999" fill="url(#b)" style="mix-blend-mode:difference"/><rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="999" fill="hsl(0 0% 50% / .93)" style="filter:blur(11px)"/></svg>`;
  siteHeaderGlassMap.setAttribute("href", `data:image/svg+xml,${encodeURIComponent(svg)}`);
};

if (siteHeader && "ResizeObserver" in window) {
  const headerResizeObserver = new ResizeObserver(updateSiteHeaderGlassMap);
  headerResizeObserver.observe(siteHeader);
  updateSiteHeaderGlassMap();
}

const locationTrigger = document.querySelector("[data-location-trigger]");
locationTrigger?.addEventListener("click", () => {
  document.body.classList.add("world-opened");
  lenis.scrollTo("#world", { offset: 0, duration: 1.35 });
});

if (window.ScrollTrigger) {
  ScrollTrigger.create({
    trigger: "#world",
    start: "top 72%",
    end: "bottom 20%",
    onEnter: () => document.body.classList.add("world-opened"),
    onEnterBack: () => document.body.classList.add("world-opened"),
    onLeaveBack: () => document.body.classList.remove("world-opened"),
    onLeave: () => document.body.classList.remove("world-opened"),
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.25 });
  });
});

const redirectIfMissing = (target) => {
  const resolved = target.startsWith("/") ? `${window.location.origin}${target}` : target;
  fetch(resolved, { method: "HEAD" }).catch(() => { window.location.href = "404.html"; });
};
document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (!anchor) return;
  const href = anchor.getAttribute("href");
  if (href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("#")) return;
  if (href.endsWith(".html")) redirectIfMissing(href);
});
