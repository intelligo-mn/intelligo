const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/login', function (req, res, next) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        return res.json({
          status: false,
          message: "Wrong email or password."
        });
      } else {

        return res.json({
          status: true,
          user: user._id
        });
      }
    });

});

router.post('/register', function (req, res, next) {
   console.log(req.body.email);
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {

        return res.json({
          status: true,
          user: user._id
        });
      }
    });
});
module.exports = router
