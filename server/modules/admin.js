var express = require("express");
var router = express.Router();
var path = require("path");

var newquestion = require("../models/newquestion.js");

router.get('/questions', function (req, res) {
    newquestion.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        res.send(data);
    });
});

router.post("/newquestion", function (req, res) {
    console.log(req.body);
    var addedQuestion = new Newquestion ({"prompt" : req.body.prompt, "type" : req.body.type, "options" : req.body.options, "notes" : req.body.notes});
    addedQuestion.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });
});


module.exports = router;
