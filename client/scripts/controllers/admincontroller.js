myApp.controller("AdminController", ["$scope", "$sce", "AdminService", function($scope, $sce, AdminService){
    var adminService = AdminService;

    $scope.newquestion = {};
    $scope.newquestion.optionNumber = [];

    adminService.getQuestions();

    $scope.submit = function(data) {
        adminService.submitNewQuestion(data);
        $scope.newquestion={};
    }

    $scope.admin = adminService.admin;

    $scope.newpage = {};



}]);
