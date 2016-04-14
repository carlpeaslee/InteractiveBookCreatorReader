var express = require("express");
var router = express.Router();
var passport = require("passport");
var session = require("express-session");
var localStrategy = require('passport-local');
var path = require("path");

var register = require('./register');
var user = require('./user');

router.use("/register", register);

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}));

router.get("/login", function(req,res,next){
    res.json(req.isAuthenticated());
});


router.use('/auth/user', isLoggedIn, user);

router.get("/*", function(req,res,next){
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;
