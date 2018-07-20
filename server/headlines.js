var apiKey = "dbf968738ea34211b794462cc575b929";
var pageSize = "100"
var url = "https://newsapi.org/v2/top-headlines?pageSize="+pageSize+"&apiKey="+apiKey;
const https = require('https');
url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=dbf968738ea34211b794462cc575b929';

var request = require('request');

var db = require('./queries');

function getHeadlinesAPI() {
	console.log('in getHeadlinesAPI');
	request(url, (err, resp, body) => {
		console.log('error:', err);
		console.log('statusCode:', resp & resp.statusCode);
		let articles = JSON.parse(body)['articles'];
		console.log('body:', articles );
		db.putHeadlines(articles);
	});
}

module.exports = {
	getHeadlinesAPI: getHeadlinesAPI,
}