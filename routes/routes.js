const express      = require('express'),
  router           = express.Router(),
  mainController   = require('../app/MainController'),
  dataController   = require('../app/DataController');

module.exports = router;

router.get('/', mainController.showHome);
