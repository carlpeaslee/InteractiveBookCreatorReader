var express = require("express");
var router = express.Router();
var passport = require("passport");
var flash    = require('connect-flash');
var session = require("express-session");
var localStrategy = require('passport-local');
var path = require("path");

var register = require('./register');
var user = require('./user');

router.use("/register", register);

router.post("/login", passport.authenticate("local", {
    failureRedirect: '/loginfail',
    successRedirect: '/login',
    successFlash: true,
    failureFlash: true
}));



router.get("/loginfail", function(req,res,next){
    res.send(req.flash('loginMessage'));
});

router.get("/login", function(req,res,next){
    if (req.isAuthenticated()==true){
        respData = {
            email: req.user.email,
            _id: req.user._id,
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
            books: req.user.books,
            answers: req.user.answers,
            questions: req.user.questions
        }
        res.json(respData);
    }
    else {
        res.send("error");
    }

});


router.use('/auth/user', user);


// router.get("/*", function(req,res,next){
//     console.log(req.params);
//     var file = req.params[0] || "/assets/views/index.html";
//     res.sendFile(path.join(__dirname, "../public", file));
// });

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/assets/views/index.html'));
})

router.get('/*', function(request, response){
  response.sendFile(path.join(__dirname, '../public/assets/views/index.html'));
})

module.exports = router;
