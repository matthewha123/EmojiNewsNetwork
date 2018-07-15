var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:celestial1@localhost:5432/enn';
var db = pgp(connectionString);

module.exports = {
	getHeadlines: getHeadlines,
	
}

function getHeadlines(req,res,next) {
	db.any('select * from headlines')
		.then(function (data) {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved headlines'
				});
		})
		.catch(function (err) {
			return next(err);
		})
}