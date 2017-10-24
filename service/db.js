var mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('../model/user.js');
var db = mongoose.connect('mongodb://127.0.0.1:27017/db_session');//("mongodb://user:password@ds027409.mongolab.com:27409/coffeeplaces");

exports.createUser = function(userData){
	var user = {
		id_account: userData.id_account,
		token: userData.token,
    }
	return new User(user).save();
}
 
exports.getUser = function(id_account) {
	return User.findOne(id_account);
}
 
exports.checkUser = function(userData) {
	return User.findOne({token: userData.token}).then(function(doc){
        
            if (doc.token == userData.token){
				console.log("User password is ok");
				return Promise.resolve(doc);
			} else {
				return Promise.reject("#INFO [db.js][checkUser] Token not equals or something wrong with token");
			}
		});
}
 
function hash(text) {
	return crypto.createHash('sha1').update(text).digest('base64');
}