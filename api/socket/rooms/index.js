const ORM = require('./../../CRUDMaker/ORM');
const {readCookie} = require('./../helper');
module.exports=(io)=> {
    const rooms = io.of('/rooms');

    rooms.on('connection', function (socket) {
        let creatorId = 'unknown'; //didnt manage to pass from middleware
        const token = readCookie('token', socket.request.headers.cookie);
        ORM.findFirst('user', {token}).then((user) => {
            creatorId = user.id
        });

        socket.on('new-room', async (_, cb) => {
            const room = await ORM.create('rooms', {creatorId});
            //socket.broadcast.emit('new-room', room);
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