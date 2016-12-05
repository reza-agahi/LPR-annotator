var express = require('express');
var router = express.Router();

var passport = require('../middlewares/authentication');

router.get('/', passport.isLoggedIn, function(req, res){
    res.render('profile', { user: req.user });
  }
);

module.exports = router;
