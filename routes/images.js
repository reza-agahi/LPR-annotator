var express = require('express');
var router = express.Router();

router.get('/assets/images/:name', function(req, res) {
  var image = '/assets/images/' + req.params.name;
  res.sendFile(image, function(err) {
    if(err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', image);
    }
  });
});

module.exports = router;
