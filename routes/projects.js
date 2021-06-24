var express = require('express');
var router = express.Router();

/* GET projects page. */
router.get('/', function(req, res, next) {
    res.render('projects', { title: 'Projects', desc: 'Some of the stuff I have been working on' });
});

module.exports = router;    