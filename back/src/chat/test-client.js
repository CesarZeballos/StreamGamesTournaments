const io = require('socket.io-client');

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('sendGlobalMessage', {
    nickname: 'testUser',
    content: 'Hello, World!',
  });
});

socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});

socket.on('globalMessage', (message) => {
  console.log('Received global message:', message);
});

socket.on('privateMessage', (message) => {
  console.log('Received private message:', message);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
