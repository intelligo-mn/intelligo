const express = require('express'),
      path    = require('path'),
      sharejs = require('share');

const app = express();
 
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
// routes for app
app.get('/', function(req, res) {
  res.render('editor');
});
app.get('/(:id)', function(req, res) {
  res.render('editor');
});

var options = {db: {type: 'none'}};

sharejs.server.attach(app, options);

module.exports = app;