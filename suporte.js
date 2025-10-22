const botao = document.getElementById("enviar");
const status = document.getElementById("status");

    const gato = document.getElementById("img3");
    const somGato = new Audio("assets/click.mp3");

    gato.addEventListener("click", () => {
        somGato.currentTime = 0;
        somGato.play();

    });

botao.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const arquivo = document.getElementById("imagem")?.files[0]; // opcional

    if (!nome || !email || !mensagem) {
        status.textContent = "Ei! Preencha as informações primeiro!";
        status.style.color = "#e74c3c";
        return;
    }

    // Cria o FormData para enviar ao bot
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("tipo", "suporte"); // <- minúsculo
    formData.append("detalhes", mensagem);
    if (arquivo) formData.append("imagem", arquivo);

    status.textContent = "Enviando...";
    status.style.color = "#3498db";

    try {
        const response = await fetch("https://pedidobot.onrender.com/pedido", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        status.textContent = data.status || "Pedido enviado com sucesso!";
        status.style.color = "#2ecc71";

        // Limpa os campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mensagem").value = "";
        if (document.getElementById("imagem")) document.getElementById("imagem").value = "";

    } catch (err) {
        console.error("Erro ao enviar:", err);
        status.textContent = "Erro ao enviar a mensagem!";
        status.style.color = "#e74c3c";
    }

});