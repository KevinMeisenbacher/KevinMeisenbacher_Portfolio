var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    let tools = [
        {
            name: 'HTML',
            name: 'CSS',
            name: 'JavaScript'
        },
        {
            name: 'Express',
            name: 'NodeJS',
        },
        {
            name: 'C#',
            name: 'ASP.NET',
            name: 'Java',
        },
        {
            name: 'MYSQL',
            name: 'SQL Server',
            name: 'MongoDB'
    },
        {
            name: 'COBOL',
            name: 'JCL'
        }
    ];

    let skillSets = [
        frontEnd = tools[0],
        fullStack = tools[1],
        backEnd = tools[2],
        database = tools[3],
        mainframe = tools[4]
    ];
  res.render('about', { title: 'About Me', skillSets: skillSets, tools: tools });
});

module.exports = router;
