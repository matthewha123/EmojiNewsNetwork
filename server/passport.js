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