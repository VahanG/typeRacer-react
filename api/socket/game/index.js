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
                cb('not found');
                return;
            }
            if (room.started){
                cb('game already started');
                return;
            }
            const users = room.users || [];
            const updatedRoom = await ORM.update('rooms', id, {users: [...users, user.id]});
            roomId = `${roomPref}${id}`;
            socket.join(roomId);
            socket.to(roomId).emit('room-updated', updatedRoom);
            cb(null, updatedRoom);
        });

        socket.on('leave-game', async (id, cb) => {
            socket.leave(roomId);
            socket.to(roomId).emit('user-leave', user);
            roomId = '';
            cb(null)
        });

        socket.on('game-start-request', async (id, cb) => {
            const room = await ORM.findFirst('rooms', {id});
            if (room.creatorId !== user.id) {
                cb('only creator can start');
                return;
            }
            ORM.update('rooms', id, {started: true, startedAt: new Date()}); // probably startedAt wil moved to front
            socket.to(roomId).emit('game-start');
        });

        socket.on('game-progress', (progress) => {
            socket.to(roomId).emit('game-progress', {user, progress});
            if (progress === 100) {
                //finish
            }
        });

        socket.on('disconnect', (reason) => {
            socket.to(roomId).emit('user-leave', user);
        });
    });

};