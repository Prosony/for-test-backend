var mongoose = require('mongoose');

var User = new mongoose.Schema({
    id_account : {
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

module.exports = mongoose.model('User', User);