const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
        role: {
			type: String,
			enum: ['admin', 'user'], // Define possible roles
			default: 'user' // Default role for new users
		  },
		profilePic: {
			type: String,
			default: "",
		},
        isBlock: {
			type: Boolean,
			default: false,
		},
    },	
    {
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;