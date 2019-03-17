const express = require('express');
const router = express.Router();
const {getToken, getUserByToken} = require('./controller');

const expiresInHours = 300 * 24; //forever )))
router.post('/login', getToken, async (req, res, next) => {
    const {token} = res.locals;
    res.cookie('token',token, { maxAge: expiresInHours * 60 * 60 * 1000 });
    res.status(200);
    res.send({token})
});

module.exports = router;