const btn = document.querySelector(".button");

btn.addEventListener("click", () => {

  setTimeout(() => {
    blobs.forEach(blob => blob.classList.add("actived"));
    document.body.classList.add("anim2");
    btn.classList.add("anim2");

    setTimeout(() => {
      document.body.classList.add("anim3");

      setTimeout(() => {
        document.body.classList.add("show-welcome");
      }, 200);

    }, 1450);

  }, 1);
});

const blobs = document.querySelectorAll(".blob");

btn.addEventListener("mouseenter", () => {
  blobs.forEach(blob => blob.classList.add("hovered"));

btn.addEventListener("mouseleave", () => {
  blobs.forEach(blob => blob.classList.remove("hovered"));
});
});

const welcomeText = document.querySelector(".welcome-text");
const site = document.querySelector(".site-content");

const texto = document.querySelector(".texto");
const textoInner = document.querySelector(".texto-inner");
const superior = document.querySelectorAll(".cta, .relogio, .popup, .popup2");
const eu = document.querySelector(".me");


welcomeText.addEventListener("animationend", (e) => {
  if (e.animationName === "welcomeHide") {
    site.style.opacity = "1";
    site.style.pointerEvents = "auto";
    document.body.classList.remove("show-welcome");
    document.body.classList.add("show-site");
    site.classList.add("show-background");
    superior.forEach(el => el.classList.add("show"));
    textoInner.classList.add("show");
    eu.classList.add("show");
  }
});

const tlTexto = gsap.timeline();

tlTexto.fromTo(
  texto,
  { yPercent: 130 },
  {
    yPercent: 0,
    duration: 1.6,
    ease: "power4.out",
    onComplete: () => texto.classList.add("active")
  }
);

tlTexto.to(texto, {
  y: -120,
  ease: "none",
  scrollTrigger: {
    trigger: ".site-content",
    scroller: document.body,
    start: "top top",
    end: "top+=400 top",
    scrub: true,
  }
});

  const cursor = document.querySelector('.custom-cursor');
  const cursorText = document.querySelector('.cursor-text');

  let cursorTimeout;

let cursorScale = 1;
const clickScale = 0.6;

document.addEventListener("mousedown", () => {
  cursor.style.transform = `translate(-50%, -50%) scale(${clickScale})`;
});

document.addEventListener("mouseup", () => {
  cursor.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;
});

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

btn.addEventListener('mouseenter', () => {
  if(cursorTimeout) clearTimeout(cursorTimeout);

  const theme = document.documentElement.getAttribute("data-theme");

  cursor.style.mixBlendMode = "normal";
  cursor.style.width = '90px';
  cursor.style.height = '42px';
  cursor.style.transform = 'translate(-50%, -50%) scale(1.65)';

  // 🎨 muda visual dependendo do tema
  if (theme === "minecraft") {
    cursor.style.background = "#55ff55";
    cursor.style.borderRadius = "0px";
    cursor.style.fontFamily = "Minecraft";
    cursor.style.boxShadow = "0 -4px rgb(0 0 0 / 50%) inset, 0 4px rgb(255 255 255 / 20%) inset, -4px 0 rgb(255 255 255 / 20%) inset, 4px 0 rgb(0 0 0 / 50%) inset";
  } 
  else if (theme === "Galaxy") {
    cursor.style.background = "#ff00ff";
    cursor.style.borderRadius = "6px";
    cursor.style.fontFamily = "Cormorant Garamond";
  } 
  else { // default
    cursor.style.background = "#0044ffff";
    cursor.style.borderRadius = "100px";
    cursor.style.fontFamily = "Clash Display";
  }

  cursorText.classList.add('pass');
});

btn.addEventListener('mouseleave', () => {
  if (cursorTimeout) clearTimeout(cursorTimeout);

  const theme = document.documentElement.getAttribute("data-theme");

  cursor.style.mixBlendMode = "";
  cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
  cursor.style.width = '70px';
  cursor.style.height = '22px';
  cursor.style.boxShadow = 'none';

  cursorTimeout = setTimeout(() => {

    // 👇 comportamento final por tema
    if (theme === "minecraft") {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderRadius = '0px';
      cursor.style.background = '#ffffff'
    } 
    else if (theme === "Galaxy") {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderRadius = '6px';
      cursor.style.background = '#ffffff'
    } 
    else {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderRadius = '50%';
      cursor.style.background = '#ffffff'
    }

    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorText.classList.remove('pass');

  }, 260);
});

function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();

const menuToggle = document.querySelector(".popup input");

const translations = {
  en: {
    contato: {
      default: "Contact-me",
      minecraft: "CONT=CT-ME"
    },
    welcome: "Hello!",
    iniciar: {
      default: "Enter",
      minecraft: "ENTER"
    },
        acesso: {
      default: "ACCESS",
      minecraft: "ACCESS"
    },
        textoinner: {
      default: "ENZO BICALHO",
      minecraft: "ENZO BIC=LHO"
    },
    PT: "Portuguese (Default)",
    EN: "English",
    ES: "Spanish",
    skill: "SKILLS:",
    Skill: "ABOUT ME",
    Sobre: `
       I am a <span class="profissao">programmer</span> and <span class="profissao">graphic designer</span>, 15 years old, and I like to combine <span class="criatividade">creativity</span> with <span class="ferramenta">tools</span>, creating <span class="websites">unique and responsive websites</span>.
    `,
    contata:"LETS TALK!",
    idiomaLGND: "This website keep your language!",
    temaLGND: "Choose your favourite theme!",
    TEMA1: "Default",
    TEMA2: "Minecraft",
    TEMA3: "Galaxy",
    Brasil: "Brazil",
    Explorer: "Windows Explorer",
    Windows: "Start",
    Chrome: "Google Chrome",
    StartP: "Search for apps",
    Fixado: "Fixed",
    Pesquise: "Search",
    computador: "This computer",
    computador2: "🖥️ This computer",
    ChatTexto: {
      default: "Talk with Bot",
      minecraft: "T=LK WITH BOT",
    },
    Chatcomenzo: {
      default: "Chat with EnzoBot",
      minecraft: "CH=T WITH ENZOBOT"
    }
  },

  pt: {
    contato: {
      default: "Contate-me",
      minecraft: "CONT=TE-ME"
    },
    welcome: "Olá!",
    iniciar: {
      default: "Entrar",
      minecraft: "ENTR=R"
    },
    acesso: {
      default: "ACESSAR",
      minecraft: "ACESS=R"
    },
    textoinner: {
      default: "ENZO BICALHO",
      minecraft: "ENZO BIC=LHO"
    },
    PT: "Português (Padrão)",
    EN: "Inglês",
    ES: "Espanhol",
    skill: "HABILIDADES:",
    Skill: "SOBRE MIM",
    Sobre: `
Sou <span class="profissao">programador</span> e <span class="profissao">designer gráfico</span>, tenho 15 anos e gosto de juntar <span class="criatividade">criatividade</span> com <span class="ferramenta">programas</span>, criando <span class="websites">websites únicos e responsivos</span>.
    `,
    contata:"VAMOS CONVERSAR!",
    idiomaLGND: "Este site mantém o idioma!",
    temaLGND: "Escolha seu tema preferido!",
    TEMA1: "Padrão",
    TEMA2: "Minecraft",
    TEMA3: "Galaxia",
    Brasil: "Brasil",
    Explorer: "Explorador de Arquivos",
    Windows: "Iniciar",
    Chrome: "Google Chrome",
    StartP: "Pesquisar por aplicativos",
    Fixado: "Fixado",
    Pesquise: "Pesquise",
    computador: "Este Computador",
    computador2: "🖥️ Este computador",
    ChatTexto: {
      default: "Conversar com Bot",
      minecraft: "CONVERS=R COM BOT",
    },
    Chatcomenzo: {
      default: "Chat com EnzoBot",
      minecraft: "CH=T COM ENZOBOT"
    }
  },

  es: {
  contato: "Contáctame",
    contato: {
      default: "Contáctame",
      minecraft: "CONTÁCT=ME"
    },
  welcome: "¡Hola!",
    iniciar: {
      default: "Entrar",
      minecraft: "ENTR=R"
    },
        acesso: {
      default: "ACCEDER",
      minecraft: "=CCEDER"
    },
      textoinner: {
      default: "ENZO BICALHO",
      minecraft: "ENZO BIC=LHO"
    },
  PT: "Portugués (Predeterminado)",
  EN: "Inglés",
  ES: "Español",
  skill: "HABILIDADES:",
  Skill: "SOBRE MI",
  Sobre: `
    Soy <span class="profissao">programador</span> y <span class="profissao">diseñador gráfico</span>, tengo 15 años y me gusta combinar <span class="criatividade">creatividad</span> con <span class="ferramenta">herramientas</span>, creando <span class="websites">websites únicos y responsivos</span>.
  `,
  contata: "¡HABLEMOS!",
  idiomaLGND: "¡Este sitio mantiene tu idioma!",
  temaLGND: "¡Elige tu tema preferido!",
  TEMA1: "Predeterminado",
  TEMA2: "Minecraft",
  TEMA3: "Galaxia",
  Brasil: "Brasil",
  Explorer: "Explorador de Archivos",
  Windows: "Inicio",
  Chrome: "Google Chrome",
  StartP: "Buscar aplicaciones",
  Fixado: "Fijado",
  Pesquise: "Buscar",
  computador: "Esta Computadora",
  computador2: "🖥️ Esta Computadora",
  ChatTexto: {
    default: "Conversar con el Bot",
    minecraft: "CONVERS=R CON EL BOT",
    },
  Chatcomenzo: {
    default: "Chat con EnzoBot",
    minecraft: "CH=T CON ENZOBOT"
    }
}
};

function setLanguage(lang){
  const elements = document.querySelectorAll("[data-i18n]");
  const theme = document.documentElement.getAttribute("data-theme") || "default";

  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = translations[lang][key];

    if (!value) return;

    if (typeof value === "object") {
      el.innerHTML = value[theme] || value.default;
    } else {
      el.innerHTML = value;
    }
  });

  localStorage.setItem("lang", lang);
}

document.getElementById("EN").addEventListener("click", () => {
  setLanguage("en");
  menuToggle.checked = false;
});

document.getElementById("PT").addEventListener("click", () => {
  setLanguage("pt");
  menuToggle.checked = false;
});

document.getElementById("ES").addEventListener("click", () => {
  setLanguage("es");
  menuToggle.checked = false; // se quiser fechar o menu
});

const sectionMe = document.querySelector('.me > .flex');
const cursorText2 = document.querySelector('.cursor-texto');
const skillDiv = document.getElementById('skill');
const contatoBtn = document.querySelector('.contato');
const contatoDiv = document.getElementById('contata');
const skillsPanel = document.querySelector('.fileexplorertxt');

let cursorAction = null;

sectionMe.addEventListener('mouseenter', () => {
  cursorAction = "skills";
  if (cursorTimeout) clearTimeout(cursorTimeout);

  const theme = document.documentElement.getAttribute("data-theme");

  cursor.style.mixBlendMode = "normal";
  cursor.style.width = '150px';
  cursor.style.height = '42px';
  cursor.style.borderRadius = '20px';
  cursor.style.transform = 'translate(-50%, -50%) scale(1.95)';

  // 🎨 visual inicial por tema
  if (theme === "minecraft") {
    cursor.style.background = "#000000";
    cursor.style.borderRadius = "0px";
    cursor.style.fontFamily = "Minecraft";
  } 
  else if (theme === "Galaxy") {
    cursor.style.background = "#ff00ff";
    cursor.style.borderRadius = "8px";
    cursor.style.fontFamily = "Orbitrion";
  } 
  else {
    cursor.style.background = "#000000ff";
    cursor.style.fontFamily = "Clash Display";
  }

  cursorText2.innerHTML = skillDiv.innerHTML;
  cursorText2.classList.add('pass2');

  cursorTimeout = setTimeout(() => {

    // 🔥 ajuste final por tema
    if (theme === "minecraft") {
      cursor.style.width = '140px';
      cursor.style.height = '32px';
      cursor.style.borderRadius = "0px";
      cursor.style.fontFamily = "Minecraft";
    } 
    else if (theme === "Galaxy") {
      cursor.style.width = '135px';
      cursor.style.height = '30px';
      cursor.style.borderRadius = "8px";
      cursor.style.fontFamily = "Orbitrion";
    } 
    else {
      cursor.style.width = '130px';
      cursor.style.height = '30px';
      cursor.style.fontFamily = "Clash Display";
    }

    cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';

  }, 180);
});

sectionMe.addEventListener('mouseleave', () => {
  cursorAction = null;
  if (cursorTimeout) clearTimeout(cursorTimeout);

  const theme = document.documentElement.getAttribute("data-theme");

  cursor.style.mixBlendMode = "";
  cursor.style.transform = 'translate(-50%, -50%) scale(1.95)';
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursorText2.classList.remove('pass2');

  // 🎨 estado imediato por tema
  if (theme === "minecraft") {
    cursor.style.borderRadius = '0px';
    cursor.style.background = '#ffffff';
  } 
  else if (theme === "Galaxy") {
    cursor.style.borderRadius = '8px';
    cursor.style.background = '#ffffff';
  } 
  else {
    cursor.style.borderRadius = '50%';
    cursor.style.background = '#ffffff';
  }

  cursorTimeout = setTimeout(() => {

    // 🎯 estado final por tema
    if (theme === "minecraft") {
      cursor.style.borderRadius = '0px';
      cursor.style.background = '#ffffff';
    } 
    else if (theme === "Galaxy") {
      cursor.style.borderRadius = '8px';
      cursor.style.background = '#ffffff';
    } 
    else {
      cursor.style.borderRadius = '50%';
      cursor.style.background = '#ffffff';
    }

    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';

  }, 260);
});

document.addEventListener("click", () => {
  if (cursorAction === "skills") {
    skillsPanel.classList.toggle("show");
  } else {
    skillsPanel.classList.remove("show");
  }
});

contatoBtn.addEventListener('mouseenter', () => {
  cursorAction = null;
  if (cursorTimeout) clearTimeout(cursorTimeout);

  const theme = document.documentElement.getAttribute("data-theme");

  cursor.style.mixBlendMode = "normal";
  cursor.style.width = '115px';
  cursor.style.height = '30px';
  cursor.style.transform = 'translate(-50%, -50%) scale(1.0)';
  cursor.style.borderRadius = '40px';

  if (theme === "minecraft") {
    cursor.style.background = "#55ff55";
    cursor.style.borderRadius = "0px";
  } 
  else if (theme === "Galaxy") {
    cursor.style.background = "#ff00ff";
    cursor.style.borderRadius = "8px";
  } 
  else {
    cursor.style.background = "#66ff66";
  }

  cursorText2.innerHTML = contatoDiv.innerHTML;
  cursorText2.classList.add('pass2');

  cursorTimeout = setTimeout(() => {

    if (theme === "minecraft") {
      cursor.style.background = "#66ff66";
      cursor.style.width = '145px';
      cursor.style.height = '30px';
      cursor.style.borderRadius = "0px";
    } 
    else if (theme === "Galaxy") {
      cursor.style.background = "#66ff66";
      cursor.style.width = '145px';
      cursor.style.height = '30px';
      cursor.style.borderRadius = "8px";
    } 
    else {
      cursor.style.background = "#66ff66";
      cursor.style.width = '145px';
      cursor.style.height = '30px';
      cursor.style.borderRadius = '40px';
    }

    cursor.style.transform = 'translate(-50%, -50%) scale(1.4)';

  }, 180);
});

contatoBtn.addEventListener('mouseleave', () => {
  cursorAction = null;
  if (cursorTimeout) clearTimeout(cursorTimeout);

  const theme = document.documentElement.getAttribute("data-theme");

  cursor.style.mixBlendMode = "";
  cursor.style.width = '20px';
  cursor.style.height = '20px';
  cursor.style.transform = 'translate(-50%, -50%) scale(1.0)';
  cursorText2.classList.remove('pass2');

  // 🎨 estado imediato por tema
  if (theme === "minecraft") {
    cursor.style.background = "white";
    cursor.style.borderRadius = "0px";
  } 
  else if (theme === "Galaxy") {
    cursor.style.background = "white";
    cursor.style.borderRadius = "8px";
  } 
  else {
    cursor.style.background = "white";
    cursor.style.borderRadius = "50%";
  }

  cursorTimeout = setTimeout(() => {

    // 🎯 estado final por tema
    if (theme === "minecraft") {
      cursor.style.background = "white";
      cursor.style.borderRadius = "0px";
    } 
    else if (theme === "Galaxy") {
      cursor.style.background = "white";
      cursor.style.borderRadius = "8px";
    } 
    else {
      cursor.style.background = "white";
      cursor.style.borderRadius = "50%";
    }

    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';

  }, 180);
});

const lenis = new Lenis({
  duration: 1.8, 
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  wheelMultiplier: 1, 
  touchMultiplier: 2,
  infinite: false,
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});

ScrollTrigger.addEventListener("refresh", () => lenis.resize());
ScrollTrigger.refresh();


const section_1 = document.getElementById("vertical");
const col_left = document.querySelector(".col_left");
const timeln = gsap.timeline({ paused: true });

timeln.fromTo(col_left, {y: 0}, {y: '170vh', duration: 1, ease: 'none'}, 0);

const scroll_1 = ScrollTrigger.create({
    animation: timeln,
    trigger: section_1,
    start: 'top top',
    end: 'bottom center',
    scrub: true
});

let box_items = gsap.utils.toArray(".horizontal__item");

const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
}

const saved = localStorage.getItem("lang") || "pt";
setLanguage(saved);

const temas = {
  TEMA1: "default",
  TEMA2: "minecraft",
  TEMA3: "Galaxy"
};

Object.keys(temas).forEach(id => {
  const btn = document.getElementById(id);

  btn.addEventListener("click", () => {
    const theme = temas[id];

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // 🔥 ISSO AQUI FAZ FUNCIONAR
    const currentLang = localStorage.getItem("lang") || "pt";
    setLanguage(currentLang);
  });
});

const chatCard = document.getElementById("chat-card");
const openChatBtn = document.getElementById("Chat");
const chat = document.getElementById("chat");

// abre/fecha card
openChatBtn.addEventListener("click", () => {
  chatCard.classList.toggle("show");
});

const observer = new MutationObserver(() => {
  // Use scroll imediato para evitar conflitos com o streaming da IA
  chat.scrollTop = chat.scrollHeight;
});

// Observe mudanças no texto também (characterData) para o streaming funcionar
observer.observe(chat, { 
  childList: true, 
  subtree: true, 
  characterData: true 
});