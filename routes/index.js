var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kevin Meisenbacher', 
                        desc: 'A programming student with an eye for quality and a knack for creating snappy pages' });
});

module.exports = router;
