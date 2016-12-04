var express = require('express');
var router = express.Router();

var passport = require('../middlewares/middleAuth');

/* GET home page. */
router.get('/', passport.isLoggedIn, function(req, res) {
  console.log("chete!");
  res.render('index', {});
});

module.exports = router;
