var express = require('express');
var router = express.Router();

router.get('/',
  require('connect-ensure-login').ensureLoggedIn('/login'), function(req, res){
    res.render('profile', { user: req.user });
  }
);

module.exports = router;
