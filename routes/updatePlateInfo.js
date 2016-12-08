var express = require('express');
var Q = express('q');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.put('/', function(req, res){
  var updatingPlate = req.body;

  var updatePlatePromise = [];
  platesModel.getTypeId(updatingPlate.plate.type).then(function(result){
    var typeId = result[0].id;
    platesModel.getDifficultiesId(updatingPlate.plate.difficulty).then(function(result){
      var difficultyId = result[0].id;
      platesModel.updatePlateInfo(updatingPlate.plate, typeId, difficultyId).then(function(x) {
        console.log(x);
      });
    });
  });

  var allBoxes = JSON.parse(JSON.stringify(updatingPlate.boxes));
  var newBoxes = [];
  var updatingBoxes = [];
  for (var i = 0; i < allBoxes.length; i++) {
    if(allBoxes[i].id === -1) {
      allBoxes[i].plateId = allBoxes[i].id;
      allBoxes[i].plateId = updatingPlate.plate.id;
      delete allBoxes[i].id;
      newBoxes.push(allBoxes[i]);
    } else {
      updatingBoxes.push(allBoxes[i]);
    }
  }

  var updateBoxInfoPromise = [];
  for (var i = 0; i < updatingBoxes.length; i++) {
    platesModel.updateBoxInfo(updatingBoxes[i]).then(function(x) {
      console.log(x);
    });
  }

  var insertBoxInfoPromise = [];
  for (var i = 0; i < newBoxes.length; i++) {
    platesModel.insertBoxInfo(newBoxes[i]).then(function(x) {
      console.log(x);
    });
  }

  res.send("just shut up");

  // Q.all(updatePlatePromise, insertBoxInfoPromise, updateBoxInfoPromise);

});

module.exports = router;
