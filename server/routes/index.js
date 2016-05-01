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
    res.json(req.isAuthenticated());
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
