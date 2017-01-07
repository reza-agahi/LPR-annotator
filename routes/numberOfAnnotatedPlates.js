var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  platesModel.numberOfAnnotatedPlates(function(err, numberOfAnnotatedPlates) {
    res.json({numberOfAnnotatedPlates: numberOfAnnotatedPlates});
  });
});


module.exports = router;
