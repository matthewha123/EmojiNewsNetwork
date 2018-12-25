var db = require('./queries');
var user_schema = require('./users').user_schema;
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res) {
	let user = new user_schema(req.body.username, req.body.email);
	user.create_salt_hash(req.body.password);

	db.create_user(user, (ret) => {
		if(ret.hasOwnProperty('error')) {
			res.status(400)
				.json({
					"message": ret['error']
				})
		}
		else {
			user.set_id(ret.id)
			let token = user.generate_jwt();

			console.log(token)
			res.status(200)
			.json({
				"token": token,
				"message": "Registration Successful"
			})
		}

	});

}

module.exports.login = function(req, res) {
	console.log("LOGGING IN ", req.body)	
	if(req.body.username != undefined) {
		console.log("username is " +req.body.username);
		db.find_user("username", req.body.username, req, res, login_cb);
	} else {
		db.find_user("email", req.body.email, req, res, login_cb);
	}
}

module.exports.verify = function(req, res) {
	//verify that the token's email, id, and user match
	//verify the signature
	//then return okay
	if(req.body.token != undefined) {
		console.log("Received token", req.body.token);
		//need to get the user specified by the request

		let decoded = jwt.decode(req.body.token);
		if(decoded.username != undefined) {
			db.find_user("username", decoded.username, req, res, verify_cb);
		} else {
			res.status(400)
			.json({
				"message": "Malformed JWT"
			});
		}
	} else {
		res.status(400)
		.json({
			"message": "No JWT token"
		})
	}

}

function verify_cb(ret, req, res) {
	if(ret.hasOwnProperty('error')) {
		res.status(400)
			.json({
				"message": ret['error']
			});
	}
	else {
		user = new user_schema(ret[0]['username'], ret[0]['email']);
		user._id = ret[0]['id'];
		let valid = user.verify_jwt(req.body.token);
		if(valid === true) {
			res.status(200)
				.json({
					"message": "Successfully Verified",
					"user": user
				});
		} else {
			res.status(400)
				.json({
					"message": "Invalid Token, Please Sign In Again"
				});
		}
	}
}

function login_cb(ret, req, res) {
	if(ret.hasOwnProperty('error')) {
		res.status(200)
			.json({
				"message": ret['error']
			});
	}
	else {
		user = new user_schema(ret[0]['username'], ret[0]['email']);
		user.hash = ret[0]['hash'];
		user.salt = ret[0]['salt'];
		user.set_id(ret[0]['id'])

		if(user.check_valid_pw(req.body.password)) {
			let token = user.generate_jwt();
			console.log("LOGIN SUCCESSFUL", user)
			console.log(token)
			res.status(200)
			.json({
				"token": token,
				"message": "Login For User:"+"Successful",
				"user_data": ret[0]
			})
		} else {
			res.status(200)
				.json({
					"code": "wrong password",
					"message": "Wrong password dumbass"
				})
		}

	}
}