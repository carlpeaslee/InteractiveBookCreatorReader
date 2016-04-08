myApp.controller('NavController', ["$scope", "$window", "$http", "$location", "RSJService", function ($scope, $window, $http, $location, RSJService) {
    var rsjService = RSJService;
    $scope.user = rsjService.user;
}]);
