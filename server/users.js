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

user_schema.prototype.set_id = function(_id) {
	this._id = _id
}

user_schema.prototype.generate_jwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);


	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: parseInt(expiry.getTime() / 1000),
	}, "MY_SECRET"); //TODO MAKE SURE TO STORE THIS AS AN ENVIRONMENT VARIABLE!!!

}

user_schema.prototype.verify_jwt = function(token) {
	let valid = false;
	jwt.verify(token, "MY_SECRET", (err, decoded) => {
		if(!err) {
			console.log("decoded from token", decoded, "user", this);

			valid = (decoded._id == this._id) && (decoded.email == this.email) && (decoded.username) == (this.username)
			//if !valid here, either wrong username, email or wrong _id
		} else {
			console.log("Invalid Token!");
			//ENTER HERE WHEN wrong signature, or past expiry
		}

	});

	return valid;
}

module.exports = {
	user_schema: user_schema
}