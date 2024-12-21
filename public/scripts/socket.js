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

const sortMessages = (messages) => {
    return messages.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
    });
};

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
    // Store all received messages
    const messages = Array.from(chatWindow.children).map(child => {
        const text = child.innerText;
        const parts = text.match(/\[(.*?)\] @(.*?): (.*)/);
        return {
            date: parts[1].split(' ')[0],
            time: parts[1].split(' ')[1],
            sender: parts[2],
            message: parts[3]
        };
    });
    messages.push(data);

    // Sort and re-render messages
    sortMessages(messages).forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.innerText = `[${msg.date} ${msg.time}] @${msg.sender}: ${msg.message}`;
        chatWindow.appendChild(messageElement);
    });
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