var express = require('express');
var router = express.Router();

var typesModel = require('../models/types.js');

router.post('/', function(req, res){
  typesModel.typesInfo().then(function(types) {
    res.json(JSON.stringify(types));
  });
});

module.exports = router;
