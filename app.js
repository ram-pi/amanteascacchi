var express = require("express");
var app = express();
var dbstuff = require("./js/dbstuff");

var server = app.listen(3000, function() {

	var host = server.address().address;
	var port = server.address().port;
	console.log("App listening at http://%s:%s", host, port);
	console.log("Your directory is " + __dirname);
	console.log("Remember to launch MongoDB!!!");

	/* Remove All Users when the application starts! */
	dbstuff.removeAllUsers();
});

/* Set engine to display EJS */
app.set("view engine", "ejs");

/* Handling parse forms */
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

/* Handling static files */
app.use(express.static(__dirname + "/public"))

/* 
	Handling Requests
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
	var welcome = "Welcome to this test EJS page! ;)"
	res.render("pages/index", {
		welcome: welcome
	});
});

/* Form page using EJS */
app.get("/form", function(req, res) {
	res.render("pages/form");
});

/* Handling form */
app.post("/signin", function(req, res) {
	console.log(req.body);
	dbstuff.saveUser(req.body.name,
		req.body.surname,
		req.body.email,
		req.body.place,
		req.body.nation,
		req.body.category,
		req.body.eloita);

	res.redirect("/list");
});

/* Handling list of registered users */
app.get("/list", function(req, res) {
	dbstuff.getUsers(function (result) {
		res.render("pages/list",
		{
		 	users: result,
			title: "List of players"
		});
	});
});





