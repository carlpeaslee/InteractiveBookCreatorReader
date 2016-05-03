
myApp.controller('LibraryController', ["$scope", "$http", "$location", "RSJService", function($scope, $http, $location, RSJService){
    var lib = this;

    var rsjService = RSJService;
    lib.user = rsjService.user;


    rsjService.refreshUserData().then(function(response){
        lib.currentpage = rsjService.user.data.currentpage;
    })

}]);
