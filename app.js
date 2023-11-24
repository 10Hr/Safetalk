const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

let userQueue = [];
let activeRooms = [];

const adjectives = ['Swift', 'Majestic', 'Vibrant', 'Cozy', 'Lively', 'Radiant', 'Tranquil', 'Spirited', 'Whimsical', 'Serene'];
const animals = ['Panther', 'Gazelle', 'Dolphin', 'Bison', 'Falcon', 'Lemur', 'Otter', 'Chameleon', 'Koala', 'Giraffe'];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');



  socket.on('start looking', () => {
    console.log('User started looking for another user');

    function generateRandomName() {
        var randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        var randomAnimal = animals[Math.floor(Math.random() * animals.length)];
        return randomAdjective + ' ' + randomAnimal;
      }
    
      socket.username = generateRandomName();
      userQueue.push(socket);

    // Check if there are at least two users in the queue
    if (userQueue.length >= 2) {
      console.log('Found two users');

      var roomName = `room-${Math.floor(Math.random() * 1000)}`;
      activeRooms.push(roomName);

      const user1 = userQueue.shift();
      const user2 = userQueue.shift();

      user1.join(roomName);
      user2.join(roomName);

      io.to(roomName).emit('room connected');
      io.to(roomName).emit('chat message', 'Connection you have been connected to a room');

      user1.on('chat message', (msg) => {
        io.to(roomName).emit('chat message', `${user1.username}: ${msg}`);
      });

      user2.on('chat message', (msg) => {
        io.to(roomName).emit('chat message', `${user2.username}: ${msg}`);
      });

      // Disconnect logic

      socket.on('disconnect room', () => {
        io.to(roomName).emit('chat message', 'Connection has been disconnected');
        io.socketsLeave(roomName);

      });
    }
      
  });



  socket.on('disconnect', () => {
    console.log('user disconnected');
    io
    // Remove user from the queue if they disconnect
    userQueue = userQueue.filter((user) => user !== socket);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
