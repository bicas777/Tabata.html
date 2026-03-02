import express from "express"; 
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


const app = express();


app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../"))); 


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../portifolio.html"));
});


app.get("/outra-pagina", (req, res) => {
  res.sendFile(path.join(__dirname, "../outra-pagina.html"));
});


let chatHistory = [];


app.post("/chat", async (req, res) => {
  console.log("Mensagem recebida:", req.body.message);
  const { message } = req.body;


  // não adiciona ainda ao histórico
  const fullPrompt = `
Você é uma IA rápida e direta.
Responda sempre de forma curta e clara.
Nada de textos longos.


${chatHistory.join("\n")}
Usuário: ${message}
IA:
`;


  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "minhaIA", prompt: fullPrompt, stream: true })
    });


    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    // ✅ CORREÇÃO 1: Desabilitar compressão para streaming funcionar corretamente
    res.setHeader("Content-Encoding", "identity");


    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiReply = "";


    while (true) {
      const { done, value } = await reader.read();
      if (done) break;


      const textChunk = decoder.decode(value, { stream: true });
      textChunk.split(/\r?\n/).forEach(line => {
        if (!line) return;
        try {
          const obj = JSON.parse(line);
          if (obj.response) {
            aiReply += obj.response;
            res.write(obj.response); // envia direto pro client
            
            // ✅ CORREÇÃO 2: Flush do buffer para liberar dados imediatamente
            if (res.flush) {
              res.flush();
            }
          }
        } catch(e) {}
      });
    }


    res.end();


    // só adiciona ao histórico **depois de terminar**
    chatHistory.push(`Usuário: ${message}`);
    chatHistory.push(`IA: ${aiReply.trim()}`);


  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


app.listen(3000, () => console.log("IA local rodando 🚀"));
