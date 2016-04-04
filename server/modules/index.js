var express = require("express");
var router = express.Router();
var path = require("path");
var admin = require("./admin.js")

var user = require("../models/user.js");

router.use("/admin", admin);

router.get("/*", function(req,res){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
