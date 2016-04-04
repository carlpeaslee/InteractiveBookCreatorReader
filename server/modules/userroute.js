var express = require("express");
var router = express.Router();
var path = require("path");
var user = require("../models/user.js");


// router.get('/random', function (req, res) {
//     Newquestion.find({}, function(err, data){
//         if(err){
//             console.log(err);
//         }
//         res.send(data);
//     });
// });
//
// router.post("/response", function (req, res) {
//     console.log(req.body);
//     var addedQuestion = new Newquestion ({"prompt" : req.body.prompt, "type" : req.body.type, "options" : req.body.options, "notes" : req.body.notes});
//     addedQuestion.save(function(err, data){
//         if(err){
//           console.log(err);
//         }
//
//         res.send(data);
//     });
// });


module.exports = router;
