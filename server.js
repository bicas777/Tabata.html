// Importações
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Permite o front-end enviar requisições

// -------- Configure seu Gmail aqui --------
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "enzobtabatinga@gmail.com",      // seu Gmail
        pass: "dler mqme fvyc kymo"          // a senha de app de 16 caracteres
    }
});

// -------- Endpoint para receber a mensagem --------
app.post("/enviar-suporte", (req, res) => {
    const { mensagem } = req.body;

    if (!mensagem) {
        return res.status(400).send({ status: "erro", message: "Mensagem vazia!" });
    }

    const mailOptions = {
        from: "SEU_EMAIL@gmail.com",      // remetente
        to: "SEU_EMAIL@gmail.com",        // destinatário (pode ser o mesmo)
        subject: "Nova solicitação de suporte",
        text: mensagem
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar e-mail:", error);
            return res.status(500).send({ status: "erro", message: "Não foi possível enviar a solicitação!" });
        }
        console.log("E-mail enviado:", info.response);
        res.send({ status: "ok", message: "Solicitação enviada com sucesso!" });
    });
});

// -------- Rodar servidor --------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
