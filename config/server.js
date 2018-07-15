var express = require('express');
var consign = require('consign');
var validator = require('express-validator');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(validator());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({extended : true}));
consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app);
    
module.exports = app;