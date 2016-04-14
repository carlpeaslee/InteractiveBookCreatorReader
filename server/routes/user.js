var express = require("express");
var router = express.Router();
var User = require("../models/user");

var pages = require("./pages.js");
var admin = require("./admin.js");

var passport = require("passport");

router.use("/pages", pages);
router.use("/admin", admin);

router.get("/data", function(req,res,next){
    console.log(req.user);
    console.log("user data requested", req.isAuthenticated());
    var respData = {
        username: req.user.username,
        fname: req.user.fname,
        lname: req.user.lname,
        datecreated: req.user.datecreated,
        phone: req.user.phone,
        address: req.user.address,
        address2: req.user.address2,
        city: req.user.city,
        state: req.user.state,
        zipcode: req.user.zipcode,
        currentbook: req.user.currentbook,
        currentpage: req.user.currentpage,
        _id: req.user._id,
        answers: req.user.answers
    };
    res.json(respData);
});

router.post("/data", function(req,res,next){
    console.log("user data post triggered", req.isAuthenticated());
    User.findOneAndUpdate({ _id: req.user._id }, {
        username: req.body.data.username,
        fname: req.body.data.fname,
        lname: req.body.data.lname,
        phone: parseInt(req.body.data.phone),
        address: req.body.data.address,
        address2: req.body.data.address2,
        city: req.body.data.city,
        state: req.body.data.state,
        zipcode: parseInt(req.body.data.zipcode)
    }, function(err, doc){
        if(err){
            console.log(err);
        }
        res.json();
    });
});

router.post("/currentpage", function(req,res,next){
    console.log("page change requested", req.isAuthenticated());
    User.findOneAndUpdate({ _id: req.user._id }, {
        currentpage: req.body.data.currentpage
    }, function(err, doc){
        if(err){
            console.log(err);
        }
    res.json();
    });
});



router.post("/autosave", function(req,res,next){
    console.log("hit autosave, req.user._id: ", req.isAuthenticated(), req.user._id);
    var newAnswer = {
            qid: req.body._id,
            qprompt: req.body.prompt,
            answer: req.body.answer
    };
    User.findOneAndUpdate(req.user._id,
        { $push: { answers: newAnswer } },
        { upsert: true }, // upsert looks to find a Message with that id and if it doesn't exist creates the Message
        function(err, data) {
    });
    res.json();
});


module.exports = router;
