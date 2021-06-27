var express = require('express');
var router = express.Router();

/* GET projects page. */
router.get('/', function(req, res, next) {
    res.render('projects', { title: 'Projects', 
    desc: 'If you would like access to my repos, please ask  and I might grant access if I can trust you. ' + 
    'Just trying to make sure random people do not mess with my stuff :)' });
});

module.exports = router;    