const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
// const io = require('socket.io')(server);
const socketServer = io(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const sockets = require('./sockets');

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT);
console.log(`Listening to port ${PORT}...`);

sockets.listen(socketServer);