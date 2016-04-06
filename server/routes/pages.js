var express = require("express");
var router = express.Router();
var path = require("path");

var pages = require("../models/newpage.js");

router.get('/', function (req, res) {
    pages.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

module.exports = router;
