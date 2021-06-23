var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    let tools = [
        {name: 'Express'},
        {name: 'NodeJS'},
        {name: 'Handlebars'}];
  res.render('about', { title: 'About Me', tools: tools });
});

module.exports = router;
