const ORM = require('./../../CRUDMaker/ORM');
const {readCookie} = require('./../helper');

module.exports = (io) => {
    const roomPref = 'game';

    const game = io.of('/game');

    game.on('connection', function (socket) {
        const token = readCookie('token', socket.request.headers.cookie);
        let roomId = '';
        let user = {};
        ORM.findFirst('user', {token}).then((d) => user = d); //should be passed from middleware

        socket.on('join-game', async (id, cb) => {
            const room = await ORM.findFirst('rooms', {id});
            if (!room) {
                cb('not fount');
                return;
            }
            if (room.started){
                cb('game already started');
                return;
            }
            roomId = `${roomPref}${id}`;
            socket.join(roomId);
            socket.to(roomId).emit('new-joiner', user);
            cb(null);
        });

        socket.on('game-start-request', async (id, cb) => {
            const room = await ORM.findFirst('rooms', {id});
            if (room.creatorId !== user.id) {
                cb('only creator can start');
                return;
            }
            ORM.update('rooms', id, {started: true});
            socket.to(roomId).emit('game-start');
        });

        socket.on('game-progress', (progress) => {
            socket.to(roomId).emit('game-progress', {user, progress});
            if (progress === 100) {
                //finish
            }
        });

        socket.on('disconnect', (reason) => {
            socket.to(roomId).emit('leave-game', user);
        });
    });

};