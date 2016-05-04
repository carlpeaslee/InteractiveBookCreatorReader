myApp.controller('UserController', ["$scope", "$http", "$location", "$mdDialog", "$mdMedia", "$location", "RSJService", function($scope, $http, $location, $mdDialog, $mdMedia, $location, RSJService){
    var u = this;
    var rsjService = RSJService;
    u.login = rsjService.login;
    u.createUser = rsjService.createUser;
    u.user = rsjService.user;

    //for testing purposes, disable 1, and enable 2

    //1
    rsjService.loginStatus();

    //2
    rsjService.autoTestLogin();

    u.goToCreateUser = function(){
        $mdDialog.hide();
        $mdDialog.show({
              templateUrl: 'assets/views/newuser.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:false
        });
    };

    u.goToLogin = function(){
        $mdDialog.hide();
        rsjService.showLoginDialog();
    };


}]);
