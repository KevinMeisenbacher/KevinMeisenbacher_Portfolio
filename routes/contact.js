var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('contact', {
        name: "Kevin Meisenbacher",
        email: "kevinmeisenbacher@gmail.com",
        phonenumber: "(705)607-9097"
    });
});

module.exports = router;