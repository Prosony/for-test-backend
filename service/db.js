var mongoose = require('mongoose');
var crypto = require('crypto');
var Users = require('../model/user.js');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://127.0.0.1:27017/db_session', { useMongoClient: true });//("mongodb://user:password@ds027409.mongolab.com:27409/coffeeplaces");

exports.createUsers = function(userData, sessionID){
	console.log('[createUsers] session id:',sessionID,'userData:',userData);
	var users = {
        id_account: userData.id.toString(),
        id_session: sessionID.toString(),
		token: userData.token.toString(),
    };
	return new Users(users).save();
};

exports.getUsers = function(id) {
	return Users.findOne({id_session: id}).then(function(doc){
		var document = JSON.parse(JSON.stringify(doc));
        console.log('[getUsers] doc.id_session',document);
        console.log('[getUsers] userData.id_session ',id);
        if (document.id_session === id){
            console.log("id_session is ok");
            return Promise.resolve(document);
        } else {
            return Promise.reject("#INFO [db.js][getUser] id_session not equals or something wrong with token");
        }
    });
};
 
exports.checkUsers = function(userData) {
	return Users.find({token: userData.token}).then(function(doc){
			console.log('[checkUsers] doc.token ',doc.token);
			console.log('[checkUsers] userData.token ',userData.token);
            if (doc.token === userData.token){
				console.log("User password is ok");
				return Promise.resolve(doc);
			} else {
				return Promise.reject("#INFO [db.js][checkUser] Token not equals or something wrong with token");
			}
		});
};
function hash(text) {
	return crypto.createHash('sha1').update(text).digest('base64');
}