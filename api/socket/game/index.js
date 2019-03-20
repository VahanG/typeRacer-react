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
        let currentRoom = null;
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
            if (false && users.find((userId) => userId === user.id)) {
                cb('user already joined');
                return;
            }
            const updatedRoom = await ORM.update('rooms', id, {users: [...users, user.id]});
            currentRoom = updatedRoom;
            roomId = `${roomPref}${id}`;
            socket.join(roomId);
            socket.to(roomId).emit('room-updated', updatedRoom);
            cb(null, updatedRoom);
        });

        socket.on('leave-game', async (id, cb) => {
            leave(currentRoom, user).then((d) => {
                roomId = '';
                cb(null);
            });
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
            console.log('disconnect');
            leave(currentRoom, user).then(() => {
                roomId = ''
            });
        });

        const leave = async ({id}, user, roomId) => {
            const room = await ORM.findFirst('rooms', {id});
            const updatedRoom = await ORM.update('rooms', room.id, {users: room.users.filter(u => u !== user.id)});
            socket.leave(roomId);
            socket.to(roomId).emit('user-leave', updatedRoom);
        }
    });
};