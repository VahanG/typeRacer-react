const ORM = require('./../../CRUDMaker/ORM');

module.exports=(io)=> {
    io.on('connection', function (socket) {

        socket.on('new-room', async (_, cb) => {
            const room = await ORM.create('rooms', {});
            socket.broadcast.emit('new-room', room);
            cb(null, {id: room});
        });

        socket.on('get-rooms', async (_, cb) => {
            const rooms = await ORM.find('rooms');
            cb(null, rooms.list);
        });

        socket.on('disconnect', (reason) => {
            console.log('a client was disconnected');

        });
    });

};