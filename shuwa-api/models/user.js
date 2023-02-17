const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
	mobileNumber: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	hashedPassword: { type: String, required: true },
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
