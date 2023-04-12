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
  socket.on('select_room', (data, callback) => {
    socket.join(data.room);

    const userInRoom = users.find(
      (user) => user.username === data.userName && user.room === data.room
    );

    userInRoom
      ? (userInRoom.socket_id = socket.id)
      : users.push({
          room: data.room,
          username: data.userName,
          socket_id: socket.id,
        });

    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);
  });

  socket.on('message', (data) => {
    const message: Message = {
      room: data.room,
      text: data.message,
      username: data.userName,
      created_at: new Date(),
    };

    messages.push(message);

    io.to(data.room).emit('message', message);
  });
});

const getMessagesRoom = (room: string) => {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
};
