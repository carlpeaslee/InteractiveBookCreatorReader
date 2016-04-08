myApp.controller("LoginController", ["$scope", "$sce", "$http", "$location", "RSJService", function($scope, $sce, $http, $location, RSJService){
    var rsjService = RSJService;
    $scope.login = function(data) {
        console.log("trying to login");
        $http.post("/", data).then(function(response){
            $http.get("/user").then(function(response){
                if(response.data !== true){
                    console.log("NOT LOGGED IN!");
                    $location.path("/login");
                } else {
                    console.log("LOGGED IN! ", response.data);
                    $http.get("/user/name").then(function(response){
                        console.log(response.data);
                        $location.path("/library");
                    });
                };
            });
        });
    };
}]);
