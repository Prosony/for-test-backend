let mongoose = require('mongoose');
let crypto = require('crypto');
let Users = require('../model/user.js');
mongoose.Promise = global.Promise;
let db = mongoose.connect('mongodb://127.0.0.1:27017/db_session', { useMongoClient: true });//("mongodb://user:password@ds027409.mongolab.com:27409/coffeeplaces");

exports.createUsers = function(userData, sessionID){
	console.log('#INFO [db.js][createUsers] session id:',sessionID,'userData:',userData);
	let users = {
        id_account: userData.id.toString(),
        id_session: sessionID.toString(),
		token: userData.token.toString(),
    };
	return new Users(users).save();
};

exports.getUsersByIdSession = function(id) {
	return Users.findOne({id_session: id}).then(function(doc){
		let document = JSON.parse(JSON.stringify(doc));
        console.log('#INFO [db.js][getUsersByIdSession] document',document);
        console.log('#INFO [db.js][getUsersByIdSession] userData.id_session ',id);

        if (document !== null && document !== undefined){
            if (document.id_session === id){
                console.log("id_session is ok");
                return Promise.resolve(document);
            } else {
                return Promise.reject("#INFO [db.js][getUsersByIdSession] id_session not found");
            }
        }else{
            console.log('result is null');
            return Promise.reject("#INFO [db.js][getUsersByIdSession] account not found");
        }

    });
};

exports.getUsersById = function(id) {
    return Users.findOne({id_account: id}).then(function(doc){
        let document = JSON.parse(JSON.stringify(doc));
        console.log('[getUsersById] document: ',document);
        console.log('[getUsersById] param id: ',id);
        if (document !== null && document !== undefined){
            if (document.id_account === id){
                console.log("#INFO [db.js][getUsersById] id_account is ok");
                return Promise.resolve(document);
            } else {
                return Promise.reject("#INFO [db.js][getUsersById] id_account not found");
            }
        }else{
            return Promise.reject("#INFO [db.js][getUsersById] account not found");
        }

    });
};
 
exports.checkUsers = function(userData) {
	return Users.find({token: userData.token}).then(function(doc){
			console.log('#INFO [db.js][checkUsers] doc.token ',doc.token);
			console.log('#INFO [db.js][checkUsers] userData.token ',userData.token);
            if (doc.token === userData.token){
				console.log("#INFO [db.js]User password is ok");
				return Promise.resolve(doc);
			} else {
				return Promise.reject("#INFO [db.js][checkUser] Token not equals or something wrong with token");
			}
		});
};

exports.logout = function (idSession) {
    return Users.deleteOne({id_session: idSession}, function (error) {
        if (!error) {
            console.log('#INFO [db.js][logout] delete success!');
        } else {
            console.log('#INFO [db.js][logout] error delete: ', error);

        }
    });
};

function hash(text) {
	return crypto.createHash('sha1').update(text).digest('base64');
    }