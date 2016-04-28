myApp.controller('LoginController', ["$scope", "$mdToast", "$http", "$location", "$mdDialog", "$mdMedia", "RSJService", function($scope, $mdToast, $http, $location, $mdDialog, $mdMedia, RSJService){
    var rsjService = RSJService;
    $scope.login = function(data){
        rsjService.login(data);
    };
    $scope.loginAlert = rsjService.loginAlert;

    $scope.user = rsjService.user;
    $scope.createUser = rsjService.createUser;

    $scope.goToCreateUser = function(ev){
        $mdDialog.hide();
        $mdDialog.show({
          templateUrl: 'assets/views/newuser.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
    };

    $scope.backToLogin = function(ev){
        $mdDialog.hide();
        $mdDialog.show({
          templateUrl: 'assets/views/login.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
    };

}]);
