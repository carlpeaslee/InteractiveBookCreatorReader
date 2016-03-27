myApp.controller('NavController', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };
    $scope.closeLeftMenu = function () {
        $mdSidenav('left').close()
        .then(function () {
            $log.debug("close LEFT is done");
        });
    };
});

myApp.controller("ReadonController", ["$scope", "RSJService", function($scope, RSJService){
    var rsjService = RSJService;

}]);

myApp.controller("LibraryController", ["$scope", "RSJService", function($scope, RSJService){
    var rsjService = RSJService;

}]);

myApp.controller("JournalController", ["$scope", "RSJService", function($scope, RSJService){
    var rsjService = RSJService;

}]);

myApp.controller("WikiController", ["$scope", "RSJService", function($scope, RSJService){
    var rsjService = RSJService;

}]);

myApp.controller("ProfileController", ["$scope", "RSJService", function($scope, RSJService){
    var rsjService = RSJService;

}]);
