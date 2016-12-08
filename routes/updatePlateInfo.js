var express = require('express');
var router = express.Router();

var platesModel = require('../models/plates.js');

router.put('/', function(req, res){
  var updatingPlate = req.body;
  // platesModel.getTypeId(updatingPlate.plate.type).then(function(result){
  //   var typeId = result[0].id;
  //   platesModel.getDifficultiesId(updatingPlate.plate.difficulty).then(function(result){
  //     var difficultyId = result[0].id;
  //     platesModel.updatePlateInfo(updatingPlate.plate, typeId, difficultyId).then(function(x) {
  //       res.send("plate is successfully updated");
  //     });
  //   });
  // });
  var updatingBoxes = JSON.parse(JSON.stringify(updatingPlate.boxes));
  var newBoxes = [];
  for (var i = 0; i < updatingBoxes.length; i++) {
    if(updatingBoxes[i].id === -1) {
      updatingBoxes[i].plateId = updatingBoxes[i].id;
      updatingBoxes[i].plateId = updatingPlate.plate.id;
      delete updatingBoxes[i].id;
    }
  }
    console.warn(updatingBoxes);
  // platesModel.updateBoxesInfo(boxes).then(function(x) {
  //
  // });
});

module.exports = router;
