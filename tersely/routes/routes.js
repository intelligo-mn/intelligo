const express      = require('express'),
  router           = express.Router(),
  mainController   = require('../app/MainController');

module.exports = router;

router.get('/', mainController.showHome);