myApp.controller("AdminController", ["$scope", "$sce", "$compile", '$filter', "AdminService", function($scope, $sce, $compile, $filter, AdminService){
    var adminService = AdminService;

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
