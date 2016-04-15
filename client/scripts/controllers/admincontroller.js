myApp.controller("AdminController", ["$scope", "$sce", "$compile", '$filter', "AdminService", "RSJService", function($scope, $sce, $compile, $filter, AdminService, RSJService){
    var adminService = AdminService;
    var rsjService = RSJService;

    $scope.record = RSJService.user.data.answers;

    $scope.newquestion = {};
    $scope.newpage = {};

    $scope.admin = adminService.admin;

    adminService.getQuestions();

    $scope.submitNewQuestion = function(data) {
        adminService.submitNewQuestion(data);
        $scope.newquestion={};
    }

    $scope.submitNewPage = function(data) {
        adminService.submitNewPage(data);
        $scope.newpage = {};
    }


}]);
