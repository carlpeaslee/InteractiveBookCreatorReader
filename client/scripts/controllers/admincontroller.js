myApp.controller('AdminController', ["$scope", "AdminService", function($scope, AdminService){
    var adminService = AdminService;

    adminService.getQuestions();

    $scope.admin = adminService.admin;

}]);
