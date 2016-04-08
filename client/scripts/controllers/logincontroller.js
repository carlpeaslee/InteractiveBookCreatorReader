myApp.controller('LoginController', ["$scope", "$http", "$location", "$mdDialog", "$mdMedia", "RSJService", function($scope, $http, $location, $mdDialog, $mdMedia, RSJService){
    var rsjService = RSJService;
    $scope.login = rsjService.login;
    $scope.user = rsjService.user;
    $scope.user.isLoggedIn = false;
}]);
