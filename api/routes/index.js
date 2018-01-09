var express = require('express');
var router = express.Router();

// Basic Route Demos
// -----------------

router.get('/', function(req, res, next) {
  res.json({
    foo: "bar",
    baz: "quux"
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