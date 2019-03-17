const express = require('express');
const bodyParser = require('body-parser');

const page = require('./page/');


const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({limit:'50mb',extended: true}));
const CRUDMaker = require('./api/CRUDMaker')(app);

CRUDMaker.addEndpoint('api/user');

app.use('/api/auth', require('./api/auth'));


app.use('/public',express.static('public'));
app.use('/assets',express.static('assets'));


app.use(async (req, res, next) => {
    res.end(page());
});

//app.use(express.static('public'));


app.use(express.static('public'));
app.listen(8080,() => {
    console.log(`Listening on 8080`);
});