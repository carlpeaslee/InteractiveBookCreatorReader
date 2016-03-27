var express = require("express");
var app = express();
var index = require("./routes/index");
var path = require("path");
var bodyParser = require("body-parser");


app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/", index);

app.listen(app.get("port"), function(){
    console.log("Listening on port", app.get("port"));
});

module.exports = app;
