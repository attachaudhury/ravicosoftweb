var express = require('express');
var user = require('../models/User');
var router = express.Router();



router.get("/index", async (req, res, next) => {
  res.render('./user/index')
})
router.get("/smsplan", async (req, res, next) => {
  res.render('./user/smsplan')
})


module.exports = router;