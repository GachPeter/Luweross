const bodyParser = require("body-parser");
const mongoose = require("./db");
const User = require('./user');
var http = require("http");
var express = require("express");
const { urlencoded, request } = require("express");

var app = express();
var server = http.createServer(app);
app.use(express.urlencoded({ extended: false }));
var port = process.env.PORT || 3000;

app.get("/feature", (req, res) => {
    User.find({}, (docs, err) => {
        if (!err) {
            res.send(docs);
        }
        else { res.send(err) }
    })
});
app.get("/features", (req, res) => {
    
    res.sendfile(__dirname + "/html/features.html")
});

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/html/home.html");
});
app.get("/success", (req, res) => {
    res.sendfile(__dirname + "/html/success.html");
});
app.get("/failed", (req, res) => {
    res.sendfile(__dirname + "/html/failed.html");
});

app.get("/css/style", (req, res) => {
    res.sendfile(__dirname + "/html/css/style.css");
});
app.get("/js/script", (req, res) => {
    res.sendfile(__dirname + "/html/js/script.js");
});

app.post("/feature", (req, res) => {
    User.create({ time: Date.now(), name: req.body.name, feature: req.body.feature, class: req.body.class, stream: req.body.stream }, (docs, err) => {
        if (docs&&!err) {
            res.redirect('/success');
        }
        else {
            res.redirect('/failed');
        }
    });
});

module.exports = app;

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
})
