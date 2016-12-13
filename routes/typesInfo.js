var express = require('express');
var router = express.Router();

// var typesModel = require('../models/types.js');

var types = [
  {
    name: "نوع یک",
    image: "./assets/images/samplePlate.png"
  },
  {
    name: "نوع دو",
    image: "./assets/images/samplePlate.png"
  }
];

router.post('/', function(req, res){
  // typesModel.typesInfo().then(function(types) {
    res.json(JSON.stringify(types));
  // });
});

module.exports = router;
