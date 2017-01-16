var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  var data = req.body;
  var query = {annotated: false};

  platesModel.getFirstPlate(query, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

router.post('/next', function(req, res){
  platesModel.getNextPlate(true, req.session.plateId, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

router.post('/previous', function(req, res){
  platesModel.getPreviousPlate(true, req.session.plateId, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

router.post('/ith', function(req, res){
  var i = req.body.number;
  platesModel.getIthPlate(i, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

module.exports = router;
