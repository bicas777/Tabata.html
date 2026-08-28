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
    "contact-card.button": "FALE COMIGO",
    "contact-card.eyebrow": "ESCOLHA UM CANAL",
    "contact-card.title": "Como falar comigo.",
    "contact-card.email.label": "E-MAIL",
    "contact-card.instagram.label": "INSTAGRAM",
    "contact-card.linkedin.label": "LINKEDIN",
    "contact-card.linkedin.handle": "in/enzo-bicalho",
    "contact-card.whatsapp.label": "WHATSAPP",
    "contact-card.whatsapp.handle": "+55 31 98380-8351",
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
    "contact-card.button": "GET IN TOUCH",
    "contact-card.eyebrow": "PICK A CHANNEL",
    "contact-card.title": "How to reach me.",
    "contact-card.email.label": "E-MAIL",
    "contact-card.instagram.label": "INSTAGRAM",
    "contact-card.linkedin.label": "LINKEDIN",
    "contact-card.linkedin.handle": "in/enzo-bicalho",
    "contact-card.whatsapp.label": "WHATSAPP",
    "contact-card.whatsapp.handle": "+55 31 98380-8351",
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

// Card de contato: abre/fecha um modal com os canais de contato.
const contactCard = document.querySelector("#contact-card");
const contactCardOverlay = document.querySelector("#contact-card-overlay");
const openContactCardBtn = document.querySelector("#open-contact-card");
const closeContactCardBtn = document.querySelector("#close-contact-card");
let lastFocusedBeforeCard = null;

const openContactCard = () => {
  if (!contactCard) return;
  lastFocusedBeforeCard = document.activeElement;
  contactCard.setAttribute("aria-hidden", "false");
  contactCardOverlay?.classList.add("is-open");
  contactCard.classList.add("is-open");
  document.body.classList.add("contact-card-open");
  closeSiteMenu();
  closeContactCardBtn?.focus();
};

const closeContactCard = () => {
  if (!contactCard || !contactCard.classList.contains("is-open")) return;
  contactCard.setAttribute("aria-hidden", "true");
  contactCardOverlay?.classList.remove("is-open");
  contactCard.classList.remove("is-open");
  document.body.classList.remove("contact-card-open");
  openContactCardBtn?.focus();
  lastFocusedBeforeCard?.focus?.();
};

openContactCardBtn?.addEventListener("click", openContactCard);
closeContactCardBtn?.addEventListener("click", closeContactCard);
contactCardOverlay?.addEventListener("click", closeContactCard);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeContactCard();
  if (event.key === "Tab" && contactCard?.classList.contains("is-open")) {
    const focusable = contactCard.querySelectorAll('a[href], button:not([disabled])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const contactTitle = document.querySelector(".contact__title");
let contactTitleAnimation;
let contactTitleObserver = null;
const buildContactTitleLetters = () => {
  if (!contactTitle) return [];
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
        letter.textContent = character === " " ? " " : character;
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

  return contactTitle.querySelectorAll(".contact__letter");
};

const animateContactTitle = () => {
  if (!contactTitle || reduceMotion) return;
  contactTitleAnimation?.kill();
  contactTitleAnimation = null;
  if (contactTitleObserver) {
    contactTitleObserver.disconnect();
    contactTitleObserver = null;
  }

  const letters = buildContactTitleLetters();
  // Estado inicial BEM mais forte: letras subindo de baixo, com blur alto,
  // rota\u00e7\u00e3o e leve escala \u2014 reveladas por visibilidade (IntersectionObserver),
  // igual ao mecanismo anterior que funcionava, s\u00f3 com estilo mais dram\u00e1tico.
  gsap.set(letters, {
    yPercent: 160,
    opacity: 0,
    rotate: 12,
    scale: 1.25,
    filter: "blur(12px)",
  });

  contactTitleObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        contactTitleAnimation = gsap.to(letters, {
          yPercent: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.07,
          duration: 1.1,
          ease: "power3.out",
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  contactTitleObserver.observe(contactTitle);
};
animateContactTitle();
document.addEventListener("portfolio-language-change", animateContactTitle);

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
      "CONTATO": { pt: "CONTATO", en: "CONTACT" },
      "FECHAR": { pt: "FECHAR", en: "CLOSE" },
      WHATSAPP: { pt: "WHATSAPP", en: "WHATSAPP" },
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
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    customCursor.style.left = cursorX + "px";
    customCursor.style.top = cursorY + "px";
    const velocityX = cursorX - previousPointer.x;
    const velocityY = cursorY - previousPointer.y;
    const velocity = Math.min(Math.hypot(velocityX, velocityY), 32);
    customCursor.classList.add("is-visible");
    tiltCursor(Math.max(-16, Math.min(16, velocityX * 0.45)));
    squashCursorX(1 + velocity * 0.004);
    squashCursorY(1 - velocity * 0.0025);
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

// Intro rica do hero (timeline encadeada)
if (!reduceMotion) {
  const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
  heroTl
    .from(".hero__topline", { opacity: 0, y: -18, duration: 0.8 })
    .from(".hero__title span", { yPercent: 110, duration: 1.1, stagger: 0.12, ease: "power4.out" }, "-=0.4")
    .from(".hero__small", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
    .from(".hero__manifesto", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
    .from(".hero__number", { opacity: 0, x: -16, duration: 0.7 }, "-=0.6")
    .from(".round-link", { opacity: 0, scale: 0.8, duration: 0.7, ease: "back.out(1.6)" }, "-=0.5");
} else {
  gsap.set(heroItems, { opacity: 1 });
}

if (!reduceMotion) {
  document.querySelectorAll("[data-speed]").forEach((layer) => {
    gsap.to(layer, { yPercent: Number(layer.dataset.speed) * -100, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
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

  // A seção Serviços é revelada por visibilidade (IntersectionObserver) no
  // bloco dedicado abaixo — onView(...) em volta de .service / .service-list.
  // Removido o ScrollTrigger antigo que conflitava com esse reveal e não
  // disparava de forma confiável por causa do pin da seção de Projetos.
  gsap.to(".contact__sky", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.to(".earth-stage", { yPercent: -5, ease: "none", scrollTrigger: { trigger: ".world", start: "top bottom", end: "bottom top", scrub: 1.4 } });

  // Reveals de World/Contact baseados em visibilidade (sobrevivem ao pin de Projetos)
  const worldInfo = document.querySelector(".world__info");
  if (worldInfo) {
    const infoLines = worldInfo.querySelectorAll(".world__info-line, .world__info-links a");
    gsap.set(worldInfo, { y: 45, opacity: 0 });
    gsap.set(infoLines, { x: 28, opacity: 0 });
    onView(worldInfo, () => {
      gsap.to(worldInfo, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      gsap.to(infoLines, { x: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out" });
    }, { threshold: 0.2 });
  }
  const earthStage = document.querySelector(".earth-stage");
  if (earthStage) {
    const earthBits = earthStage.querySelectorAll(".earth-stage__status, .earth-stage__hint, .earth-stage__pointer");
    gsap.set(earthBits, { y: 18, opacity: 0 });
    onView(earthStage, () => {
      gsap.to(earthBits, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "back.out(1.5)" });
    }, { threshold: 0.2 });
  }

  // Lazy-load do globo 3D (three.js + globe.js): só importa quando a seção
  // #world chega perto da viewport. Evita ~600KB de JS no carregamento inicial.
  const worldSection = document.querySelector("#world");
  if (worldSection && "IntersectionObserver" in window) {
    let globeLoaded = false;
    const globeObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !globeLoaded) {
          globeLoaded = true;
          import("./globe.js?v=20260819-10").catch(() => {});
          obs.disconnect();
        }
      });
    }, { rootMargin: "600px 0px" });
    globeObserver.observe(worldSection);
  } else if (worldSection) {
    import("./globe.js?v=20260819-10").catch(() => {});
  }
}

window.addEventListener("pointermove", (event) => {
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

/* ============================================================
   Camada de interações ricas — GSAP
   Tudo respeita reduceMotion; efeitos pointer só em fine pointer.
   ============================================================ */

// Helper: divide o texto de um elemento em <span> por palavra (preserva <br>/<em>)
function splitWords(el) {
  if (!el || el.dataset.split === "done") return el.querySelectorAll(".word");
  const nodes = [...el.childNodes];
  el.textContent = "";
  const words = [];
  const flush = (text) => {
    text.split(/(\s+)/).forEach((chunk) => {
      if (chunk.trim() === "") {
        el.appendChild(document.createTextNode(chunk));
        return;
      }
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = chunk;
      el.appendChild(span);
      words.push(span);
    });
  };
  nodes.forEach((node) => {
    if (node.nodeName === "BR") {
      el.appendChild(document.createElement("br"));
    } else if (node.nodeType === Node.TEXT_NODE) {
      flush(node.textContent);
    } else {
      // elemento (ex: <em>) — divide o texto interno mantendo a tag
      const span = document.createElement("span");
      span.className = "word";
      span.style.display = "inline-block";
      const inner = document.createElement(node.nodeName.toLowerCase());
      inner.innerHTML = node.innerHTML;
      span.appendChild(inner);
      el.appendChild(span);
      words.push(span);
    }
  });
  el.dataset.split = "done";
  return words;
}

// Helper: dispara o callback quando o elemento fica visível (baseado em
// IntersectionObserver, NÃO em ScrollTrigger) — sobrevive ao pin de seções.
function onView(el, cb, opts = {}) {
  if (!el || reduceMotion) {
    if (el && reduceMotion) cb();
    return;
  }
  if (!("IntersectionObserver" in window)) { cb(); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cb();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: opts.threshold ?? 0.2, rootMargin: opts.rootMargin ?? "0px 0px -10% 0px" });
  io.observe(el);
}

// Helper: reveal de texto palavra-por-palavra com blur e rotação do container,
// ligado ao scroll (scrub). Inspirado no padrão ScrollReveal (React) que o usuário
// pediu: baseOpacity, baseRotation, blurStrength e os "ends" são reguláveis.
// Respeita reduceMotion (mostra tudo sem animar) e só ativa em fine pointer/scroll.
// Retorna um array de ScrollTriggers criados, para limpeza se necessário.
function scrollReveal(el, opts = {}) {
  if (!el) return [];
  const {
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    baseScale = 1,
    rotationEnd = "bottom bottom",
    wordEnd = "bottom bottom",
    start = "top bottom",
    trigger = el,
    rotateOrigin = "0% 50%",
  } = opts;

  if (reduceMotion) {
    const words = splitWords(el);
    gsap.set(words, { opacity: 1, filter: "blur(0px)" });
    gsap.set(el, { rotate: 0, scale: 1 });
    return [];
  }

  // Garante que o texto já está dividido em palavras (preserva <br>/<em>).
  const words = splitWords(el);
  const triggers = [];

  // 1) Rotação + escala do container conforme entra na viewport.
  const rotTween = gsap.fromTo(el,
    { transformOrigin: rotateOrigin, rotate: baseRotation, scale: baseScale },
    {
      ease: "none", rotate: 0, scale: 1,
      scrollTrigger: { trigger, start, end: rotationEnd, scrub: true },
    }
  );
  if (rotTween.scrollTrigger) triggers.push(rotTween.scrollTrigger);

  // 2) Cada palavra sobe de opacity (e blur) conforme rola — efeito "revela ao passar".
  const wordTween = gsap.fromTo(words,
    { opacity: baseOpacity, willChange: "opacity" },
    {
      ease: "none", opacity: 1, stagger: 0.05,
      scrollTrigger: { trigger, start: "top bottom-=20%", end: wordEnd, scrub: true },
    }
  );
  if (wordTween.scrollTrigger) triggers.push(wordTween.scrollTrigger);

  // 3) Blur regulável (opcional) — só se pedido.
  if (enableBlur) {
    const blurTween = gsap.fromTo(words,
      { filter: `blur(${blurStrength}px)`, willChange: "filter" },
      {
        ease: "none", filter: "blur(0px)", stagger: 0.05,
        scrollTrigger: { trigger, start: "top bottom-=20%", end: wordEnd, scrub: true },
      }
    );
    if (blurTween.scrollTrigger) triggers.push(blurTween.scrollTrigger);
  }

  return triggers;
}

// --- Barra de progresso de scroll (topo fixo) ---
(function () {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);
  if (!reduceMotion) {
    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  } else {
    bar.style.transform = "scaleX(1)";
  }
})();

// --- Header: esconde ao descer, mostra ao subir ---
(function () {
  const header = document.querySelector(".site-header");
  if (!header || reduceMotion) return;
  let lastY = 0;
  let hidden = false;
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      const goingDown = y > lastY;
      if (y > 120 && goingDown && !hidden) {
        hidden = true;
        gsap.to(header, { yPercent: -130, duration: 0.45, ease: "power3.out" });
      } else if ((!goingDown || y < 120) && hidden) {
        hidden = false;
        gsap.to(header, { yPercent: 0, duration: 0.45, ease: "power3.out" });
      }
      lastY = y;
    },
  });
})();

// --- Reveal dos labels de seção (o "( 01 )") — por visibilidade ---
if (!reduceMotion) {
  gsap.utils.toArray(".section-label").forEach((label) => {
    gsap.set(label, { opacity: 0, x: -24 });
    onView(label, () => gsap.to(label, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: "power3.out",
    }), { threshold: 0.5 });
  });
}

// --- About: parágrafo + link + órbitas entram com stagger (por visibilidade) ---
if (!reduceMotion) {
  const aboutContent = document.querySelector(".about__content");
  if (aboutContent) {
    gsap.set(aboutContent.children, { opacity: 0, y: 34 });
    onView(aboutContent, () => gsap.to(aboutContent.children, {
      opacity: 1,
      y: 0,
      stagger: 0.14,
      duration: 0.9,
      ease: "power3.out",
    }), { threshold: 0.2 });
  }
  const aboutOrbits = document.querySelector(".about__orbits");
  if (aboutOrbits) {
    gsap.set(aboutOrbits, { opacity: 0, scale: 0.7, rotate: -40 });
    onView(aboutOrbits, () => gsap.to(aboutOrbits, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.4,
      ease: "power3.out",
    }), { threshold: 0.2 });
  }
}

// --- Services: reveal rico por palavra + glow de borda no hover + tilt ---
(function () {
  const services = document.querySelectorAll(".service");
  if (!services.length) return;

  if (!reduceMotion) {
    // Título da seção: reveal palavra-por-palavra com blur/rotação (scrub)
    const introTitle = document.querySelector(".services__intro h2");
    if (introTitle) scrollReveal(introTitle, { baseRotation: 4, blurStrength: 4, wordEnd: "bottom 75%" });
    // Texto de corpo da seção (igual About: sobe com stagger)
    const introCopy = document.querySelector(".services__intro p");
    if (introCopy) {
      gsap.set(introCopy, { opacity: 0, y: 34 });
      onView(introCopy, () => gsap.to(introCopy, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }), { threshold: 0.3 });
    }
    // Container da lista (sobe conforme fica visível) — baseado em visibilidade,
    // não em ScrollTrigger (sobrevive ao pin da seção de Projetos).
    const serviceList = document.querySelector(".service-list");
    if (serviceList) {
      gsap.set(serviceList, { opacity: 0, y: -20 });
      onView(serviceList, () => gsap.to(serviceList, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
      }), { threshold: 0.2 });
    }
    // Cada serviço: efeito criativo "flip de carta" (vira da esquerda em perspectiva)
    services.forEach((service) => {
      gsap.set(service, { rotationY: -92, opacity: 0, transformPerspective: 900, transformOrigin: "left center" });
      onView(service, () => {
        gsap.to(service,
          { rotationY: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
        // Título e copy revelam por palavra com sweep (efeito "estica da esquerda")
        const h3 = service.querySelector(".service__body h3");
        const copy = service.querySelector(".service__body p");
        const cols = [h3, copy].filter(Boolean).map(splitWords).flat();
        gsap.set(cols, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
        gsap.to(cols, {
          scaleX: 1, opacity: 1, stagger: 0.02, duration: 0.6, ease: "power2.out",
        });
        const tags = service.querySelector(".service__tags")?.children || [];
        gsap.set(tags, { opacity: 0, scale: 0.6, y: 10 });
        gsap.to(tags, {
          opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "back.out(2)",
        });
      }, { threshold: 0.25 });
    });
  }

  if (finePointer.matches && !reduceMotion) {
    services.forEach((service) => {
      const xTo = gsap.quickTo(service, "x", { duration: 0.5, ease: "power3.out" });
      service.addEventListener("pointermove", (e) => {
        const b = service.getBoundingClientRect();
        xTo((e.clientX - (b.left + b.width / 2)) * 0.04);
      });
      service.addEventListener("pointerleave", () => gsap.to(service, { x: 0, duration: 0.6, ease: "elastic.out(1, .5)" }));
    });
  }
  if (!reduceMotion) {
    services.forEach((service) => {
      service.addEventListener("pointerenter", () => {
        gsap.to(service, { backgroundColor: "rgba(192,214,223,.08)", duration: 0.3 });
        const index = service.querySelector(".service__index");
        if (index) gsap.to(index, { color: "#020202", scale: 1.08, duration: 0.3 });
      });
      service.addEventListener("pointerleave", () => {
        gsap.to(service, { backgroundColor: "rgba(192,214,223,0)", duration: 0.4 });
        const index = service.querySelector(".service__index");
        if (index) gsap.to(index, { color: "rgba(192,214,223,.55)", scale: 1, duration: 0.4 });
      });
    });
  }
})();

// --- Project cards: tilt 3D magnético no hover ---
(function () {
  if (reduceMotion || !finePointer.matches) return;
  const cards = document.querySelectorAll(".project");
  cards.forEach((card) => {
    const inner = card;
    const rotX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
    const rotY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
    card.addEventListener("pointermove", (e) => {
      const b = card.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width - 0.5;
      const py = (e.clientY - b.top) / b.height - 0.5;
      rotY(px * 10);
      rotX(-py * 10);
    });
    card.addEventListener("pointerleave", () => {
      rotX(0);
      rotY(0);
    });
  });
})();

// --- Contact: texto com reveal palavra-por-palavra (scrub) + corpo com stagger ---
if (!reduceMotion) {
  const pretitle = document.querySelector(".contact__pretitle");
  if (pretitle) scrollReveal(pretitle, { baseRotation: 0, blurStrength: 3, wordEnd: "bottom 80%" });
  // Texto de corpo da seção (igual About: sobe com stagger)
  const contactBody = document.querySelector(".contact__cta");
  const footer = document.querySelector(".contact__footer");
  const bodyEls = [contactBody, footer].filter(Boolean);
  if (bodyEls.length) {
    gsap.set(bodyEls, { opacity: 0, y: 34 });
    onView(contactBody, () => gsap.to(bodyEls, {
      opacity: 1, y: 0, stagger: 0.14, duration: 0.9, ease: "power3.out",
    }), { threshold: 0.25 });
  }
  // O glow contínuo é um efeito de loop (não reveal), então fica fora do onView.
  gsap.to(".contact__pretitle", {
    boxShadow: "0 .8rem 2.6rem rgba(2,2,2,.5)",
    duration: 2.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

// --- Reveals universais: marquee (por visibilidade) ---
if (!reduceMotion) {
  const marqueeEl = document.querySelector(".marquee");
  if (marqueeEl) {
    gsap.set(marqueeEl, { opacity: 0, y: 30 });
    onView(marqueeEl, () => gsap.to(marqueeEl, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }), { threshold: 0.2 });
  }
}

// --- Animações extras (todas baseadas em visibilidade real, não em ScrollTrigger) ---
if (!reduceMotion) {
  // Hero glow que segue o mouse
  const hero = document.querySelector(".hero");
  if (hero && finePointer.matches) {
    const glow = document.createElement("div");
    glow.className = "hero__glow";
    hero.insertBefore(glow, hero.firstChild);
    hero.addEventListener("pointermove", (e) => {
      const b = hero.getBoundingClientRect();
      glow.style.setProperty("--gx", `${((e.clientX - b.left) / b.width) * 100}%`);
      glow.style.setProperty("--gy", `${((e.clientY - b.top) / b.height) * 100}%`);
    });
  }

  // World: grid + scanline revelam ao entrar na viewport
  const worldEl = document.querySelector(".world");
  if (worldEl) {
    const worldGrid = document.querySelector(".world__grid");
    const worldScanline = document.querySelector(".world__scanline");
    if (worldGrid) gsap.set(worldGrid, { opacity: 0, scale: 1.08 });
    if (worldScanline) gsap.set(worldScanline, { opacity: 0, y: -30 });
    onView(worldEl, () => {
      if (worldGrid) gsap.to(worldGrid, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" });
      if (worldScanline) gsap.to(worldScanline, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    }, { threshold: 0.15 });
  }

  // About: título revela palavra-por-palavra com blur/rotação (scrub)
  const aboutTitle = document.querySelector(".about h2");
  if (aboutTitle) scrollReveal(aboutTitle, { baseRotation: 4, blurStrength: 4, wordEnd: "bottom 75%" });

  // Projects: título revela palavra-por-palavra com blur/rotação (scrub)
  const projectsTitle = document.querySelector(".projects__intro h2");
  if (projectsTitle) scrollReveal(projectsTitle, { baseRotation: -4, blurStrength: 4, wordEnd: "bottom 75%" });

  // World: título revela palavra-por-palavra com blur/rotação (scrub)
  const worldTitle = document.querySelector(".world__copy h2");
  if (worldTitle) scrollReveal(worldTitle, { baseRotation: 3, blurStrength: 4, wordEnd: "bottom 75%" });

  // World: eyebrow revela por palavra (scrub)
  const worldEyebrow = document.querySelector(".world__eyebrow");
  if (worldEyebrow) scrollReveal(worldEyebrow, { baseRotation: 0, blurStrength: 2, baseOpacity: 0.2, wordEnd: "bottom 80%" });
  const worldCoords = document.querySelectorAll(".world__coordinates strong, .world__coordinates span");
  if (worldCoords.length) {
    gsap.set(worldCoords, { opacity: 0, x: -16 });
    onView(document.querySelector(".world__coordinates"), () => gsap.to(worldCoords, { opacity: 1, x: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }), { threshold: 0.3 });
  }

  // Services: números (01/02/03) escalam no reveal
  document.querySelectorAll(".service__index").forEach((idx) => {
    gsap.set(idx, { scale: 0.4, opacity: 0 });
    onView(idx, () => gsap.to(idx, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }), { threshold: 0.5 });
  });

  // Contact: footer links revelam com brilho
  const contactFooter = document.querySelector(".contact__footer");
  if (contactFooter) {
    const footerLinks = contactFooter.querySelectorAll("a");
    gsap.set(footerLinks, { opacity: 0, y: 14 });
    onView(contactFooter, () => gsap.to(footerLinks, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power3.out" }), { threshold: 0.3 });
  }
}

// --- Hero: leve skew no scroll (parallax extra) ---
if (!reduceMotion) {
  gsap.to(".hero__title", {
    skewY: -1,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
  });
}

