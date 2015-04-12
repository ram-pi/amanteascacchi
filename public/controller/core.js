var app = angular.module('myApp', []);

app.controller('newsController', function($scope, $http) {
    console.log("newsController listening");
    $scope.newsList = [];

   	$http.get("/getnews")
   		.success(function(data) {
   			/* news list json every notice is notice.title notice.content */
   			$scope.newsList = data.news;
   		})
   		.error(function(err) {
   			console.log("Error calling the server! :(");
   		});
});

app.controller('registrationController', function($scope, $http) {
    console.log("registrationController listening");
    
    $scope.playername
    $scope.country;
    $scope.phone;
    $scope.mail;
    $scope.rating;
    $scope.national_rating;
    $scope.tournament;
    $scope.message;

    $scope.register = function() {
      var jsonToSend = {
        playername: $scope.playername,
        country: $scope.country,
        phone: $scope.phone,
        mail: $scope.mail,
        rating: $scope.rating,
        national_rating: $scope.national_rating,
        tournament: $scope.tournament
      }

      $http.post("/register", jsonToSend)
        .success(function(data) {
          console.log("User saved into db");
        })
        .error(function(err) {
          console.log("Error: " + err);
        });
    }
});

app.controller('playerListController', function($scope, $http) {
  $scope.players = [];

  $http.get("/getPlayers")
      .success(function(data) {
        /* news list json every notice is notice.title notice.content */
        console.log("List of players retrieved!");
        $scope.players = data.players;
      })
      .error(function(err) {
        console.log("Error calling the server! :(");
      });
});