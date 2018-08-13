var express = require('express');
var hl = require("../headlines");

var router = express.Router();

var db = require('../queries');
var auth = require('../authentication');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('before getHeadlinesAPI');
  hl.getHeadlinesAPI();
  console.log('after getHeadlinesAPI');
    res.render('index', { title: 'Express' });
});


router.get('/api/enn/headlines/many/:lowestID', db.getHeadlines);
router.get('/api/enn/headlines/:id', db.getHeadline);
router.post('/api/enn/translation', db.putTranslation);
router.get('/api/enn/translation/:hlID', db.getTranslations);
router.get('/api/enn/translation/:hlID/:id', db.getSingleTranslation);
router.post('/api/enn/translation/vote', db.vote);
router.post('/api/enn/authIDToken', auth.authIDToken);


module.exports = router;
