var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  req.session.plateIndex = 0;
  platesModel.getPlate({isChecked: true}, req.session.plateIndex, function(plate) {
    res.json(JSON.stringify(plate));
  });
});

router.post('/next', function(req, res){
  req.session.plateIndex++;
  platesModel.getPlate({}, req.session.plateIndex, function(plate) {
    res.json(JSON.stringify(plate));
  });
});

router.post('/previous', function(req, res){
  req.session.plateIndex--;
  platesModel.getPlate({}, req.session.plateIndex, function(plate) {
    res.json(JSON.stringify(plate));
  });
});

module.exports = router;
