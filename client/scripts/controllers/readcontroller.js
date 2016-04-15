myApp.controller("ReadController", ["$scope", "$sce", "$http", "$location", "$route", "$routeParams", "$compile", "$timeout", "RSJService", function($scope, $sce, $http, $location, $route, $routeParams, $compile, $timeout, RSJService){
    var rsjService = RSJService;
    var index = 0;
    var q = 0;
    $scope.setIndex = function(){
        for (var i = 0; i < rsjService.pages.data.length; i++) {
            if (rsjService.pages.data[i].order == rsjService.user.data.currentpage) {
                index = i;
                $scope.pageNow = rsjService.pages.data[index];
                $scope.html = rsjService.pages.data[index].content[0];
            }
        }
    };

    $scope.pageNow = rsjService.pages.data[index];
    $scope.html = rsjService.pages.data[index].content[0];


    $scope.answer1 = {
        prompt : "",
        answer : "",
        _id : ""
    };
    console.log($scope.answer1);

    $scope.setAnswer1 = function() {
        if (rsjService.pages.data[index].question1[0]){
            for (var q = 0; q < rsjService.user.data.answers.length; q++) {
                if (rsjService.user.data.answers[q]._id == rsjService.pages.data[index].question1[0]._id) {
                    $scope.answer1.answer = rsjService.user.data.answers[q].answer;
                } else {
                    $scope.answer1.answer = "";
                }
            }
            $scope.answer1.prompt = rsjService.pages.data[index].question1[0].prompt;
            $scope.answer1._id = rsjService.pages.data[index].question1[0]._id;
            console.log($scope.answer1);
        } else {
            $scope.answer1.answer = "";
            $scope.answer1.prompt = "";
            $scope.answer1._id = "";
            console.log($scope.answer1);
        }
    };

    $scope.setIndex();
    $scope.setAnswer1();

    $scope.pageForward = function() {
        console.log("pageForward fired");
        rsjService.user.data.currentpage++;
        $scope.setIndex();
        $scope.setAnswer1();
        //rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.pageBackward = function() {
        console.log("pageBackward fired");
        rsjService.user.data.currentpage--;
        $scope.setIndex();
        $scope.setAnswer1();
        //rsjService.autoSaveCurrentPage(rsjService.user);
    };


    $scope.autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired", data);
        rsjService.user.data.answers[q].answer = $scope.answer1.answer;
        rsjService.autoSaveAnswers(data);
    };




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
