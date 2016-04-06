var express = require("express");
var router = express.Router();
var path = require("path");

var Pagemodel = require("../models/pagemodel.js");

router.get('/', function (req, res) {
    Pagemodel.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

module.exports = router;
