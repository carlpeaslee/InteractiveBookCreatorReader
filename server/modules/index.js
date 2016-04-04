var express = require("express");
var router = express.Router();
var path = require("path");
var admin = require("./admin.js");
var userroute = require("./userroute.js")


router.use("/admin", admin);
router.use("/userroute", userroute);

router.get("/*", function(req,res){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
