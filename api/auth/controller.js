const ORM = require('./../CRUDMaker/ORM');
const modelName = 'user';
const uuidv4 = require('uuid/v4');

const getToken = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await ORM.findFirst(modelName, {username});
    if (!user) {
        // res.status(404);// nah, send 401 anyway
    }
    if (user.password !== password) {
        res.status(401);
        res.send({});
        return;
    }
    const token = uuidv4();
    ORM.update(modelName, user.id, {token});
    res.locals.token = token;
    next();
};

const getUserByToken = async (req, res, next) => {
    const token = req.cookies.token;
    const user = ORM.findFirst(modelName, {token})[0];
    if (!user) {
        res.status(401);
        res.send({msg: 'invalid token'})
    }
    res.locals.user = user;
    next();

};

module.exports = {
    getToken,
    getUserByToken
};