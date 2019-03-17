const express = require('express');
const router = express.Router();
const {getUserByToken} = require('./../auth/requests');

router.get('/', getUserByToken, async (req, res, next) => {
    const {user} = res.locals;
    res.status(200);
    res.send({user})
});

module.exports = router;