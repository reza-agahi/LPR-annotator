var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  var data = req.body;
  var query;
  if (data.plateState === 'initial') {
    query = {state: 'initial'};
  } else if(data.plateState === 'annotated') {
    query = {state: 'annotated'};
  }
  req.session.plateIndex = 0;
  platesModel.getPlate(query, req.session.plateIndex, true, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

router.post('/next', function(req, res){
  var data = req.body;
  var query;
  if (data.plateState === 'initial') {
    query = {state: 'initial'};
  } else if(data.plateState === 'annotated') {
    query = {state: 'annotated'};
  }
  req.session.plateIndex++;
  platesModel.getPlate(query, req.session.plateIndex, true, function(plate, plateIndex) {
    req.session.plateIndex = plateIndex;
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

router.post('/previous', function(req, res){
  var data = req.body;
  var query;
  if (data.plateState === 'initial') {
    query = {state: 'initial'};
  } else if(data.plateState === 'annotated') {
    query = {state: 'annotated'};
  }
  req.session.plateIndex--;
  platesModel.getPlate(query, req.session.plateIndex, false, function(plate, plateIndex) {
    req.session.plateIndex = plateIndex;
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

module.exports = router;
