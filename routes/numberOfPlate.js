var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  platesModel.getNumberOfPlate(req.session.plateId, function(err, numberOfPlate) {
    res.json({numberOfPlate: numberOfPlate});
  });
});


module.exports = router;
