const ORM = require('./../../CRUDMaker/ORM');

module.exports=(io)=> {
    io.on('connection', function (socket) {
        socket.on('new-room',async (ids, cb) => {
            const room = await ORM.create('rooms', {});
            console.log(room);
            socket.broadcast.emit('new-room', room);
            cb(room);
        });


        socket.on('disconnect', (reason) => {
            console.log('a client was disconnected');

        });
    });

};