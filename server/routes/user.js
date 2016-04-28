var express = require("express");
var router = express.Router();
var User = require("../models/user");

var pages = require("./pages.js");
var admin = require("./admin.js");

var passport = require("passport");

router.use("/pages", pages);
router.use("/admin", admin);

router.get("/data", function(req,res,next){
    console.log("user data requested", req.isAuthenticated());
    var respData = {
        email: req.user.email,
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
        email: req.body.data.email,
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
    res.json(doc);
    });
});



router.post("/autosave", function(req,res,next){
    console.log("hit autosave, req.user._id: ", req.isAuthenticated(), req.user._id);
    var newAnswer = {
            _id: req.body._id,
            prompt: req.body.prompt,
            answer: req.body.answer
    };
    User.findById(req.user._id, function(err, found){
        var exists = found.answers.id(req.body._id);
        if (exists == null) {
            found.answers.push(newAnswer);
        }
        else {
            exists.answer = req.body.answer;
        }
        found.save();
        res.json(found);
    });
});


module.exports = router;
