gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const lenis = new Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.1 });

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const translations = {
  pt: {
    "header.status": "DISPONÍVEL PARA PROJETOS",
    "header.contact": "CONTATO",
    "menu.label": "NAVEGAÇÃO",
    "menu.home": "INÍCIO",
    "menu.about": "SOBRE",
    "menu.projects": "PROJETOS",
    "menu.location": "LOCALIZAÇÃO",
    "menu.contact": "CONTATO",
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
    "services.label": "SERVIÇOS &amp; HABILIDADES",
    "services.title": "O que eu <em>entrego.</em>",
    "services.copy": "Do conceito ao deploy — serviços integrados para dar presença e resultado ao seu projeto.",
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
    "header.status": "AVAILABLE FOR PROJECTS",
    "header.contact": "CONTACT",
    "menu.label": "NAVIGATION",
    "menu.home": "HOME",
    "menu.about": "ABOUT",
    "menu.projects": "PROJECTS",
    "menu.location": "LOCATION",
    "menu.contact": "CONTACT",
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
    "services.label": "SERVICES &amp; SKILLS",
    "services.title": "What I <em>deliver.</em>",
    "services.copy": "From concept to launch — integrated services that give presence and results to your project.",
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

const languageToggle = document.querySelector("#language-toggle");
let activeLanguage = safeStorage.get("portfolio-language", "pt");

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

languageToggle?.addEventListener("click", () => {
  applyLanguage(activeLanguage === "pt" ? "en" : "pt");
});
applyLanguage(activeLanguage);

const menuToggle = document.querySelector("#menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const closeSiteMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu de navegação");
  siteMenu?.parentElement.classList.remove("is-menu-open");
};
menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu de navegação" : "Fechar menu de navegação");
  siteMenu?.parentElement.classList.toggle("is-menu-open", !isOpen);
});
document.querySelectorAll("[data-menu-link]").forEach((link) => link.addEventListener("click", closeSiteMenu));

const contactTitle = document.querySelector(".contact__title");
let contactTitleAnimation;
const animateContactTitle = () => {
  if (!contactTitle || reduceMotion) return;
  contactTitleAnimation?.scrollTrigger?.kill();
  contactTitleAnimation?.kill();

  const lines = [];
  let current = document.createDocumentFragment();
  const flushLine = () => {
    if (current.childNodes.length) {
      lines.push(current);
      current = document.createDocumentFragment();
    }
  };
  [...contactTitle.childNodes].forEach((node) => {
    if (node.nodeName === "BR") {
      flushLine();
      return;
    }
    current.appendChild(node);
  });
  flushLine();
  contactTitle.textContent = "";

  const splitIntoLetters = (container) => {
    const textNodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (!node.textContent.trim()) return;
      const letters = document.createDocumentFragment();
      [...node.textContent].forEach((character) => {
        const letter = document.createElement("span");
        letter.className = "contact__letter";
        letter.textContent = character === " " ? "\u00a0" : character;
        letters.appendChild(letter);
      });
      node.replaceWith(letters);
    });
  };

  lines.forEach((fragment) => {
    const line = document.createElement("span");
    line.className = "contact__line";
    line.appendChild(fragment);
    contactTitle.appendChild(line);
    splitIntoLetters(line);
  });

  contactTitleAnimation = gsap.from(contactTitle.querySelectorAll(".contact__letter"), {
    yPercent: 130,
    rotate: 5,
    opacity: 0,
    filter: "blur(8px)",
    stagger: 0.09,
    ease: "power2.out",
    scrollTrigger: { trigger: ".contact", start: "top 92%", end: "top 30%", scrub: 1.5 },
  });
};
animateContactTitle();
document.addEventListener("portfolio-language-change", animateContactTitle);

const glow = document.querySelector(".cursor-glow");

// Project images fade in over the CSS-art fallback once the files exist.
document.querySelectorAll(".project__image").forEach((image) => {
  const reveal = () => image.classList.add("is-loaded");
  if (image.complete && image.naturalWidth > 0) reveal();
  else image.addEventListener("load", reveal);
});

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
  const cursorDot = customCursor.querySelector(".custom-cursor__dot");

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
      gsap.fromTo(cursorDot, { scale: 0.84 }, { scale: 1, duration: 0.48, ease: "elastic.out(1, .45)" });
    });
    target.addEventListener("pointerleave", () => {
      activeCursorTarget = null;
      customCursor.classList.remove("is-hover");
    });
    target.addEventListener("pointerdown", () => {
      gsap.fromTo(cursorDot, { scale: 1 }, { scale: 0.74, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" });
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
  const magneticTargets = document.querySelectorAll(".round-link, .header-contact, .language-toggle, .text-link, .world__info-links a");
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
  gsap.to(".round-link > .glass-surface__content", { y: -3, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".earth-stage__pointer", { x: 5, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".world__grid", { backgroundPosition: "70px 70px", duration: 22, ease: "none", repeat: -1 });
  gsap.to(".earth-stage__reticle", { rotation: 360, duration: 75, ease: "none", repeat: -1 });
  gsap.to(".earth-stage__marker", { scale: 1.16, opacity: 0.72, duration: 1.45, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".world__copy h2 em", { textShadow: "0 0 1.4rem rgba(192,214,223,.32)", duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true });
}

const header = document.querySelector(".site-header");
const heroItems = document.querySelectorAll(".hero > *:not(.cloud-layer)");

if (header) gsap.fromTo(header, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", onComplete: () => gsap.set(header, { clearProps: "transform" }) });
gsap.from(heroItems, { opacity: 0, y: 26, stagger: 0.1, duration: 0.85, ease: "power3.out" });

if (!reduceMotion) {
  document.querySelectorAll("[data-speed]").forEach((layer) => {
    gsap.to(layer, { yPercent: Number(layer.dataset.speed) * -100, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
  });

  gsap.utils.toArray(".about h2, .projects__intro h2").forEach((title) => {
    gsap.from(title, { y: 75, opacity: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: title, start: "top 88%" } });
  });

  const projectListEl = document.querySelector(".project-list");
  const projectItems = gsap.utils.toArray(".project");
  const introEl = document.querySelector(".project-intro");
  if (projectListEl && projectItems.length > 1) {
    let projectPositions = [];
    let projectStack = [];
    const measureProjectPositions = () => {
      projectItems.forEach((p) => gsap.set(p, { clearProps: "x,y,rotation,scale,zIndex,opacity" }));
      const listRect = projectListEl.getBoundingClientRect();
      projectPositions = projectItems.map((p) => {
        const r = p.getBoundingClientRect();
        return { x: r.left - listRect.left, y: r.top - listRect.top };
      });
    };
    const applyProjectStack = () => {
      measureProjectPositions();
      const listRect = projectListEl.getBoundingClientRect();
      const cardWidth = projectItems[0].getBoundingClientRect().width;
      const cardHeight = projectItems[0].getBoundingClientRect().height;
      const stackX = (listRect.width - cardWidth) / 2;
      const stackY = projectPositions[0].y + listRect.height * 0.4;
      projectStack = projectItems.map((p, i) => ({
        x: stackX - projectPositions[i].x,
        y: stackY - projectPositions[i].y,
        rotation: 0,
        scale: 1,
        opacity: 0,
      }));
      projectItems.forEach((p, i) => {
        gsap.set(p, {
          x: projectStack[i].x,
          y: projectStack[i].y,
          rotation: projectStack[i].rotation,
          scale: projectStack[i].scale,
          opacity: projectStack[i].opacity,
          pointerEvents: "none",
          zIndex: projectItems.length - i,
        });
      });
      if (introEl) {
        gsap.set(introEl, {
          left: stackX + cardWidth / 2,
          top: stackY + cardHeight / 2,
          xPercent: -50,
          yPercent: -50,
        });
      }
    };
    applyProjectStack();
    let projectDispersion = null;

    const buildProjectTimeline = () => {
      if (projectDispersion) {
        projectDispersion.scrollTrigger?.kill();
        projectDispersion.kill();
      }
      projectDispersion = gsap.timeline({
        scrollTrigger: {
          trigger: projectListEl,
          start: () => `top ${Math.round(window.innerHeight * 0.45 - projectStack[0].y)}px`,
          end: "+=200%",
          scrub: 1.5,
          pin: ".projects",
        },
      });
      projectItems.forEach((p, i) => {
        const from = projectStack[i];
        const side = i % 2 ? 1 : -1;
        projectDispersion.set(p, {
          x: from.x,
          y: from.y,
          rotation: from.rotation,
          scale: from.scale,
          opacity: from.opacity,
          pointerEvents: "none",
          zIndex: projectItems.length - i,
        }, 0);
        projectDispersion.to(p, {
          keyframes: [
            {
              x: from.x,
              y: from.y,
              rotation: from.rotation,
              scale: from.scale,
              opacity: from.opacity,
              pointerEvents: "none",
              duration: 0.001,
              ease: "none",
            },
            {
              x: from.x * 0.4,
              y: from.y * 0.35 + 130,
              rotation: side * 12,
              scale: 1,
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.5,
              ease: "power2.in",
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              pointerEvents: "auto",
              zIndex: projectItems.length - i,
              duration: 0.4,
              ease: "power3.out",
            },
          ],
          immediateRender: false,
        }, (i * 0.75) / projectItems.length);
      });

      if (introEl) {
        projectDispersion.to(introEl, {
          opacity: 0,
          scale: 0.88,
          duration: 0.18,
          ease: "power2.out",
        }, 0);
      }
    };
    buildProjectTimeline();

    const refreshProjectLayout = () => {
      applyProjectStack();
      buildProjectTimeline();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshProjectLayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshProjectLayout);
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshProjectLayout, 200);
    });
  }

  gsap.from(".services__intro, .service-list", { y: 48, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".services__intro", start: "top 88%" } });
  gsap.to(".contact__sky", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.from(".world__copy, .world__info", { y: 45, opacity: 0, stagger: 0.16, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".world", start: "top 76%" } });
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

const redirectIfMissing = async (target) => {
  try {
    const resolved = new URL(target, window.location.href);
    const response = await fetch(resolved, { method: "GET" });
    if (!response.ok) window.location.href = new URL("404.html", window.location.href).href;
  } catch {
    window.location.href = new URL("404.html", window.location.href).href;
  }
};
document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (!anchor) return;
  const href = anchor.getAttribute("href");
  if (href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("#")) return;
  if (href.endsWith(".html")) redirectIfMissing(href);
});

const marqueeTrack = document.querySelector(".marquee__track");
if (marqueeTrack && !reduceMotion) {
  const marqueeCopy = marqueeTrack.querySelector("p");
  let marqueeDistance = 0;
  let marqueeTween = null;
  let marqueeObserver = null;

  const startMarquee = () => {
    marqueeDistance = marqueeCopy ? marqueeCopy.offsetWidth : 0;
    if (!marqueeDistance) return;
    if (marqueeTween) {
      marqueeTween.duration(26).progress(0);
      gsap.set(marqueeTrack, { x: 0 });
      return;
    }
    marqueeTween = gsap.to(marqueeTrack, {
      x: -marqueeDistance,
      duration: 26,
      ease: "none",
      repeat: -1,
      paused: true,
    });
    if ("IntersectionObserver" in window) {
      marqueeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) marqueeTween.play();
          else marqueeTween.pause();
        });
      }, { threshold: 0.05 });
      marqueeObserver.observe(marqueeTrack);
    } else {
      marqueeTween.play();
    }
  };

  startMarquee();
  window.addEventListener("load", startMarquee);

  let marqueeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(marqueeTimer);
    marqueeTimer = setTimeout(startMarquee, 200);
  });
}
