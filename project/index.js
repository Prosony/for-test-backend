import path         from 'path'
import express      from 'express'
import session      from 'express-session'
import bodyParser   from 'body-parser'
import connectMongo from 'connect-mongo'

import config       from './config.json'
import Logger       from './Modules/Logger'
import Mongoose     from './Modules/DataBase'
import Router       from './Modules/Router'

const MongoStore  = connectMongo(session)
express()
    .set('views', path.join(__dirname, 'views'))
    .use(express.static(path.join(__dirname, 'views')))
    .set('view engine', 'ejs')
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(session({
        secret: config.Session.SECRET,
        resave: config.Session.RESAVE,
        saveUninitialized: config.Session.SAVEUNITILAZIED,
        store: new MongoStore({ mongooseConnection: Mongoose.connection })
    }))
    .use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        Logger.success('MIDDLEWARE', 'Access-Control-Allow-Origin разрешён')
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        Logger.success('MIDDLEWARE', `Access-Control-Allow-Headers разрешён`)
        next()
    })
    .use(Router)
    .listen(config.Server.PORT, () => {
        Logger.info('СЕРВЕР', `слушает порт ${config.Server.PORT}`)
    })
