var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:celestial1@localhost:5432/enn';
var db = pgp(connectionString);


const postgres_error_msgs = {
	'register_email_exists': 'A User With That Email Already Exists',
	'register_username_exists': 'A User With That UserName Already Exists',
	'login_email_notexists': 'There is no user with that email',
	'login_username_notexists': 'There is no user with that username',
}

module.exports = {
	getHeadlines: getHeadlines,
	getHeadline: getHeadline,
	putTranslation: putTranslation,
	putHeadlines: putHeadlines,
	getTranslations: getTranslations,
	getSingleTranslation: getSingleTranslation,
	vote: vote,
	find_user: find_user,
	create_user: create_user,
	postgres_error_msgs: postgres_error_msgs
	
}

var translation_params = "(ID SERIAL PRIMARY KEY, txt TEXT, usr TEXT, score INTEGER, date timestamp with time zone)"

function getHeadlines(req,res,next) {

	console.log("Request parms", req.params);

	let lowestID = req.params['lowestID'];

	let whereConditional = (lowestID === '-1') ? ' ' : ' where ID < '+lowestID+' ';

	db.any('select * from headlines'+whereConditional+'ORDER BY ID DESC LIMIT 10')
		.then(function (data) {
			console.log("RESPONSE DATA: ", data);
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

function getHeadline(req,res,next) {
	let hl_id = req.params['id'];
	db.one('select * from headlines where ID = '+hl_id)
		.then((data) => {
			res.status(200)
				.json({
					status: 'success',
					data:data,
					message: 'Retrieved single headline id: '+hl_id
				})
		})
		.catch(function (err) {
			console.log(err instanceof pgp.errors.QueryResultError);
			res.status(404)
				.json({
					status: 'not found',
					message: 'Headline '+hl_id+' not found'
				});

		})
}


function putTranslation(req,res,next) {
	let db_name = parseInt(req.body['hl_id'])

	console.log("req body: ", req.body);

	db.none('insert into translations (txt, score, usr, uid, date, hl_id)'+
				'values(${txt}, ${score}, ${usr}, ${uid}, now(), ${hl_id})', req.body)
		.then(() => {
			res.status(200)
				.json({
					status: 'sucess',
					message: 'put the following translation',
					data: req.body
				});
		})
		.catch(error => {
			return next(error);
		});
}

function getTranslations(req,res,next) {
	let hl_id = parseInt(req.params.hlID);
	console.log('getting translations from headline id:', hl_id);

	db.any('select * from translations where hl_id='+hl_id)
		.then((data) => {
			res.status(200)
				.json({
					status:'success',
					translations:data,
					message: 'Retrieved translations for head line id: '+hl_id
				});
		})
		.catch(error => {
			return next(error);
		});

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
	let modifier = parseInt(mod);
	console.log("after modifier", modifier);
	let trans_id = parseInt(req.body['trans_id']);
	console.log("after trans_id ", trans_id);

	db.none('UPDATE translations SET score = score +'+modifier+"WHERE ID = "+trans_id)
		.then(() => {
			console.log("done the updating");
			res.status(200)
			.json({
				status: 'success',
				message: 'Updated translation '+trans_id+" with mod: "+modifier
			})
		})
		.catch((err) => {
			return next(err);
		});
}

function find_user(type, val, req, res, cb) {
	console.log("Finding user by", type, val)
	db.any("select * from users where $1:name = "+"'"+val+"';", [type])
		.then((data) => {
			cb(data, req, res);
		})
	.catch((err) => {
		console.log("Could not find user with", type, val)
		let constraint = (type == 'email') ? postgres_error_msgs['login_email_notexists'] : postgres_error_msgs['login_username_notexists']
			cb({'error': constraint}, req, res);
	})
}

function create_user(usr, cb) {

	console.log("Attempting to create user", usr)
	db.one('insert into users (${this:name}) values(${this:csv}) RETURNING ID', usr)
		.then((data) => {
			console.log("REGISTRATION SUCCESSFUL!");
			console.log("ID of created user", data);
			cb(data);
		})
	.catch((err) => {
		let error_msg = "";
		console.log(err.message || err);
		if((err.message || err) == "duplicate key value violates unique constraint \"users_username_key\"") {
			error_msg = postgres_error_msgs["register_username_exists"];
		} else {
			error_msg = postgres_error_msgs["register_email_exists"];
		}
		cb({"error": error_msg});
	});



}