// path is a node.js core module. Using this for setting the static folder 
const path = require('path');

//This http module is used by express under the hood for the .createServer() method, but we want to access it directly for socket.io
const http = require('http');

// First create a regular express server, then implement socket.io
const express = require('express');

const socketio = require('socket.io');

const formatMessage = require('./utils/messages');
const { userJoin, 
        getCurrentUser, 
        userLeave, 
        getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the public folder as the static folder for accessing the html files/frontend
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'MonChat Bot';

// Runs when a client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        
        socket.join(user.room);
    
        // Sending a welcome message to the current user
        socket.emit('message', formatMessage( botName, 'Welcome to MonChat! <i class="fas fa-smile-beam"></i>'));

        // Broadcast to other users in a room that a user had connected
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));

        // Send the users and room info down to all clients
        io.to(user.room).emit('roomUsers', { 
            room: user.room,
            users: getRoomUsers(user.room)
        });
         
    });

    // Listening for a message from the client
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username,msg));
    });

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit(
                'message', 
                formatMessage(botName,`${user.username} has left the chat`)
            );

            // Send the users and room info down to all clients
            io.to(user.room).emit('roomUsers', { 
                room: user.room,
                users: getRoomUsers(user.room)
            });
        };
        
    });

});

const PORT = 3000 || process.env.PORT; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// npm run dev