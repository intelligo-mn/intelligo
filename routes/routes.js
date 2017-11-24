const express      = require('express'),
  router           = express.Router(),
  mainController   = require('../app/MainController'),
  dataController   = require('../app/DataController');

module.exports = router;

router.get('/', mainController.showHome);

router.get('/datas',       dataController.showDatas);

router.get('/datas/seed',  dataController.seedDatas);

router.get('/datas/create',  dataController.showCreate);
router.post('/datas/create', dataController.processCreate);

router.get('/datas/:slug/edit', dataController.showEdit);
router.post('/datas/:slug',     dataController.processEdit);

router.get('/datas/:slug/delete', dataController.deleteData);

router.get('/datas/:slug', dataController.showSingle);