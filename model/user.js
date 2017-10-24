var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    id_account : {
        type: String,
        unique: true,
        required: true
    },
    id_session :{
        type: String,
        unique: true,
        required: true
    },
    token : {
        type: String,
        unique: true,
        required: true
    }
});
module.exports = mongoose.model('Users', Users);