const ORM = require('./../CRUDMaker/ORM');
const modelName = 'user';
const uuidv4 = require('uuid/v4');

const getToken = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await ORM.findFirst(modelName, {username});
    if (!user || user.password !== password) {
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
    const user = await ORM.findFirst(modelName, {token});
    if (!user) {
        res.status(401);
        res.send({msg: 'invalid token'});
        return
    }
    res.locals.user = user;
    next();

};

module.exports = {
    getToken,
    getUserByToken
};