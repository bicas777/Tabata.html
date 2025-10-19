const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// CONFIGURAÇÕES CUSTOMIZÁVEIS
const fontSize = 15; // tamanho da fonte
const letters = '67'; // caracteres
const speed = 1; // velocidade
const colors = ['rgba(255, 217, 0, 1)', 'rgba(0, 132, 255, 1)', 'rgba(4, 0, 255, 1)', 'rgba(0, 247, 255, 1)']; // cores que podem mudar
const alpha = 1; // transparência do fundo

let columns = Math.floor(width / fontSize);
let drops = Array(columns).fill(1); // inicializa posição y de cada coluna

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
});

function draw() {
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i] += speed;
    }

    requestAnimationFrame(draw);
}

draw();
