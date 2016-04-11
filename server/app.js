var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var passport = require('passport');
var session = require("express-session");
var localStrategy = require('passport-local');

var mongoose = require('mongoose');

var User = require("./models/user");
//routes
var index = require("./routes/index.js");
var register = require('./routes/register');
var user = require('./routes/user');

var db = require("./utils/db.js");

app.use(session({
    secret: "secret",
    key: "user",
    resave: true,
    s: false,
    cookie: {maxAge: 60000, secure: false}
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


/** ---------- Configuring passport ---------- **/
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.user.findById(id, function(err, user){
        if(err) done(err);
        done(null, user);
    });
});

passport.use("local", new localStrategy({
      passReqToCallback : true,
      usernameField: 'email'
  }, function(req, email, password, done){
        User.user.findOne({email: email}, function(err,user){
            if(err) throw err;
            if(!user){
              return done(null, false, {message: "Incorrect username or password"});
            }

            user.comparePassword(password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                  return done(null, user);
                } else {
                  done( null, false, {message: "Incorrect username or password"});
                }
            });
        });
    }
));

/** ---------- ROUTES ---------- **/
app.use("/register", register);
app.use("/user", user); // START HERE TODAY
app.use("/", index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
