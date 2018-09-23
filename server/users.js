var crypto = require('crypto');

var jwt = require('jsonwebtoken');

function user_schema(username, email) {
	this.email = email;
	this.username = username;
}

user_schema.prototype.create_salt_hash = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

user_schema.prototype.check_valid_pw = function(password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash == hash;
}

user_schema.prototype.generate_jwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);


	return jwt.sign({
		_id: this._id,
		email: this.email,
		user: this.user,
		exp: parseInt(expiry.getTime() / 1000),
	}, "MY_SECRET");

}

module.exports = {
	user_schema: user_schema
}