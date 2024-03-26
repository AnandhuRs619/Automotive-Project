const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
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
			default: 'user' // Default role for new users
		  },
		profilePic: {
			type: [String],
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