var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  var data = req.body;
  var query = {state: 'initial'};

  platesModel.getFirstPlate(query, function(plate) {
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
  platesModel.getNextPlate(query, req.session.plateId, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

router.post('/previous', function(req, res){
  var data = req.body;
  query = { $or: [{state: 'initial'}, {state: 'annotated'}]};

  platesModel.getPreviousPlate(query, req.session.plateId, function(plate) {
    req.session.plateId = plate._id;
    res.json(JSON.stringify(plate));
  });
});

module.exports = router;
