var mongoose = require("mongoose");

console.log("Initialize schemas, dbstuff.js");
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

/* Define Schema for players */
var userSchema = new Schema({
	name: String,
	country: String,
	phone: String,
	mail: String,
	rating: Number,
	national_rating: Number,
	tournament: String
});

/* Define Schema for news */
var newsSchema = new Schema({
		title: String,
		content: String
});

/* Define a model defined by our schema */
var userModel = mongoose.model("user", userSchema);
/* Define a model for the news */
var newsModel = mongoose.model("news", newsSchema);

exports.openDB = function(isLocal) {
	/* Connect with db server */
	if (isLocal) {
		var db = mongoose.connect("mongodb://localhost/amanteascacchidb", function(err) {
			if (err) {
				console.log("Error loading the db...");
			}
		});

	} else {
		var port = process.env.OPENSHIFT_MONGODB_DB_PORT;
		var host = process.env.OPENSHIFT_MONGODB_DB_HOST;
				
		var options = {
			db: "amanteascacchi",
			user: "admin",
			pass: "R5BslQYFvK4U"
		};

		console.log(host + " " + port);
		var url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
		console.log("mongodb URL is: " + url);
	
		var connect = function() {
			mongoose.connect(url);
		}
		connect();
		var db = mongoose.connection;
		db.on("error", function(err) {
			console.log("Error during connection" + err);
		});
		db.on("disconnected", connect);
		db.once('open', function (callback) {
  			console.log("Database connection is active.");
  		});
	}
}

exports.saveUser = function(name, country, phone, mail, rating, national_rating, tournament) {
	var user = new userModel({
		name: name,
		country: country,
		phone: phone,
		mail: mail,
		rating: rating,
		national_rating: national_rating,
		tournament: tournament
	});

	user.save(function(err, user) {
		if (err)
			console.log("Can't saving user into DB :(");
		console.log("New user added into DB :)");
	})
}

exports.saveNews = function(title, content) {
	var news = new newsModel({
		title: title,
		content: content
	});

	news.save(function(err, news) {
		if (err)
			console.log("Can't saving news into DB :(");
		console.log("News added into DB :)");
	});
}

exports.removeAllUsers = function() {
	userModel.find(
		function(err, users) {
			users.forEach(function(item) {
				item.remove();
			});	
		}
	);
}

exports.removeAllNews = function() {
	newsModel.find(
		function(err, news) {
			news.forEach(function(item) {
				item.remove();
			});	
		}
	);
}

exports.getUsers = function(callback) {
	var res = [];
	var users = userModel.find(
		function(err, users) {	
			var pos = 0;
			users.forEach(function(item) {
				res.push(item);
				pos++;
			});
		callback(res);
	});
}

exports.getNewsList = function(callback) {
	var res = [];
	newsModel.find(
		function(err, list) {	
			var pos = 0;
			list.forEach(function(item) {
				res.push(item);
				pos++;
			});
		callback(res);
	});
}