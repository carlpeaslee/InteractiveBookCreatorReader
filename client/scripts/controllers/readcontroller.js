myApp.controller("ReadController", ["$scope", "$sce", "$http", "RSJService", function($scope, $sce, $http, RSJService){
    var rsjService = RSJService;

    rsjService.getQuestions();
    rsjService.getPages();

    $scope.questions = rsjService.site;

    $scope.pages = rsjService.pages;

    $scope.currentPage = 0;

    $scope.pageForward = function() {
        $scope.currentPage++;
    };

    $scope.pageBackward = function() {
        $scope.currentPage--;
    };


}]);
