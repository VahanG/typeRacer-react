const socketio = require('socket.io');
const ORM = require('./../CRUDMaker/ORM');
const {readCookie} = require('./helper');

module.exports = (server)=>{
    const io = socketio(server, {
        path: '/socket',
        cookie: true,
    });
    const rooms = require('./rooms')(io);
    io.use(async (socket, next) => {
        const token = readCookie('token', socket.request.headers.cookie);
        const user = await ORM.findFirst('user', {token});
        if (user) {
            console.log('Verified for socket');
            ///socket._locals = {user}; didnt worked for nsp
            next();
        } else {
            next(new Error('Auth error'))
        }
    });


};


