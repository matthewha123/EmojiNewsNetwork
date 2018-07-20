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
	putTranslation: putTranslation,
	putHeadlines: putHeadlines,
	
}

var translation_params = "(txt TEXT, usr TEXT, score INTEGER, date TEXT)"

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

function putTranslation(req,res,next) {
	let db_name = parseInt(req.body['id'])
	// let translation = req.body['trans']
	// let user = req.body['user']
	// let score = req.body['score']
	// let date = req.body['date']

	db.task(t => {
		return t.none('CREATE TABLE IF NOT EXISTS num'+db_name+translation_params)
			.then( () => {
				return t.none('insert into num'+db_name+' (txt, usr, score, date)'+
					'values(${translation}, ${usr}, ${score},${date})', req.body);
			});
	})
	.then(events => {
		res.status(200)
			.json({
				status: 'success',
				data: req.body,
				message: 'posted',
			});
	})
	.catch(error => {
		return next(error);
	});
}


function putHeadlines(articles) {
	let first_hl = articles[0]['title'];
	// db.task(t => {
	// 	t.any('select 1 from headlines where txt = '+first_hl+" limit 1;")
	// 		.then(function (data) {
	// 			console.log('received before???', data);
	// 			console.log(articles);
	// 		});
	// });

	db.any("select * from headlines where txt = "+"'"+first_hl+"'")
		.then(function(data) {
			console.log('received data', data);
		});
	console.log('first headline', first_hl);
}



	// db.none('CREATE TABLE IF NOT EXISTS num'+db_name+" "+translation_params)
	// 	.then(function() {
	// 		res.status(200)
	// 		.json({
	// 			status:'success',
	// 			request: req.body
	// 		})
	// 	})






	// res.status(200)
	// .json({
	// 	status:'success',
	// 	request: req.body
	// })
