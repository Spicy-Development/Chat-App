// server.js
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Or wherever your files are

const server = app.listen(port);
const io = new Server(server);

console.log(`Server started on port ${port}`);

// =========== MongoDB =========== //
const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB.");
  } catch (e) {
    console.error(e);
    throw new Error("Failed to connect to MongoDB: " + e);
  }
}
run().catch(console.dir);

const db = client.db('spicy-chat');
const messagesCollection = db.collection('messages');
const usersCollection = db.collection('users');
const chatsCollection = db.collection('chats');

// ========== SOCKET.IO ========== //
io.on('connection', (socket) => {
  console.log(`Client '${socket.id}' connected`);
  io.emit('userConnection', socket.id);

  socket.on('disconnect', () => console.log(`Client '${socket.id}' disconnected`));

  socket.on('joinChat', async (chatId) => {
    socket.join(chatId); 
    
    try {
      const messages = await messagesCollection.find({ chatId }).toArray();
      socket.emit('loadMessages', messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  });

  socket.on('leaveChat', (chatId) => {
    socket.leave(chatId);
  });
});

io.sockets.on('connection', (socket) => {
  socket.on('message', async (messageData) => {
    const timestamp = new Date();
    const date = timestamp.toLocaleDateString();
    const time = timestamp.toLocaleTimeString();
    const formattedMessage = {
        date: date,
        time: time,
        sender: messageData.sender,
        message: messageData.message,
        chat: messageData.chatID
    };

    try {
      await messagesCollection.insertOne(formattedMessage); 
      io.to(messageData.chatId).emit('message', formattedMessage);
      console.log(`[${date} ${time}] @${messageData.sender}: ${messageData.message}`);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

// ====== Catch all routes ====== //
// For all other routes not specified, serve the index.html file. This allows client-side routing to work properly.
app.get('*', (req, res) => {  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});