var db = require('./queries');
var user_schema = require('./users').user_schema;

module.exports.register = function(req, res) {
	let user = new user_schema(req.body.username, req.body.email);
	user.create_salt_hash(req.body.password);

	db.create_user(user, (ret) => {

		if(ret['name'] == 'error') {
			res.status(200)
				.json({
					"message": db.postgres_error_msgs[ret['constraint']]
				})
		}
		else {
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
	console.log("trying to login");
	if(req.body.username != undefined) {
		console.log("username is " +req.body.username);
		db.find_user("username", req.body.username, req, res, login_cb);
	} else {
		db.find_user("email", req.body.email, req, res, login_cb);
	}
}

function login_cb(ret, req, res) {
	if(ret['name'] == 'error') {
		res.status(200)
			.json({
				"code": "wrong "+type,
				"message": db.postgres_error_msgs[ret['constraint']]
			});
	}
	else {
		user = new user_schema(ret[0]['username'], ret[0]['email']);
		user.hash = ret[0]['hash'];
		user.salt = ret[0]['salt'];

		if(user.check_valid_pw(req.body.password)) {
			let token = user.generate_jwt();

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