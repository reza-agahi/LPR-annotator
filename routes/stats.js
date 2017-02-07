var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  platesModel.stats(function(err, stats) {
    res.json({stats: stats});
  });
});


module.exports = router;
