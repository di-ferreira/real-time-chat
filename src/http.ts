import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/index', express.static(path.join(__dirname, 'public/index.html')));
app.use('/chat', express.static(path.join(__dirname, 'public/chat.html')));

const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, { cors: { origin: '*' } });

export { serverHTTP, io };
