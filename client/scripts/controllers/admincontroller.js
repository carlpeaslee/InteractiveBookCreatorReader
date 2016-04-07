myApp.controller("AdminController", ["$scope", "$sce", "AdminService", function($scope, $sce, AdminService){
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

    //"&lt;form&gt;&lt;p&gt;this is prompt 1&lt;/p&gt;&lt;textarea&gt;&lt;/textarea&gt;&lt;/form&gt;&lt;div class='gap'&gt;&lt;/div&gt;";


}]);
