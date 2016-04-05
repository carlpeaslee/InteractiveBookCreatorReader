var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session")

var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require("./routes/index.js");
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var db = require("./utils/db.js");

var app = express();
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** ---------- SESSION CREATION AND STORAGE ---------- **/
app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));

/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);

app.use("/", index);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
