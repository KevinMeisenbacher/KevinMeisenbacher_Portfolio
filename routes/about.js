var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    let skills = [
        {name: 'HTML/HBS - Super neat at handling many elements'},
        {name: 'CSS - Able to organize every detail of a page and even create animations'},
        {name: 'JavaScript - Able to process input/output and fetch JSON data with APIs'},
        {name: 'Node/Express - What I used to put this site together!'},
        {name: 'PHP - Able to process multipage forms and handle databases'},
        {name: 'C# - I/O, multipage forms and APIs'},
        {name: 'ASP.NET - Databases, user accounts and online stores with all of the needed security'},
        {name: 'Java - My first language! I can use it for GUIs, APIs and databases'},
        {name: 'MYSQL - CRUD and using MYSQL databases in Java'},
        {name: 'SQL Server - CRUD, views, functions and using SQL Server in ASP'},
        {name: 'MongoDB - CRUD and using Mongo in MEAN stack'},
        {name: 'COBOL/JCL - Basic mainframe jobs'},
        {name: 'GML - Created sprites, objects, sounds, levels and states in a game that uses this language'}
    ];
  res.render('about', { title: 'About Me', tools: skills,
                        desc: 'Throughout college, I have worked on several projects to hone my skills and even learn new ones. ' +
                        'I can do software, front-end, back-end, databases and even some mainframe programming. ' +
                        'Front-end is what I have the most experience with, but I am able to fulfill many roles on a project. ' +
                        'Check out my Projects page to see some of the web work I have done!' });
});
module.exports = router;
