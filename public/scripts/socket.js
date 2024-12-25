import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io();
const contentSide = document.getElementById('content-sidebar');
const messageBox = document.getElementById('messageBox');
const sendButton = document.getElementById('sendButton');
const chatWindow = document.getElementById('chatWindow');

const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log(contentSide.scrollHeight);
            contentSide.scrollTop = contentSide.scrollHeight;
        }
    }
});

observer.observe(chatWindow, { childList: true });

const printMessage = (data) => {
    const html = `<div class="chat-message"><div class="chat-message-head"><b>@${data.sender}</b> - ${data.date} ${data.time} UTC</div><div class="chat-message-body">${data.message}</div></div>`;
    chatWindow.innerHTML += html;
};

const log = (text) => {
    chatWindow.innerHTML += "<br>" + `<i>${text}</i>`;
}

socket.on('connect', () => {
    console.log('Connected to the server.');
    // Request message history when connected
    socket.emit('loadMessages');

    log("Connected to the server.");
});

socket.on('messageHistory', (messages) => {
    // Clear existing messages in the chat window
    chatWindow.innerHTML = '';
    // Display loaded messages
    messages.forEach(data => {
        printMessage(data);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
});

socket.on('userConnection', (id) => {
    console.log(`User ${id} connected.`);
});

socket.on('message', (data) => {
    printMessage(data);
});

const sendMessage = () => {
    const message = messageBox.value;
    if (message.length > 0) {
        console.info(`Sending message to server as '[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] @${socket.id}: ${message}'`); // Verbost Debugging
        socket.emit('message', {
            sender: socket.id,
            message: message,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
        messageBox.value = "";
        messageBox.focus();
    }
};

messageBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage(); // TODO: Same Damn Todo As The Next One
    }
});

sendButton.addEventListener("click", sendMessage); // Removed immediate invocation

export default { socket, messageBox, sendButton, chatWindow };