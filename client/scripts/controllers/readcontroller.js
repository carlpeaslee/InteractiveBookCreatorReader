myApp.controller("ReadController", ["$scope", "$sce", "RSJService", function($scope, $sce, RSJService){
    var rsjService = RSJService;

    rsjService.getPages();

    $scope.pages = rsjService.pages;

    $scope.currentPage = 0;

    $scope.pageForward = function() {
        $scope.currentPage++;
    };

    $scope.pageBackward = function() {
        $scope.currentPage--;
    };

}]);
