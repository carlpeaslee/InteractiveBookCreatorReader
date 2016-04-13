myApp.controller("ReadController", ["$scope", "$sce", "$http", "$location", "$route", "$routeParams", "$compile", "RSJService", function($scope, $sce, $http, $location, $route, $routeParams, $compile, RSJService){
    var rsjService = RSJService;

    // rsjService.getUserData();

    $scope.record = RSJService.user.data.answers;


    $scope.questions = rsjService.site;

    $scope.pages = rsjService.pages;

    $scope.currentpage = rsjService.user.data.currentpage;

    $scope.user = rsjService.user;

    $scope.pageForward = function() {
        console.log("pageForward fired");
        $scope.currentpage++;
        rsjService.user.data.currentpage = $scope.currentpage;
        $scope.html = $scope.pages.data[$scope.currentpage].content[0];
        //$location.path('/aa/' + $scope.currentpage);
        rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.pageBackward = function() {
        console.log("pageBackward fired");
        $scope.currentpage--;
        rsjService.user.data.currentpage = $scope.currentpage;
        $scope.html = $scope.pages.data[$scope.currentpage].content[0];
        //$location.path('/aa/' + $scope.currentpage);
        rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.answer1 = $scope.pages.data[$scope.currentpage].question1[0];


    $scope.autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired", data);
        rsjService.autoSaveAnswers(data);
    };

    $scope.html = $scope.pages.data[$scope.currentpage].content[0];

    //$location.url('/aa/' + $scope.currentpage);

    //$location.path('/aa/' + $scope.currentpage);


}]);
