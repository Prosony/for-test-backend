const
	mongoose = require('../service/DataBase')
	UsersSchema = new mongoose.Schema({
		id_account: {
			type: String,
			required: true
		},
		id_session: {
			type: String,
			unique: true,
			required: true
		},
		token: {
			type: String,
			unique: true,
			require: true
		}
	})

module.exports = mongoose.model('Users', UsersSchema)