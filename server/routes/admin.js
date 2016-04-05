var express = require("express");
var router = express.Router();
var path = require("path");

var Newquestion = require("../models/newquestion.js");

router.get('/questions', function (req, res) {
    Newquestion.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

router.post("/newquestion", function (req, res) {
    console.log(req.body);
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


module.exports = router;
