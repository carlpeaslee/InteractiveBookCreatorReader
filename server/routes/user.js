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
    var respData = req.user;
    respData.password = null;
    res.json(respData);
});

router.post("/data", function(req,res,next){
    console.log("user data post triggered", req.isAuthenticated());
    User.findOneAndUpdate({ _id: req.user._id }, {
        email: req.body.data.email,
        fname: req.body.data.fname,
        lname: req.body.data.lname,
        phone: req.body.data.phone,
        address: req.body.data.address,
        address2: req.body.data.address2,
        city: req.body.data.city,
        state: req.body.data.state,
        zipcode: req.body.data.zipcode,
        currentbook: req.body.data.currentbook,
        currentpage: req.body.data.currentpage,
        books: req.body.data.books,
        answers: req.body.data.answers,
        questions: req.body.data.questions
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
        currentbook: req.body.data.currentbook,
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

router.post("/newquestion", function(req,res,next){
    console.log("hit newquestion, req.user._id: ", req.user._id);
    var newQuestion = {
            prompt: req.body.prompt,
            style: req.body.style,
            options: req.body.options,
            notes: req.body.notes
    };
    User.findById(req.user._id, function(err, found){
        var exists = found.questions.id(req.body._id);
        if (exists == null) {
            found.questions.push(newQuestion);
        }
        found.save();
        res.json(found);
    });
});

router.post("/newbook", function(req,res,next){
    console.log("hit newbook, req.user._id: ", req.user._id);
    var newBook = {
            displaytitle: req.body.displaytitle,
            linktitle: req.body.linktitle
    };
    User.findById(req.user._id, function(err, found){
        var exists = found.books.id(req.body._id);
        if (exists == null) {
            found.books.push(newBook);
            found.allprogress.push({
                linktitle: newBook.linktitle
            });
        }
        found.save(function(err, product){
            if (err) console.log(err);
            if (product) {
                console.log(product);
                res.json(product);
            }
        });
    });
});

router.post("/newpage", function(req,res,next){
    console.log("hit newpage, req.user._id: ", req.user._id);
    var newPage = {
        book: req.body.book,
        style: req.body.style,
        pdex: req.body.pdex,
        pnumber: req.body.pnumber,
        content: req.body.content,
        questions: req.body.questions,
        notes: req.body.notes
    };
    User.findById(req.user._id, function(err, found){
        var intendedBook = found.books.id(req.body.book);
        intendedBook.pages.push(newPage);
        found.save();
        res.json(found);
    });
});


module.exports = router;
