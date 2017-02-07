var express = require('express');
var router = express.Router();

var login = require('./login');
var profile = require('./profile');
var logout = require('./logout');
var passport = require('../middlewares/authentication');
var plateInfo = require('./plateInfo');
var updatePlateInfo = require('./updatePlateInfo');
var typesInfo = require('./typesInfo');
var difficultiesInfo = require('./difficultiesInfo');
var images = require('./images');
var numberOfAnnotatedPlates = require('./numberOfAnnotatedPlates');
var numberOfPlate = require('./numberOfPlate');
var stats = require('./stats');

router.use(passport.initialize());
router.use(passport.session());
router.use('/login', login);
router.use('/profile', profile);
router.use('/logout', logout);
router.use('/plateInfo', plateInfo);
router.use('/updatePlateInfo', updatePlateInfo);
router.use('/typesInfo', typesInfo);
router.use('/difficultiesInfo', difficultiesInfo);
router.use('/numberOfAnnotatedPlates', numberOfAnnotatedPlates);
router.use('/numberOfPlate', numberOfPlate);
router.use('/stats', stats);
// TODO: remove these two!
router.use('/', images);

var indexObj = {
  helpText: {
    add: "Ctrl + Alt",
    remove: "Delete",
    removeAll: "Ctrl + Delete",
    goto: "Ctrl + g",
    confirm: "Enter"
  },
  ignoreText: "قابل برچسب زدن نیست",
  progressbarTitle: "درصد"
}

/* GET home page. */
router.get('/', passport.isLoggedIn, function(req, res) {
  res.render('index', {
    indexObj: indexObj,
    username: req.user.cn,
    partials: {
      nav: 'partials/nav.hjs',
      canvas: 'partials/canvas.hjs',
      plateT1: 'partials/plateT1.hjs',
      radioDifficulty: 'partials/radioDifficulty.hjs',
      radioPlateType: 'partials/radioPlateType.hjs',
      checkboxAnnotatable: 'partials/checkboxAnnotatable.hjs',
      footer: 'partials/footer.hjs',
      progressbar: 'partials/progressbar.hjs',
      numberOfPlate: 'partials/numberOfPlate.hjs',
      helpModal: 'partials/helpModal.hjs',
      statModal: 'partials/statModal.hjs'
    }
  });
});

module.exports = router;
