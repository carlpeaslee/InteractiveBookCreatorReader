var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
    fname: { type : String , required : true },
    lname: { type : String , required : true },
    email: { type : String , required : true },
    datecreated: { type : Date , default : Date.now }
});

module.exports = mongoose.model("users", user);
