var express = require('express');
var router = express.Router();

var passport = require('../middlewares/middleAuth');

// handles authentication with passport
router.post('/',
  passport.authenticate('local',
    {successRedirect: '/', failureRedirect: '/login'}
  )
);

/* GET home page. */
router.get('/', function(req, res){
  res.render('login');
});

module.exports = router;
