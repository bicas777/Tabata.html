const botao = document.getElementById("enviar");
const status = document.getElementById("status");

botao.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        status.textContent = "Preencha todos os campos antes de enviar!";
        status.style.color = "#e74c3c";
        return;
    }

    const serviceID = "service_r4vm82f";    
    const templateID = "template_iegdz0g";  

    try {
        const result = await emailjs.send(serviceID, templateID, {
            from_name: nome,
            user_email: email,
            message: mensagem,
            time: new Date().toLocaleString()
        });

        console.log(result.text);
        status.textContent = "Mensagem enviada com sucesso!";
        status.style.color = "#2ecc71";

        // Limpa os campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mensagem").value = "";
    } catch (err) {
        console.error("Erro ao enviar:", err);
        status.textContent = "Erro ao enviar a mensagem!";
        status.style.color = "#e74c3c";
    }
});
