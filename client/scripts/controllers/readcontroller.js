myApp.controller("ReadController", ["$scope", "$sce", "$http", "$location", "$route", "$routeParams", "$compile", "$timeout", "RSJService", function($scope, $sce, $http, $location, $route, $routeParams, $compile, $timeout, RSJService){
    var rsjService = RSJService;

    /*========user information=======*/
    $scope.currentpage = rsjService.user.data.currentpage;  //user's current page -- this doesn't correspond to the page number
    $scope.record = RSJService.user.data.answers; //all of the user's answer information

    /*========page information=======*/
    $scope.style = rsjService.pages.data[$scope.currentpage].style; //tbe style of the current page, to be used for class and css styling
    $scope.html = rsjService.pages.data[$scope.currentpage].content[0]; //the html and angular file that composes the pages body
    $scope.displaypage = rsjService.pages.data[$scope.currentpage].displaypage; //the page number at the bottom of the page
    $scope.answer1 = rsjService.pages.data[$scope.currentpage].question1[0]; //this is the object from the page information


    $scope.pageForward = function() {
        console.log("pageForward fired");
        //this changes the page number
        $scope.currentpage++;
        rsjService.user.data.currentpage = $scope.currentpage;
        //this saves the page update to the database and forces all the scope variables to update in a kind of janky way
        rsjService.autoSaveCurrentPage(rsjService.user);
        $scope.style = rsjService.pages.data[$scope.currentpage].style; //tbe style of the current page, to be used for class and css styling
        $scope.html = rsjService.pages.data[$scope.currentpage].content[0]; //the html and angular file that composes the pages body
        $scope.displaypage = rsjService.pages.data[$scope.currentpage].displaypage; //the page number at the bottom of the page
        $scope.answer1 = rsjService.pages.data[$scope.currentpage].question1[0]; //this is the object from the page information
        $scope.currentpage = rsjService.user.data.currentpage;  //user's current page -- this doesn't correspond to the page number
        $scope.record = RSJService.user.data.answers; //all of the user's answer information
    };

    $scope.pageBackward = function() {
        console.log("pageBackward fired");

        //this changes the page number
        $scope.currentpage--;
        rsjService.user.data.currentpage = $scope.currentpage;
        //this saves the page update to the database and forces all the scope variables to update in a kind of janky way
        rsjService.autoSaveCurrentPage(rsjService.user);
        $scope.style = rsjService.pages.data[$scope.currentpage].style; //tbe style of the current page, to be used for class and css styling
        $scope.html = rsjService.pages.data[$scope.currentpage].content[0]; //the html and angular file that composes the pages body
        $scope.displaypage = rsjService.pages.data[$scope.currentpage].displaypage; //the page number at the bottom of the page
        $scope.answer1 = rsjService.pages.data[$scope.currentpage].question1[0]; //this is the object from the page information
        $scope.currentpage = rsjService.user.data.currentpage;  //user's current page -- this doesn't correspond to the page number
        $scope.record = RSJService.user.data.answers; //all of the user's answer information
    };




    $scope.autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired", data);
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
