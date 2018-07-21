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
	getSingleTranslation: getSingleTranslation
	
}

var translation_params = "(ID SERIAL PRIMARY KEY, txt TEXT, usr TEXT, score INTEGER, date TEXT)"

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
	let db_name = parseInt(req.body['hl_id'])
	// let translation = req.body['trans']
	// let user = req.body['user']
	// let score = req.body['score']
	// let date = req.body['date']
	console.log("req body: ", req.body);
	db.task(t => {
		console.log("Creating table if necessary: num", db_name);
		return t.none('CREATE TABLE IF NOT EXISTS num'+db_name+" "+translation_params)
			.then( () => {
				console.log("after creating table");
				return t.none('insert into num'+db_name+' (txt, usr, score, date)'+
					'values(${txt}, ${usr}, ${score},${date})', req.body);
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
	db.any('select * from num'+hl_id)
		.then(function (data) {
			res.status(200)
				.json({
					'status': 'success',
					'translations': data,
					'message': 'retrieved translations for headline '+hl_id
				})
			.catch(function (err) {
				return next(err);
			})
		})
}

function getSingleTranslation(req,res,next){

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
	let query = makePutHeadlinesSQLQuery(articles);
	db.any(query)
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

//THIS IS THE SQL COMMAND TO SEND TO CHECK FOR MULTIPLE VALUES EXISTING
// with data(first_name, last_name, uid)  as (
//    values
//       ( 'John', 'Doe', '3sldkjfksjd'),
//       ( 'Jane', 'Doe', 'adslkejkdsjfds')
// ) 
// insert into users (first_name, last_name, uid) 
// select d.first_name, d.last_name, d.uid
// from data d
// where not exists (select 1
//                   from users u2
//                   where u2.uid = d.uid);

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
	// let strChunks = [];
	// let strChunk = "";
	// for (var i = 0; i<str.length; i++) {
	// 	strChunk += str[i];
	// 	if ((str[i])==="'") {
	// 		strChunks.push(strChunk);
	// 		strChunk="";
	// 		console.log("string chunks: ",strChunks)
	// 	}
	// }
	// if(strChunks.)
	// let replacementString = strChunks.join("'");
	// if(strChunk != "") strChunks.push(strChunk);
	// console.log("replacementString! ", replacementString);
	let strChunks = str.split("'");
	let replString = strChunks.join("''");
	console.log("replacement String:", replString);
	return replString;
}