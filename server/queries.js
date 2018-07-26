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
	getTranslations: getTranslations,
	getSingleTranslation: getSingleTranslation,
	vote: vote
	
}

var translation_params = "(ID SERIAL PRIMARY KEY, txt TEXT, usr TEXT, score INTEGER, date timestamp with time zone)"

function getHeadlines(req,res,next) {
	db.any('select * from headlines ORDER BY ID DESC LIMIT 5')
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
	let db_name = parseInt(req.body['hl_id'])

	console.log("req body: ", req.body);
	db.task(t => {
		console.log("Creating table if necessary: num", db_name);
		return t.none('CREATE TABLE IF NOT EXISTS num'+db_name+" "+translation_params)
			.then( () => {
				console.log("after creating table");
				return t.none('insert into num'+db_name+' (txt, usr, score, date)'+
					'values(${txt}, ${usr}, ${score}, now())', req.body);
			})
			.catch(error => {
				return next(error);
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

function getTranslations(req,res,next) {
	let hl_id = parseInt(req.params.hlID);
	console.log('getting translations from headline id:', hl_id);
	let qq = "SELECT to_regclass('enn.num"+hl_id+"'"+");";

	db.task(t => {
		return t.any("SELECT relname FROM pg_class WHERE relname = 'num"+hl_id+"';")
			.then( (data) => {
				if(data.length != 0) {
					return t.any('select * from num'+hl_id)
							.then(function (data) {
								res.status(200)
									.json({
										'status': 'success',
										'translations': data,
										'message': 'retrieved translations for headline '+hl_id
									});
							})
								.catch(function (err) {
									return next(err);
								})
				}
				else {
					res.status(200)
						.json({
							'status': 'sucess',
							'translations': [],
							'message': 'no translations!'
						});
				}
			})
			.catch(function (err) {
				return next(err);
			})
	})


}

function getSingleTranslation(req,res,next){

}


function putHeadlines(articles) {

	let query = makePutHeadlinesSQLQuery(articles);
	db.any(query)
		.then(function(data) {
			console.log('received data', data);
		});
}


function makePutHeadlinesSQLQuery(articles) {
	let query = "with data(txt, publisher, url) as ( values "

	for(art of articles) {
		console.log('object: ', art);
		let txt = escapeQuotesForQuery(art['title']);
		let pub = escapeQuotesForQuery(art['source']['name']);
		let url = art['url'];
		query += "( '"+txt+"', '"+pub+"', '"+url+"'"+")," 
	}
	query = query.slice(0,-1);
	// console.log('query after values: ', query);
	query += ")";

	query += " insert into headlines (txt, publisher, url) select d.txt, d.publisher, d.url from data d where not exists (select 1 from headlines entry where entry.txt = d.txt);"

	console.log("final query: ", query);
	return query;
}

function escapeQuotesForQuery(str) {

	let strChunks = str.split("'");
	let replString = strChunks.join("''");
	console.log("replacement String:", replString);
	return replString;
}

function createTranslationDB(db_name) {
	t.none('CREATE TABLE IF NOT EXISTS num'+db_name+" "+translation_params)
			.then( () => {
				console.log("after creating table");
				return t.none('insert into num'+db_name+' (txt, usr, score, date)'+
					'values(${txt}, ${usr}, ${score}, now())', req.body);
			})
			.catch(error => {
				return next(error);
			});
}

function vote(req,res,next) {
	console.log(req.body);
	let mod = parseInt(req.body['modifier']);
	console.log("after mod");
	let modifier = (mod === 1) ? "+ 1" : "- 1";
	console.log("after modifier", modifier);
	let db_name = 'num'+parseInt(req.body['hl_id']);
	console.log("after db_name", db_name);
	let trans_id = parseInt(req.body['trans_id']);
	console.log("after trans_id ", trans_id);
	let query = "UPDATE "+db_name+" SET score = score "+modifier+" WHERE ID = "+trans_id;

	console.log("voting with params:: ", modifier, db_name, trans_id);

	db.none(query)
		.then(() => {
			console.log("done the query:: ", query);
			res.status(200)
			.json({
				status: 'success',
				message: 'query: '+query
			})
		})
		.catch((err) => {
			return next(err);
		})
}