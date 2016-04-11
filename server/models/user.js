var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
// var UserAnswerSchema = require("../models/useranswer");

var userAnswerSchema = new Schema({
    qid: { type : String , required : true },
    qprompt: { type : String , required : true },
    answer: { type : String , required : false }
});

var user = new Schema({
    email: { type : String , required : false, index: {unique: true}},
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
    currentpage: { type : String, required : false },
    answers: [userAnswerSchema]
});


user.pre("save", function(next){
    console.log("Made it into Pre!");
    var user = this;
    if(!user.isModified("password")) return next;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            console.log("Did I hash? : " , user.password);
            next();
        });
    });
});

user.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};


// module.exports = mongoose.model("user", User);

exports.user = mongoose.model('user', user);
exports.userAnswerSchema = mongoose.model('userAnswerSchema', userAnswerSchema);
