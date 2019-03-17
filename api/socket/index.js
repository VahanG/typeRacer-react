const socketio = require('socket.io');
const ORM = require('./../CRUDMaker/ORM');

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
            next();
        } else {
            next(new Error('Auth error'))
        }
    });


};


const readCookie = (name, ca) => {
    const nameEQ = name + "=";
    const c = ca.split(';').find(a => a.indexOf(nameEQ) !== -1);
    return c && c.split(nameEQ)[1] || null;
};


