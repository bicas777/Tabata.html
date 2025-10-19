// -------- Partículas --------
const particlesCanvas = document.getElementById('particles');
const pCtx = particlesCanvas.getContext('2d');
function resizeParticles() { 
    particlesCanvas.width = window.innerWidth; 
    particlesCanvas.height = window.innerHeight; 
}
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

function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = '#ff00ff';
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

// -------- Botão enviar via mailto --------
document.getElementById('btnEnviar').addEventListener('click', () => {
    const mensagem = document.getElementById('mensagem').value;
    if (!mensagem) {
        alert("Escreva uma mensagem antes de enviar!");
        return;
    }
    const mailtoLink = `mailto:SEU_EMAIL@gmail.com?subject=Solicitação de Suporte&body=${encodeURIComponent(mensagem)}`;
    window.location.href = mailtoLink;
});
