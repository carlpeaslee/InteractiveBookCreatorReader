var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.get("/name", function(req,res,next){
    console.log("Hi class! ", req.isAuthenticated());
    var resUser = {
        email: req.user.email,
        firstname: req.user.fname,
        lastname: req.user.lname
    };
    res.json(resUser);
});

module.exports = router;
