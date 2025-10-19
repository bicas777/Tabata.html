// --- Partículas ---
const particlesCanvas = document.getElementById('particles');
const pCtx = particlesCanvas.getContext('2d');

function resizeParticles() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeParticles);
resizeParticles();

const particles = [];
for (let i = 0; i < 40; i++) {
    particles.push({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.2
    });
}

function drawParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(p => {
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = 'rgba(255,255,255,0.7)';
        pCtx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = particlesCanvas.height;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();

// --- Matrix ---
const matrixCanvas = document.getElementById('matrix');
const ctx = matrixCanvas.getContext('2d');
let letters = '67';
let fontSize = 9;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(0);

function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array(columns).fill(0);
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();

let lettersColor = '#2510c4';

function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
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

// --- Botões ---
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => window.open(btn.dataset.link, '_blank'));
});

// --- Blur móvel ---
const blur = document.querySelector('.mouse-blur');
document.addEventListener('touchmove', e => {
    const t = e.touches[0];
    blur.style.left = t.clientX + 'px';
    blur.style.top = t.clientY + 'px';
});

// --- Fade das seções ---
const sections = document.querySelectorAll('.section-content');
function handleScroll() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const trigger = window.innerHeight * 0.8;
        if (rect.top < trigger) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('touchmove', handleScroll);
