const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema(
    {
        name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
    },	
    {
		timestamps: true,
	}
);
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin