let mongoose = require("mongoose");
let express = require('express');
let router = express.Router();
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let path = require('path');
let bodyParser = require('body-parser');
let connectMongo = new MongoStore({url: 'mongodb://127.0.0.1:27017/db_session'});
let app = express();


app.use(express.static(path.join(__dirname, 'views')));
app.set('views engine', 'ejs');
app.use(session({
  secret: 'i need more beers',
  resave: false,// 
  saveUninitialized: true, // Сохранять пустые сессии
  store: connectMongo
}));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     store:  new MongoStore({ url: 'mongodb://127.0.0.1:27017/db_session' }),
//     saveUninitialized: true,
//     cookie: { secure: true }
// }));
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log('server start on port 3000');
});

module.exports.app = app;
