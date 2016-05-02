myApp.controller("CreateController", ["$scope", "$sce", "$compile", '$filter', "RSJService", function($scope, $sce, $compile, $filter, RSJService){
    var $c = this;
    var rsjService = RSJService;
    $c.user = rsjService.user;

    $c.submitNewQuestion = rsjService.saveNewQuestion;

    $c.submitNewBook = rsjService.saveNewBook;

    $c.submitNewPage = rsjService.saveNewPage;



}]);
