var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');

var app = express();

app.use(session({
  secret: 'i need more beers',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    url: 'mongodb://127.0.0.1:27017/db_session',
  })
}));

app.use(express.static(path.join(__dirname, 'view')));
app.listen(3000, function(){
    console.log('server start on port 3000');
});

module.exports.app = app;