// -------- Liberação de áudio --------
function desbloquearAudio() {
    const dummy = new Audio();
    dummy.play().catch(() => {});
    window.removeEventListener('pointerdown', desbloquearAudio);
    window.removeEventListener('touchstart', desbloquearAudio);
    window.removeEventListener('keydown', desbloquearAudio);
}
window.addEventListener('pointerdown', desbloquearAudio);
window.addEventListener('touchstart', desbloquearAudio);
window.addEventListener('keydown', desbloquearAudio);

// -------- Partículas do fundo --------
const particlesCanvas = document.getElementById('particles');
const pCtx = particlesCanvas.getContext('2d');
function resizeParticles() { particlesCanvas.width = window.innerWidth; particlesCanvas.height = window.innerHeight; }
window.addEventListener('resize', resizeParticles);
resizeParticles();

const particles = [];
const numParticles = 150;
for (let i = 0; i < numParticles; i++) {
    particles.push({ x: Math.random() * particlesCanvas.width, y: Math.random() * particlesCanvas.height, r: Math.random() * 2 + 1, speed: Math.random() * 1 + 0.2 });
}
function drawParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(p => {
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = 'rgba(255,255,255,0.8)';
        pCtx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = particlesCanvas.height;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

// -------- Matrix --------
const matrixCanvas = document.getElementById('matrix');
const ctx = matrixCanvas.getContext('2d');
let letters = '67';
let fontSize = 15;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(0);
function resizeMatrix() { matrixCanvas.width = window.innerWidth; matrixCanvas.height = window.innerHeight; columns = Math.floor(matrixCanvas.width / fontSize); drops = Array(columns).fill(0); }
window.addEventListener('resize', resizeMatrix);
resizeMatrix();

let matrixColorMode = false;
let lettersColor = '#2510c434';

// -------- Título piscando e Rainbow --------
const titulo = document.getElementById('titulo');
const cores = ['#2510c4', '#0011ffff', '#15ff00ff', '#ff00ff', '#00d9ffff', '#ff0000ff'];
let clickCount = 0;
titulo.addEventListener('click', () => {
    const novoSom = new Audio('assets/click.mp3');
    novoSom.play().catch(() => {});
    clickCount++;
    let novaCor;
    do { novaCor = cores[Math.floor(Math.random() * cores.length)]; } while (novaCor === titulo.style.color);
    titulo.style.color = novaCor;
    titulo.classList.add('blink');
    setTimeout(() => titulo.classList.remove('blink'), 500);
    if (clickCount >= 50) matrixColorMode = true;
});

// -------- Botões --------
document.querySelectorAll('.btn').forEach(btn => { 
    btn.addEventListener('click', () => { 
        if(btn.dataset.link) window.open(btn.dataset.link, '_blank'); 
    }); 
});

// -------- Blur + Partículas do mouse --------
const blur = document.querySelector('.mouse-blur');
const mouseParticles = [];
document.addEventListener('mousemove', e => {
    blur.style.left = e.clientX + 'px';
    blur.style.top = e.clientY + 'px';
    for (let i = 0; i < 3; i++) {
        mouseParticles.push({ x: e.clientX + (Math.random() - 0.5) * 20, y: e.clientY + (Math.random() - 0.5) * 20, r: Math.random() * 4 + 3, speed: Math.random() * 3 + 1, color: cores[Math.floor(Math.random() * cores.length)], alpha: 1 });
    }
});
function drawMouseParticles() {
    mouseParticles.forEach((p, i) => {
        pCtx.beginPath();
        pCtx.arc(Math.round(p.x), Math.round(p.y), Math.round(p.r), 0, Math.PI * 2);
        pCtx.fillStyle = `rgb(${hexToRgb(p.color)})`;
        pCtx.fill();
        p.y += p.speed;
        if (p.alpha <= 0) mouseParticles.splice(i, 1);
    });
    requestAnimationFrame(drawMouseParticles);
}
drawMouseParticles();
function hexToRgb(hex) { hex = hex.replace('#', ''); let bigint = parseInt(hex, 16); let r = (bigint >> 16) & 255; let g = (bigint >> 8) & 255; let b = bigint & 255; return `${r},${g},${b}`; }

// -------- Matrix Draw --------
function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    if (matrixColorMode) lettersColor = cores[Math.floor(Math.random() * cores.length)];
    ctx.fillStyle = lettersColor;
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
}
drawMatrix();

// -------- Fade-in das seções --------
const sections = document.querySelectorAll('.section-content');
function handleScroll() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const triggerBottom = window.innerHeight * 0.85;
    if (rect.top < triggerBottom) {
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
    const fadeStart = window.innerHeight * 0.1;
    if (rect.top < fadeStart) {
      let opacity = rect.top / fadeStart;
      section.style.opacity = Math.max(0, opacity);
    }
  });

}
window.addEventListener('scroll', handleScroll);
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
});
