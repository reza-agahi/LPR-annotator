var express = require('express');
// var Q = express('q');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

var platesModel = require('../models/plates.js');

router.put('/', function(req, res){
  var updatingPlate = req.body;
  console.warn(updatingPlate.image);
  updatingPlate._id = new objectId(updatingPlate._id);
  platesModel.updatePlate({'_id': updatingPlate._id}, updatingPlate);
});

module.exports = router;
