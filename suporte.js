const botao = document.getElementById("enviar");
const status = document.getElementById("status");

botao.addEventListener("click", async () => {
    const mensagem = document.getElementById("mensagem").value;
    if (!mensagem) {
        status.textContent = "Escreva uma mensagem antes de enviar!";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem })
        });

        const data = await res.json();
        if (data.status === "ok") {
            status.textContent = "Mensagem enviada com sucesso!";
        } else {
            status.textContent = "Erro ao enviar: " + data.message;
        }
    } catch (err) {
        console.error(err);
        status.textContent = "Erro de conexão com o servidor!";
    }
});
