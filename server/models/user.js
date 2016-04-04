var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    email: { type : String , required : true, index: {unique: true} },
    pw: { type : String , required : true },
    fname: { type : String , required : false },
    lname: { type : String , required : false },
    datecreated: { type : Date , default : Date.now },
    lastlogin: { type : Date , default : Date.now },
    phone: { type : Number , required : false },
    address: { type : String , required : false },
    address2: { type : String , required : false },
    state: { type : String , required : false },
    zipcode: { type : Number , required : false },
    currentpage: { type : String , required : false }
});

module.exports = mongoose.model("users", user);
