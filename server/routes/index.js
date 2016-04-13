var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");

var pages = require("./pages.js");
var admin = require("./admin.js");


router.use("/pages", pages);
router.use("/admin", admin);

router.post("/", passport.authenticate("local", {
    successRedirect: "/user/",
    failureRedirect: "/"
}));

router.get("/users", function(req,res,next){
    res.sendFile(path.resolve(__dirname, "../public/assets/views/index.html"));
});

router.get("/*", function(req,res,next){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
