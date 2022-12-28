require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env['PORT'] || 3000; // port -- env variable

const express = require('express');
const path = require('path')
const app = express();
const http = require('http').createServer(app)

const io = require('socket.io')(http)


app.use(express.static(path.join(__dirname, 'public')));


http.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// Socket 

io.on('connection', (socket) => {
    console.log("Connection established");
    socket.on('message', (messageData) => {
        socket.broadcast.emit('message', messageData); // broadcasting the message to all clients connected in the socket except the one who is sending the message
    })
})


