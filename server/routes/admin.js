var express = require("express");
var router = express.Router();
var path = require("path");

var Newquestion = require("../models/newquestion.js");
var Newpage = require("../models/newpage.js");

router.get('/questions', function (req, res) {
    Newquestion.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

router.post("/newquestion", function (req, res) {
    var addedQuestion = new Newquestion ({
        "prompt" : req.body.prompt,
        "associated_book" : req.body.associatedBook,
        "associated_truepage" : req.body.associatedTruepage,
        "style" : req.body.style,
        "options" : req.body.options,
        "notes" : req.body.notes
    });
    addedQuestion.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
});

router.post("/newpage", function (req, res) {
    var addedPage = new Newpage ({
        "style" : req.body.style,
        "book" : req.body.book,
        "order" : req.body.order,
        "displaypage" : req.body.displaypage,
        "content" : req.body.content,
        "notes" : req.body.notes
    });
    addedPage.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
});

router.get('/pages', function (req, res) {
    Newpage.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});


module.exports = router;
