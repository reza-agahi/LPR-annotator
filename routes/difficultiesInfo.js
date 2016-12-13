var express = require('express');
var router = express.Router();

// var difficultiesModel = require('../models/difficulties.js');

var difficulties = [
  "معمولی",
  "دشوار"
];

router.post('/', function(req, res){
  // difficultiesModel.difficultiesInfo().then(function(difficulties) {
    res.json(JSON.stringify(difficulties));
  // });
});

module.exports = router;
