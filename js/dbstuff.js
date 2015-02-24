var mongoose = require("mongoose");

/* Connect with db server */
var db = mongoose.connect("mongodb://localhost/amanteascacchidb");

var Schema = mongoose.Schema,
			ObjectId = Schema.ObjectId;

/* Define Schema of data */
var userSchema = new Schema({
		name: String,
		surname: String,
		email: String,
		place: String,
		nation: String,
		category: String,
		eloita: Number,
		elofide: Number
	});

/* Define Schema of News */
var newsSchema = new Schema({
		title: String,
		content: String
});

/* Define a model defined by our schema */
var userModel = mongoose.model("user", userSchema);

/* Define a model for the news */
var newsModel = mongoose.model("news", newsSchema);

exports.saveUser = function(name, surname, email, place, nation, category, eloita, elofide) {
	var user = new userModel({
		name: name,
		surname: surname,
		email: email,
		place: place,
		nation: nation,
		category: category,
		eloita: eloita,
		elofide: elofide
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
