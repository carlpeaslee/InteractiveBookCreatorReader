myApp.controller("ReadController", ["$scope", "$sce", "$http", "$location", "$route", "$routeParams", "$compile", "$timeout", "RSJService", function($scope, $sce, $http, $location, $route, $routeParams, $compile, $timeout, RSJService){
    var rsjService = RSJService;

    // rsjService.getUserData();

    $scope.record = RSJService.user.data.answers;


    $scope.questions = rsjService.site;

    $scope.pages = rsjService.pages;

    $scope.currentpage = rsjService.user.data.currentpage;

    $scope.user = rsjService.user;

    $scope.pageForward = function() {
        console.log("pageForward fired");
        rsjService.getUserData();
        $scope.currentpage++;
        rsjService.user.data.currentpage = $scope.currentpage;
        $scope.html = $scope.pages.data[$scope.currentpage].content[0];
        $scope.answer1 = $scope.pages.data[$scope.currentpage].question1[0];
        $scope.record = RSJService.user.data.answers;
        //$location.path('/aa/' + $scope.currentpage);
        rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.pageBackward = function() {
        console.log("pageBackward fired");
        rsjService.getUserData();
        $scope.currentpage--;
        rsjService.user.data.currentpage = $scope.currentpage;
        $scope.html = $scope.pages.data[$scope.currentpage].content[0];
        $scope.answer1 = $scope.pages.data[$scope.currentpage].question1[0];
        $scope.record = RSJService.user.data.answers;
        //$location.path('/aa/' + $scope.currentpage);
        rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.answer1 = $scope.pages.data[$scope.currentpage].question1[0];


    $scope.autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired", data);
        rsjService.autoSaveAnswers(data);
    };

    $scope.html = $scope.pages.data[$scope.currentpage].content[0];


    //autosave stuff?

    var secondsToWaitBeforeSave = 2;
    var timeout = null;
    var saveUpdates = function() {
        if ($scope.answer1.answer) {
            rsjService.autoSaveAnswers($scope.answer1);
        }
    };
    var debounceUpdate = function(newVal, oldVal) {
        if (newVal != oldVal) {
            if (timeout) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(saveUpdates, secondsToWaitBeforeSave * 1000);
        }
    };
    $scope.$watch('answer1.answer', debounceUpdate);

}]);
