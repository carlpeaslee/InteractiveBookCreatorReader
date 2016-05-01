myApp.controller('UserController', ["$scope", "$http", "$location", "$mdDialog", "$mdMedia", "$location", "RSJService", function($scope, $http, $location, $mdDialog, $mdMedia, $location, RSJService){
    var rsjService = RSJService;
    $scope.login = rsjService.login;
    $scope.createUser = rsjService.createUser;
    $scope.user = rsjService.user;

    //for testing purposes, disable 1, and enable 2

    //1
    //rsjService.loginStatus();

    //2
    rsjService.autoTestLogin();

    $scope.goToCreateUser = function(){
        $mdDialog.hide();
        $mdDialog.show({
              templateUrl: 'assets/views/newuser.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:false
        });
    };

    $scope.goToLogin = function(){
        $mdDialog.hide();
        rsjService.showLoginDialog();
    };


}]);
