var express = require("express");
var router = express.Router();
var path = require("path");

var pages = require("./pages.js");
var admin = require("./admin.js");
var users = require("./users.js");

router.use("/pages", pages);
router.use("/admin", admin);
router.use("/user", users);


router.get("/*", function(req,res){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
