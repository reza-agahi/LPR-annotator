var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.post('/', function(req, res){
  platesModel.plateInfo().then(function(plates) {
    var plate = plates[0];
    platesModel.boxesInfo(plate.id).then(function(boxes) {
      var plateInfo = { plate: plate, boxes: boxes };
      res.json(JSON.stringify(plateInfo));
    })
  })
});

module.exports = router;
