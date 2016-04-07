myApp.controller("RegisterController", ["$scope", "$sce", "$http", "RSJService", function($scope, $sce, $http, RSJService){
    var rsjService = RSJService;
    $scope.createUser = function(data) {
        console.log("trying to create a user");
        $http.post("/register", data).then(function(response){
            console.log(response);
        });
    };
}]);
