var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.get("/data", function(req,res,next){
    console.log("user data requested", req.isAuthenticated());
    var resUserData = {
        email: req.user.email,
        fname: req.user.fname,
        lname: req.user.lname,
        datecreated: req.user.datecreated,
        lastlogin: req.user.lastlogin,
        phone: req.user.phone,
        address: req.user.address,
        address2: req.user.address2,
        city: req.user.city,
        state: req.user.state,
        zipcode: req.user.zipcode,
        currentbook: req.user.currentbook,
        currentpage: req.user.currentpage,
        _id: req.user._id
    };
    res.json(resUserData);
});

router.post("/data", function(req,res,next){
    console.log(req.body);
    console.log(req.body.data);
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
        res.send();
    });
});

router.post("/currentpage", function(req,res,next){
    console.log(req.body);
    console.log(req.user._id);
    User.findOneAndUpdate({ _id: req.user._id }, {
        currentpage: req.body.data.currentpage
    }, function(err, doc){
        if(err){
            console.log(err);
        }
        res.send();
    });
});



router.post("/autosave", function(req,res,next){
    console.log("hit the autosave route");
    console.log(req.body);
    console.log(req.user._id);
    User.user.findOne({'_id':req.user._id}, function(err, user){
        if(err){
            console.log(err);
        }else {
            console.log(user);
            User.userAnswerSchema.create({
                qid: req.body.q_id,
                qprompt: req.body.prompt,
                answer: req.body.answer
             },
            function(err, addedAnswer){
                user.answers.push(addedAnswer);
                user.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.status(200).send();
                    }
                })

            })
        }
    });

    // User.user.findOneAndUpdate({ "_id": req.user._id, "answers.q_id": req.body.q_id },
    //     {
    //         "$set": {
    //             "answers.$.q_id": req.body.q_id,
    //             "answers.$.qprompt": req.body.qprompt,
    //             "answers.$.answer": req.body.answer
    //         }
    //     },
    //     function(err,doc) {
    //         if(err){
    //             console.log(err);
    //         } else {
    //             res.status(200).send();
    //         }
    //     }
    // );
});




module.exports = router;
