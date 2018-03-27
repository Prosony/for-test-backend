const
	path 			    = require('path')
	express 			= require('express')
	server        = express()
	session 		  = require('express-session')
	bodyParser 		= require('body-parser')
	MongoStore 		= require('connect-mongo')(session)
	router 			  = require('./router')
	mongoose		  = require('./service/DataBase')

server
	.set('views engine', 'ejs')
	.use(express.static(path.join(__dirname, 'views')))
	.use(session({
	  secret: 'i need more beers',
	  resave: false,
	  saveUninitialized: true,
	  store: new MongoStore({ mongooseConnection: mongoose.connection })
	}))
	.use((req, res, next) => {
	    res.header('Access-Control-Allow-Origin', '*')
	    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	    next()
	})
	.use(bodyParser.json())
	.use(router)
	.listen(3000, () => console.log('\x1b[36m#INFO\x1b[0m [server.js] [SUCCESS] server start on port 3000'))