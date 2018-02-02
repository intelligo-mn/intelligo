const express = require('express');
const router = express.Router();

const Data = require('../../techstar-console/models/Data');

// Basic Route Demos
// -----------------

router.get('/data', function(req, res, next) {
  Data.find({}, { _id : 0, input : 1, output : 1 }, function(err, datas){
      if (err) {
        res.status(404);
        res.send('Datas not found!');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(datas, null, " "));
    });
});

router.get("/err", function(req, res, next){
  next(new Error("Some Error"));
});

// API Specific 404 / Error Handlers
// ---------------------------------

// API not found
router.use(function(req, res, next){
  res.status(404);
  res.send();
});

// erorrs handler
router.use(function(err, req, res, next){
  var status = err.status || 500;
  res.status(status);
  res.json({
    app: "api",
    status: status,
    error: err.message
  });
});

// Exports
// -------

module.exports = router;