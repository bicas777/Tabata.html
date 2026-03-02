function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  chat.appendChild(div);
  
  const chat_container = document.getElementById("chat");
  chat_container.scrollTop = chat_container.scrollHeight;
  return div;
}

async function sendMessage() {
  const message = input.value;
  input.value = "";
  addMessage(message, "user");

  const sendBtn = document.getElementById("send-btn");
  const originalText = sendBtn.innerHTML;
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<span class="typing-dot2"></span><span class="typing-dot2"></span><span class="typing-dot2"></span>';

  // ✅ NOVA: Criar elemento com animação de digitação
  const aiDiv = addMessage("", "ai");
  const chat = document.getElementById("chat");
  
  // Adicionar classe para animação de digitação
  aiDiv.classList.add("typing");
  aiDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`${response.status}: AI offline`);
    }

    if (!response.body) {
      throw new Error("Resposta vazia do servidor");
    }

    aiDiv.classList.remove("typing");
    aiDiv.innerHTML = "";

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      aiDiv.textContent += chunk;
      
      chat.scrollTop = chat.scrollHeight;
    }

    const finalChunk = decoder.decode();
    if (finalChunk) {
      aiDiv.textContent += finalChunk;
      chat.scrollTop = chat.scrollHeight;
    }

  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    aiDiv.classList.remove("typing");
    aiDiv.innerHTML = `❌ Erro: ${error.message}`;
    aiDiv.style.color = "#ff6b6b";
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerHTML = originalText;
  }
}


function scrollToBottom() {
  const chat = document.getElementById("chat");
  chat.scrollTo({
    top: chat.scrollHeight,
    behavior: "smooth"
  });
}
