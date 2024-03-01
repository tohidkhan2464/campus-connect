const serverUrl = "ws://localhost:4000"; // Replace with your server URL

const socket = new WebSocket(serverUrl);

socket.addEventListener("open", (event) => {
    console.log("Connected to WebSocket server");
});

socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message.senderId, message.content);
});

socket.addEventListener("close", (event) => {
    console.log("Connection closed");
});

function sendMessage() {
    const inputElement = document.getElementById("message-input");
    const messageContent = inputElement.value.trim();

    if (messageContent !== "") {
        const message = {
            type: "chat",
            senderId: "A", // Replace with the actual user ID or username
            recipientId: "B", // Replace with the recipient's user ID or username
            content: messageContent,
        };

        socket.send(JSON.stringify(message));
        displayMessage(message.senderId, message.content);

        // Clear the input field
        inputElement.value = "";
    }
}

function displayMessage(senderId, content) {
    const messagesContainer = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${senderId}: ${content}`;
    messagesContainer.appendChild(messageElement);
}