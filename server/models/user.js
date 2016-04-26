var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;


var AnswerSchema = new Schema({
    prompt: { type : String , required : false },
    answer: { type : String , required : false }
});

var UserSchema = new Schema({
    username: { type : String , required : false, index: {unique: true}},
    password: {type: String, required: true},
    fname: { type : String , required : false },
    lname: { type : String , required : false },
    datecreated: { type : Date , default : Date.now },
    lastlogin: { type : Date },
    phone: { type : String, default : null, required : false },
    address: { type : String , required : false },
    address2: { type : String , required : false },
    city: { type : String , required : false },
    state: { type : String , required : false },
    zipcode: { type : String, default : null, required : false },
    currentbook: { type : String , required : false },
    currentpage: { type : String, required : true, default: 0},
    answers: [AnswerSchema]
});


UserSchema.pre("save", function(next){
    console.log("got into this save thing and here is 'this'", this);
    var user = this;
    console.log("user");
    if(!user.isModified("password")) return next();
    console.log("made it past user.isModified");
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
        console.log("now we in the genSalt thing");
        if (err) {
            console.log(err);
        }
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            console.log("now in the hash machine");
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model("users", UserSchema);
