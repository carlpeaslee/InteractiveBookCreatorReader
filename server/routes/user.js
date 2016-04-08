var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.get("/data", function(req,res,next){
    console.log("someone just logged in", req.isAuthenticated());
    var resUserData = {
        email: req.user.email,
        fname: req.user.fname,
        lname: req.user.lname,
        datecreated: req.user.datecreated,
        lastlogin: req.user.lastlogin,
        phone: req.user.phone,
        address: req.user.address,
        address2: req.user.address2,
        state: req.user.state,
        zipcode: req.user.zipcode,
        currentbook: req.user.currentbook,
        currentpage: req.user.currentpage,
        _id: req.user._id
    };
    res.json(resUserData);
});

router.post("/data", function(req,res,next){
    User.findOneAndUpdate({ '_id': req.user._id }, {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: parseInt(req.body.phone),
        address: req.body.address,
        address2: req.body.address2,
        state: req.body.state,
        zipcode: parseInt(req.body.zipcode)
    }, function(err, doc){
        if(err){
            console.log(err);
        }
    });
});


module.exports = router;
