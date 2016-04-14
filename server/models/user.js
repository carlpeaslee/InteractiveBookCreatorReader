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
    console.log("Made it into Pre!");
    var user = this;
    if(!user.isModified("password")) return next();
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

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model("users", UserSchema);
