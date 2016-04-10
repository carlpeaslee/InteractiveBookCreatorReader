myApp.controller("ReadController", ["$scope", "$sce", "$http", "RSJService", function($scope, $sce, $http, RSJService){
    var rsjService = RSJService;

    rsjService.getUserData();
    rsjService.getQuestions();
    rsjService.getPages();

    $scope.questions = rsjService.site;

    $scope.pages = rsjService.pages;

    $scope.currentpage = rsjService.user.data.currentpage;

    $scope.pageForward = function() {
        console.log("pageForward fired");
        $scope.currentpage++;
        rsjService.user.data.currentpage = $scope.currentpage;
        rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.pageBackward = function() {
        $scope.currentpage--;
        rsjService.user.data.currentpage = $scope.currentpage;
        rsjService.autoSaveCurrentPage(rsjService.user);
    };

    $scope.answer1 = {};
    $scope.answer1.answer = "";
    $scope.answer1.user_id = rsjService.user.data._id;


    $scope.autoSaveAnswers = function(){
        $scope.answer1.q_id = $scope.pages.data[$scope.currentpage].question1[0]._id;
        $scope.answer1.prompt = $scope.pages.data[$scope.currentpage].question1[0].prompt;
        console.log("autoSaveAnswers fired", $scope.answer1);
        rsjService.autoSaveAnswers($scope.answer1);
    };

}]);
