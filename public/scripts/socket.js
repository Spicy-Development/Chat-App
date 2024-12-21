import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server.');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
});

socket.on('userConnection', (id) => {
    console.log(`User ${id} connected.`);
});

socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    const displayText = `[${data.date} ${data.time}] @${data.sender}: ${data.message}`;
    messageElement.innerText = displayText;
    chatWindow.appendChild(messageElement);
})

const messageBox = document.getElementById('messageBox');
const sendButton = document.getElementById('sendButton');
const chatWindow = document.getElementById('chatWindow');

const sendMessage = () => {
    const message = messageBox.value;
    socket.emit('message', {
        sender: socket.id,
        message: message,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
    });
    messageBox.value = "";
};

messageBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage(); // TODO: Same Damn Todo As The Next One
    }
});

sendButton.addEventListener("click", sendMessage()); // TODO: Verbose Debugging Features