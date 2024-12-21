/*



!!!!!! WARNING !!!!!!





*/

import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io();

function isScrolledToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    return chatWindow.scrollHeight - chatWindow.clientHeight <= chatWindow.scrollTop + 1; // Add a small tolerance
}

const matureWords = [
    "fuck",
    "shit",
    "ass",
    "arse",
    "pussy",
    "cunt",
    "bloody",
    "damn",
    "hell",
    "bitch",
    "bastard",
    "cock",
    "dick",
    "penis",
    "vagina",
    "nigga",
    "nigger",
    "negra",
    "piss",
    "prick",
    "faggot",
    "fagget",
    "whore",
    "slut",
    "twat",
    "wanker",
    "shite",
    "bollocks"
];

/**
 * @param {string} message 
 */
function messageIsMature(message) {
    if (message.match(matureWords).length > 0) {
        return true;
    } else return false;
}

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

    // Autoscroll if the user was already at the bottom
    if (isScrolledToBottom()) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
})

const messageBox = document.getElementById('messageBox');
const sendButton = document.getElementById('sendButton');
const chatWindow = document.getElementById('chatWindow');

const sendMessage = () => {
    const message = messageBox.value;
    if (message.length > 0 /* && !messageIsMature(message) */) {
        console.info(`Sending message to server as '[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] @${socket.id}: ${message}'`); // Verbost Debugging
        socket.emit('message', {
            sender: socket.id,
            message: message,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        });
        messageBox.value = "";
    }
};

messageBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage(); // TODO: Same Damn Todo As The Next One
    }
});

sendButton.addEventListener("click", sendMessage); // Removed immediate invocation

export default { socket, messageBox, sendButton, chatWindow };