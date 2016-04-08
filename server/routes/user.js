var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.get("/name", function(req,res,next){
    console.log("someone just logged in", req.isAuthenticated());
    var userData = {
        email: req.user.email,
        fname: req.user.fname,
        lname: req.user.lname
    };
    res.json(userData);
});

module.exports = router;
