var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/enn/headlines', db.getHeadlines);
router.post('/api/enn/translation', db.putTranslation);

module.exports = router;
