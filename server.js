// server.js
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Or wherever your files are

const server = app.listen(port);
const io = new Server(server);

console.log(`Server started on port ${port}`);

// =========== SOCKET.IO =========== //
io.on('connection', (socket) => {
    console.log(`Client '${socket.id}' connected`);
    socket.on('disconnect', () => console.log(`Client '${socket.id}' disconnected`));
});

// ====== Catch all routes ====== //
// For all other routes not specified, serve the index.html file. This allows client-side routing to work properly.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});