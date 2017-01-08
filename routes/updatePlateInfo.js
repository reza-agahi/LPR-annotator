var express = require('express');
// var Q = express('q');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

var platesModel = require('../models/plates.js');

router.put('/', function(req, res){
  var updatingPlate = req.body;
  var doUpdate;
  if (updatingPlate.plateState === 'initial') {
    doUpdate = false;
  } else if(updatingPlate.plateState === 'annotated') {
    doUpdate = true;
  }


  updatingPlate.annotator = req.user.cn;
  updatingPlate.lastModifiedDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' });
  updatingPlate._id = new objectId(updatingPlate._id);
  if (doUpdate) {
    platesModel.updatePlate({'_id': updatingPlate._id}, updatingPlate, function() {
      res.send("plate is updated successfully");
    });
  } else {
    res.send("plate is did'nt updated successfully");
  }
});

module.exports = router;
