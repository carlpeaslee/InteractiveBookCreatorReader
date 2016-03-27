var express = require("express");
var router = express.Router();
var path = require("path");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/carl_rsj0_1_0');
mongoose.model("book", new Schema({"title" : String, "author" : String, "pubdate" : String, "imageurl" : String,}));
var Book = mongoose.model("book");



router.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
