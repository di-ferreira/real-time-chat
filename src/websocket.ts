import { io } from './http';

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}

interface Message {
  room: string;
  text: string;
  created_at: Date;
  username: string;
}

const users: RoomUser[] = [];

const messages: Message[] = [];

io.on('connection', (socket) => {
  socket.on('select_room', (data) => {
    socket.join(data.room);

    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    );

    userInRoom
      ? (userInRoom.socket_id = socket.id)
      : users.push({
          room: data.room,
          username: data.username,
          socket_id: socket.id,
        });

    console.log(`Usuário ${data.username} se conectou na sala ${data.room}`);
    const messagesRoom = getMessagesRoom(data.room);
    socket.emit('messages_room', messagesRoom);
  });

  socket.on('message', (data) => {
    const message: Message = {
      room: data.room,
      text: data.text,
      username: data.username,
      created_at: new Date(),
    };
    console.log(
      `Usuário ${message.username} enviou a menssagem ${message.text}`
    );
    messages.push(message);

    io.to(data.room).emit('message', messages);
  });
});

const getMessagesRoom = (room: string) => {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
};
