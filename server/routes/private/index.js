/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var path = require('path');


/** ---------- SUBROUTES ---------- **/
//var admin = require("./admin.js");
//var userroute = require("./userroute.js")


//router.use("/admin", admin);
//router.use("/userroute", userroute);


/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
