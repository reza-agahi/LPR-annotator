var express = require('express');
var router = express.Router();

var login = require('./login');
var profile = require('./profile');
var logout = require('./logout');
var passport = require('../middlewares/authentication');
var plateInfo = require('./plateInfo');
var updatePlateInfo = require('./updatePlateInfo');
var typesInfo = require('./typesInfo');
var difficultiesInfo = require('./difficultiesInfo');
var images = require('./images');

router.use(passport.initialize());
router.use(passport.session());
router.use('/login', login);
router.use('/profile', profile);
router.use('/logout', logout);
router.use('/plateInfo', plateInfo);
router.use('/updatePlateInfo', updatePlateInfo);
router.use('/typesInfo', typesInfo);
router.use('/difficultiesInfo', difficultiesInfo);
router.use('/', images);

/* GET home page. */
router.get('/', passport.isLoggedIn, function(req, res) {
  res.render('index', {});
});

module.exports = router;
