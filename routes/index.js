var express = require('express');
var router = express.Router();
var path = require('path');

// Create routers to connect to each page
var aboutRouter = require('./about');
var projectsRouter = require('./projects');
var contactRouter = require('./contact');

// Use each router
router.use('/about', aboutRouter);
router.use('/projects', projectsRouter);
router.use('/contact', contactRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kevin Meisenbacher', 
                        desc: 'A programming student with an eye for quality and a knack for creating snappy pages' });
});

module.exports = router;
