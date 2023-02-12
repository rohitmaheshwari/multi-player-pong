function listen(io) {
    let readyPlayerCount = 0;
    const pongNamespace = io.of('/pong');

    pongNamespace.on('connection', (socket) => {
        let room = 'room' + Math.floor(readyPlayerCount / 2);
        socket.join(room);

        console.log('a user connected...', socket.id);

        socket.on('ready', () => {
            console.log('Player ready...', socket.id, room);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                // pongNamespace.emit('startGame', socket.id);
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            console.log("🚀 ~ file: server.js:39 ~ socket.on ~ reason", reason);
            console.log("🚀 ~ file: server.js:19 ~ io.on ~ socket.id", socket.id);
            socket.leave(room);
        })
    });
}

module.exports = {
    listen,
}