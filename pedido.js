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

function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array(columns).fill(0);
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();

let matrixColorMode = false;
let lettersColor = '#2510c434';

// -------- Título piscando --------
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

// -------- Blur + Partículas do mouse --------
const blur = document.querySelector('.mouse-blur');
const mouseParticles = [];
document.addEventListener('mousemove', e => {
    blur.style.left = e.clientX + 'px';
    blur.style.top = e.clientY + 'px';
    for (let i = 0; i < 3; i++) {
        mouseParticles.push({
            x: e.clientX + (Math.random() - 0.5) * 20,
            y: e.clientY + (Math.random() - 0.5) * 20,
            r: Math.random() * 4 + 3,
            speed: Math.random() * 3 + 1,
            color: cores[Math.floor(Math.random() * cores.length)],
            alpha: 1
        });
    }
});

function drawMouseParticles() {
    mouseParticles.forEach((p, i) => {
        pCtx.beginPath();
        pCtx.arc(Math.round(p.x), Math.round(p.y), Math.round(p.r), 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
        pCtx.fill();
        p.y += p.speed;
        p.alpha -= 0.02;
        if (p.alpha <= 0) mouseParticles.splice(i, 1);
    });
    requestAnimationFrame(drawMouseParticles);
}
drawMouseParticles();

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `${r},${g},${b}`;
}

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

// -------- Formulário (ATUALIZADO COM EMAIL + IMAGEM) --------
const cards = document.querySelectorAll('.service-card');
let selectedService = null;

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedService = card.getAttribute('data-service');
    });
});

const enviarBtn = document.getElementById('enviar');
const status = document.getElementById('status');

enviarBtn.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const detalhes = document.getElementById('detalhes').value;
    const arquivo = document.getElementById('imagem').files[0];

    if (!nome || !email || !detalhes || !selectedService) {
        status.textContent = "Preencha todos os campos e selecione um serviço!";
        status.style.color = '#ff3333';
        return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('tipo', selectedService);
    formData.append('detalhes', detalhes);
    if (arquivo) formData.append('imagem', arquivo);

    try {
        const response = await fetch('https://pedidobot.onrender.com/pedido', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        status.textContent = result.status;
        status.style.color = '#00ff00';

        // Limpa os campos
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('detalhes').value = '';
        document.getElementById('imagem').value = '';
        cards.forEach(c => c.classList.remove('selected'));
        selectedService = null;

    } catch (error) {
        status.textContent = "Erro ao enviar pedido!";
        status.style.color = '#ff3333';
        console.error(error);
    }
});
