var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    let skills = [
        {name: 'HTML'},
        {name: 'CSS - Able to organize every detail of a page and even create animations'},
        {name: 'JavaScript - Able to process input/output and fetch JSON data with APIs'},
        {name: 'Express'},
        {name: 'NodeJS - The framework I used for this site!'},
        {name: 'PHP - Able to process multipage forms and handle databases'},
        {name: 'C# - I/O, multipage forms and APIs'},
        {name: 'ASP.NET - Databases, user accounts and online stores with all of the needed security'},
        {name: 'Java - My first language! I can use it for GUIs, APIs and databases'},
        {name: 'MYSQL'},
        {name: 'SQL Server'},
        {name: 'MongoDB'},
        {name: 'COBOL'},
        {name: 'JCL'}];
  res.render('about', { title: 'About Me', tools: skills,
                        desc: 'Throughout college, I have worked on several projects to hone my skills and even learn new ones. ' +
                        'I can do software, front-end, back-end, databases and even some mainframe programming. ' +
                        'Front-end is what I have the most experience with, but I am able to fulfill many roles on a project. ' +
                        'Check out my Projects page to see some of the web work I have done!' });
});

module.exports = router;
