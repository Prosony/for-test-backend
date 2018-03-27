const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://185.77.204.249:27017/db_session')


module.exports = mongoose


exports.createUsers =  (userData, sessionID) => {
    console.log('#INFO [db.js][createUsers] session id:',sessionID,'userData:',userData);
    return new Users({
        id_account: userData.id,
        id_session: sessionID,
        token: userData.token
    }).save();

};
exports.getUsersByIdSession = (id) => {
    return Users.findOne({id_session: id})
};
exports.getUsersById = (id) => {
    return Users.findOne({id_account : id})

};

exports.checkUsers = (data) => {
    return Users.find({token : data.token})
};

exports.logout = (idSession) => {
    return Users.deleteOne({id_session : idSession})
};

function hash(text) {
	return crypto.createHash('sha1').update(text).digest('base64');
    }