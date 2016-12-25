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

router.use(passport.initialize());
router.use(passport.session());
router.use('/login', login);
router.use('/profile', profile);
router.use('/logout', logout);
router.use('/plateInfo', plateInfo);
router.use('/updatePlateInfo', updatePlateInfo);
router.use('/typesInfo', typesInfo);
router.use('/difficultiesInfo', difficultiesInfo);
// TODO: remove these two!
router.use('/', images);

var indexObj = {
  plateStateLabels: {
    initial: "برچسب نخورده ها",
    annotated: "برچسب خورده ها"
  },
  helpText: {
    add: "ابتدا کلید a را فشرده و سپس مستطیل را ترسیم نمایید.",
    remove: "روی مستطیل مورد نظر کلیک کنید و سپس با دکمه d آن را حذف نمایید."
  },
  ignoreText: "قابل برچسب زدن نیست"
}

/* GET home page. */
router.get('/', passport.isLoggedIn, function(req, res) {
  res.render('index', {
    indexObj: indexObj,
    partials: {
      nav: 'partials/nav.hjs',
      plateStates: 'partials/plateState.hjs',
      helpText: 'partials/helpText.hjs',
      canvas: 'partials/canvas.hjs',
      plateT1: 'partials/plateT1.hjs',
      radioDifficulty: 'partials/radioDifficulty.hjs',
      radioPlateType: 'partials/radioPlateType.hjs',
      checkboxAnnotatable: 'partials/checkboxAnnotatable.hjs',
      footer: 'partials/footer.hjs'
    }
  });
});

module.exports = router;
