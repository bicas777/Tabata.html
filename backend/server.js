import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000; // porta local

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
        from: "SEU_EMAIL@gmail.com",
        to: "SEU_EMAIL@gmail.com",
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
