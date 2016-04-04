myApp.controller('AdminController', ["$scope", "AdminService", function($scope, AdminService){
    var adminService = AdminService;

    $scope.newquestion = {};
    $scope.newquestion.optionNumber = [];

    adminService.getQuestions();

    $scope.submit = function(data) {
        adminService.submitNewQuestion(data);
        $scope.newquestion={};
    }


    $scope.admin = adminService.admin;


}]);
