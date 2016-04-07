myApp.controller('NavController', ["$scope", "$window", "$http", "$location", "RSJService", function ($scope, $window, $http, $location, RSJService) {
    // $http.get("/user").then(function(response){
    //     if(response.data !== true){
    //       console.log("NOT LOGGED IN!");
    //       $location.path("/login");
    //     } else {
    //       console.log("LOGGED IN! ", response.data);
    //       $http.get("/user/name").then(function(response){
    //           console.log(response.data);
    //       });
    //     }
    // });
}]);
