var express = require('express');
var hl = require("../headlines");

var router = express.Router();

var db = require('../queries');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('before getHeadlinesAPI');
  hl.getHeadlinesAPI();
  console.log('after getHeadlinesAPI');
    res.render('index', { title: 'Express' });
});


router.get('/api/enn/headlines', db.getHeadlines);
router.post('/api/enn/translation', db.putTranslation);

module.exports = router;
