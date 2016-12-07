var express = require('express');
var router = express.Router();

var login = require('./login');
var profile = require('./profile');
var logout = require('./logout');
var passport = require('../middlewares/authentication');
var platesInfo = require('./platesInfo');

router.use(passport.initialize());
router.use(passport.session());
router.use('/login', login);
router.use('/profile', profile);
router.use('/logout', logout);
router.use('/platesInfo', platesInfo);

/* GET home page. */
router.get('/', passport.isLoggedIn, function(req, res) {
  res.render('index', {});
});

module.exports = router;
