var express = require('express');
var router = express.Router();

router.get('/assets/images/:name', function(req, res) {
  var imageName = '/assets/images/' + req.params.name;
  res.sendFile(imageName, function(err) {
    if(err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', imageName);
    }
  });
});

module.exports = router;
