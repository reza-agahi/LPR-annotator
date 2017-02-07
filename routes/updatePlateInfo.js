var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;

var platesModel = require('../models/plates.js');

router.put('/', function(req, res){
  var updatingPlate = req.body;

  if (updatingPlate.annotated === true && updatingPlate.annotator === null) {
    updatingPlate.annotator = req.user.cn;
  }
  updatingPlate.lastModifiedDateTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' });
  updatingPlate._id = new objectId(updatingPlate._id);
  platesModel.updatePlate({'_id': updatingPlate._id}, updatingPlate, function() {
    res.send("plate is updated successfully");
  });

});

module.exports = router;
