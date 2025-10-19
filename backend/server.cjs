const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; // Render usa process.env.PORT

app.post("/enviar", async (req, res) => {
    const { mensagem } = req.body;
    if (!mensagem) return res.status(400).json({ status: "erro", message: "Mensagem vazia!" });

    // Configuração SMTP mais segura pro Gmail
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // false = STARTTLS
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: "enzobtabatinga@gmail.com",
        subject: "Nova solicitação de suporte",
        text: mensagem
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado:", info.response);
        res.json({ status: "ok", message: "Solicitação enviada!" });
    } catch (err) {
        console.error("Erro ao enviar email:", err);
        res.status(500).json({ status: "erro", message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
