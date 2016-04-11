var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userAnswerSchema = new Schema({
    qid: { type : String , required : true },
    qprompt: { type : String , required : true },
    answer: { type : String , required : false }
});

module.exports = mongoose.model("answers", userAnswerSchema);
