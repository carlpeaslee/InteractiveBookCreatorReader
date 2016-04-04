var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newquestion = new Schema({
    prompt: { type : String , required : true },
    associated_book: { type : String , required : true },
    associated_truepage: { type : String , required : false },
    style: { type : String , required : true },
    options: { type : Array , required : false },
    notes: { type : String , required : false }
});

module.exports = mongoose.model("questions", newquestion);
