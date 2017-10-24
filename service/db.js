var mongoose = require('mongoose');
var crypto = require('crypto');
var Users = require('../model/user.js');
var db = mongoose.connect('mongodb://127.0.0.1:27017/db_session');//("mongodb://user:password@ds027409.mongolab.com:27409/coffeeplaces");

exports.createUsers = function(userData, sessionID){
	var users = {
        id_account: userData.id,
        id_session: sessionID,
		token: userData.token,
    }
	return new Users(users).save();
}
 
exports.getUsers = function(id) {
	return Users.findOne({id_session: id}).then(function(doc){
       
        if (doc.id_session == id){
            console.log("id_session is ok");
            return Promise.resolve(doc);
        } else {
            return Promise.reject("#INFO [db.js][getUser] id_sessin not equals or something wrong with token");
        }
    });
}
 
exports.checkUsers = function(userData) {
	return Users.findOne({token: userData.token}).then(function(doc){
        
            if (doc.token == userData.token){
				console.log("User password is ok");
				return Promise.resolve(doc);
			} else {
				return Promise.reject("#INFO [db.js][checkUser] Token not equals or something wrong with token");
			}
		});
}
exports.getSessions = function(){
	return db.getSessions();
}
function hash(text) {
	return crypto.createHash('sha1').update(text).digest('base64');
}