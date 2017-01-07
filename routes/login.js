var express = require('express');
var router = express.Router();

var passport = require('../middlewares/authentication');

// handles authentication with passport
router.post('/',
  passport.authenticate('ldapauth',
    {successRedirect: '/', failureRedirect: '/login'}
  )
);

/* GET home page. */
router.get('/', function(req, res){
  res.render('login', {});
});

module.exports = router;
