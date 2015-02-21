var express = require("express");
var app = express();

var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;
	console.log("App listening at http://%s:%s", host, port);
	console.log("Your directory is " + __dirname);
});

/* Set engine to display EJS */
app.set("view engine", "ejs");

/* Handling static files */
app.use(express.static(__dirname + "/public"))

/* 
	Handling Request
*/

/* Test page */
app.get("/hello", function(req, res) {
	res.send("Hello World")
});

/* Home page */
app.get("/home", function(req, res) {
	res.sendFile("public/home.html", {root: __dirname});
});

/* Test page using EJS */
app.get("/ejs", function(req, res) {
	res.render("pages/index");
});