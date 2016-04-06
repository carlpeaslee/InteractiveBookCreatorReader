var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newpage = new Schema({
    style: { type : String , required : true },
    book: { type : String , required : true },
    order: { type : Number , required : false },
    displaypage: { type : String , required : false },
    content: { type : Array , required : true },
    notes: { type : String , required : false }
});

module.exports = mongoose.model("pages", newpage);
