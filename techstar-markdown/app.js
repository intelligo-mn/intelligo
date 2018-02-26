
var express = require('express');
var path    = require('path');
var app = express();
 
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

// get sharejs dependencies
var sharejs = require('share');

// set up redis server
// var redisClient;
// console.log(process.env.REDISTOGO_URL);
// if (process.env.REDISTOGO_URL) {
//   var rtg   = require("url").parse(process.env.REDISTOGO_URL);
//   redisClient = require("redis").createClient(rtg.port, rtg.hostname);
//   redisClient.auth(rtg.auth.split(":")[1]);
// } else {
//   redisClient = require("redis").createClient();
// }

// // options for sharejs 
// var options = {
//   db: {type: 'redis', client: redisClient}
// };

var options = {db: {type: 'none'}};

sharejs.server.attach(app, options);

module.exports = app;