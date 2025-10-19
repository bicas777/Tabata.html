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

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER, // pega o e-mail do Render
            pass: process.env.GMAIL_PASS  // pega a senha do app do Render
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: "enzobtabatinga@gmail.com",
        subject: "Nova solicitação de suporte",
        text: mensagem
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ status: "ok", message: "Solicitação enviada!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "erro", message: "Falha ao enviar e-mail" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
