var bodyParser = require("body-parser");
var express = require('express');
var dbstuff = require("./libs/dbstuff");
var mocker = require("./libs/mocker")

console.log("Remember to launch the mongo server!");

var app = express();

/* To get user from the body */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.argv[2] == "local") {
	var ipaddress = "127.0.0.1";
	var port = "3000";
	dbstuff.openDB(true);
} else {
	var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
	var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	dbstuff.openDB(false);
}

var server = app.listen(port, ipaddress);

/* Handling static files */
app.use(express.static(__dirname + "/public"));

app.get("/test", function(req, res) {
	res.send("Server is working");
});

app.get("/home", function(req, res) {
	res.sendFile("public/index.html", {root: __dirname});
});

app.get("/getnews", function(req, res) {
	dbstuff.getNewsList(function(result) {
		res.json({news: result})
	});
});

app.get("/removeAllnews", function(req, res) {
	dbstuff.removeAllNews();
	res.send("News removed");
});

app.get("/removeAllPlayers", function(req, res) {
	dbstuff.removeAllUsers();
	res.send("Players removed");
});

app.post("/register", function(req, res) {
	console.log(req.body);
	console.log("Try to save user " + req.body.playername + " " +
		req.body.country +  " " +
		req.body.rating + " " + 
		req.body.tournament);

	dbstuff.saveUser(req.body.playername,
		req.body.country,
		req.body.phone,
		req.body.mail,
		req.body.rating,
		req.body.national_rating,
		req.body.tournament);

	res.send("Utente registrato!");
});

app.get("/getPlayers", function(req, res) {
	dbstuff.getUsers(function(result) {
		res.json({players: result});
	});
});