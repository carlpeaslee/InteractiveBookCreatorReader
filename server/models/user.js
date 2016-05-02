var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;

var QuestionSchema = new Schema({
    prompt: { type : String , required : true },
    style: { type : Array , required : true },
    options: { type : Array , required : false },
    notes: { type : String , required : false }
});

var AnswerSchema = new Schema({
    q_id: { type : String , required : true },
    prompt: { type : String , required : false },
    answer: { type : String , required : false }
});

var PageSchema = new Schema({
    book: { type : String , required : true },
    style: { type : String , required : false },
    index: { type : Number , required : false },
    displaypage: { type : String , required : false },
    content: { type : Array , required : false },
    questions: { type : Array , required : false },
    notes: { type : String , required : false }
})

var BookSchema = new Schema({
    title: { type : String , required : true },
    pages: [PageSchema]
})

var UserSchema = new Schema({
    email: { type : String , required : true, index: {unique: true}},
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
    books: [BookSchema],
    answers: [AnswerSchema],
    questions: [QuestionSchema]
});


UserSchema.pre("save", function(next){
    var user = this;
    if(!user.isModified("password")) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
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
