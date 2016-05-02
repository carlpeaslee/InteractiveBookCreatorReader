var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.sendFile(path.resolve(__dirname, "../public/assets/views/register.html"));
});

router.post("/", function(req, res, next){
    console.log("Made it up here! Woot! : ", req.body);
    User.create(req.body, function(err,post){
        if(err){
          next(err);
          res.send(err);
        } else {
          res.send(post);
        }
    });
});

module.exports = router;
