document.addEventListener("DOMContentLoaded", () => {

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

    // -------- Botões --------
    document.querySelectorAll('.btn, .botaoinicial').forEach(btn => { 
        btn.addEventListener('click', () => { 
            if(btn.dataset.link) window.open(btn.dataset.link, '_blank'); 
        }); 
    });
})

    const botaoTopo = document.querySelector('.topo-link');
    const firstsection = document.querySelector('.first-section');
    if (botaoTopo && firstsection) {
        function verificarPosicao() {
            const limiteDaSecao = firstsection.getBoundingClientRect().bottom;
            if (limiteDaSecao < 600) {
                botaoTopo.classList.add('show');
            } else {
                botaoTopo.classList.remove('show');
            }
        }
        window.addEventListener('scroll', verificarPosicao);
        verificarPosicao();
    }
