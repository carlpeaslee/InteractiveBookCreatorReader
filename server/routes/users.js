var express = require("express");
var router = express.Router();
var path = require("path");

var User = require("../models/user.js");

router.get('/profile', function (req, res) {
    User.findById(req.body._id, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

router.post("/editprofile", function (req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.body._id, {
        fname: req.body.fname,
        lname: req.body.lname,
        lastlogin: Date.now(),
        phone: req.body.phone,
        address: req.body.address,
        address2: req.body.address2,
        state: req.body.state,
        zipcode: req.body.zipcode,
        currentbook: req.body.currentbook,
        currentpage: req.body.currentpage
    },
    function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

module.exports = router;
