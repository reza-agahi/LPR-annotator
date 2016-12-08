var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  platesModel.plateInfo().then(function(plates) {
    if (req.session.plateIndex === undefined) {
      req.session.plateIndex = 0;
      for (var i = 0; i < plates.length; i++) {
        if(plates[i].isChecked == 0) {
          req.session.plateIndex = i;
          break;
        }
      }
    }
    var plate = plates[req.session.plateIndex];
    platesModel.boxesInfo(plate.id).then(function(boxes) {
      var plateInfo = { plate: plate, boxes: boxes };
      res.json(JSON.stringify(plateInfo));
    })
  })
});

router.post('/next', function(req, res){
  platesModel.plateInfo().then(function(plates) {
    if (req.session.plateIndex < plates.length-1) {
      req.session.plateIndex++;
    }
    var plate = plates[req.session.plateIndex];
    platesModel.boxesInfo(plate.id).then(function(boxes) {
      var plateInfo = { plate: plate, boxes: boxes };
      res.json(JSON.stringify(plateInfo));
    })
  })
});

router.post('/previous', function(req, res){
  platesModel.plateInfo().then(function(plates) {
    if (req.session.plateIndex > 0) {
      req.session.plateIndex--;
    }
    var plate = plates[req.session.plateIndex];
    platesModel.boxesInfo(plate.id).then(function(boxes) {
      var plateInfo = { plate: plate, boxes: boxes };
      res.json(JSON.stringify(plateInfo));
    })
  })
});

module.exports = router;
