// Seleção dos elementos
const chatboxContainer = document.getElementById("chatbox-container");
const openChatboxButton = document.getElementById("open-chatbox");
const closeChatboxButton = document.getElementById("close-chatbox");
const chatboxMessages = document.getElementById("chatbox-messages");
const chatboxText = document.getElementById("chatbox-text");
const sendMessageButton = document.getElementById("send-message");

// Abrir o chatbox
openChatboxButton.addEventListener("click", () => {
  chatboxContainer.style.display = "flex";
  openChatboxButton.style.display = "none";
});

// Fechar o chatbox
closeChatboxButton.addEventListener("click", () => {
  chatboxContainer.style.display = "none";
  openChatboxButton.style.display = "block";
});

// Enviar mensagem
sendMessageButton.addEventListener("click", sendMessage);
chatboxText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = chatboxText.value.trim();
  if (message) {
    // Adicionar a mensagem do usuário
    addMessage("Você", message);

    // Placeholder para a resposta da IA
    setTimeout(() => {
      addMessage("Atendimento", "Aguarde, estamos processando sua solicitação...");
    }, 500);
  }
  chatboxText.value = "";
}

// Adicionar mensagem ao chatbox
function addMessage(sender, text) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatboxMessages.appendChild(messageElement);
  chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}
