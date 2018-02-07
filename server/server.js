const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketio = require('socket.io');
const app = express();

const { generateMessage } = require('./utils/message');

let server = http.createServer(app);
let io = socketio(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connected!');

    socket.emit('newMessage', generateMessage('Admin','Welcome to chat app!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user logged in!'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('new message', newMessage);

        io.emit('newMessage', generateMessage(newMessage.from,newMessage.text));
        callback('This is from the server!');
});

    
});

server.listen(3000, () => {
    console.log('server up: port 3000...');
});