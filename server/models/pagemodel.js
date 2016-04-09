var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newpage = new Schema({
    style: { type : String , required : true },
    book: { type : String , required : true },
    order: { type : Number , required : false },
    displaypage: { type : String , required : false },
    content: { type : Array , required : false },
    question1: { type : Array , required : false },
    question2: { type : Array , required : false },
    notes: { type : String , required : false }
});

module.exports = mongoose.model("pages", newpage);
