myApp.controller("AdminController", ["$scope", "$sce", "$compile", '$filter', "AdminService", "RSJService", function($scope, $sce, $compile, $filter, AdminService, RSJService){
    var adminService = AdminService;
    var rsjService = RSJService;

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


    $scope.answer1 = {
        prompt : "This is a filler prompt ",
        answer : "We used to love colors so much we ate red grapes all day",
        _id : ""
    };

    // this is a temporary hardcoded adaptive thing
    $scope.hits = [/blue/, /green/, /red/, /yellow/, /purple/, /brown/, /black/];
    $scope.print = "is a mystery.";
    $scope.firstMatch = function(inputString, queryArray, output) {
        for (var i = 0; i < queryArray.length; i++ ) {
            if (queryArray[i].exec(inputString) != null) {
                output = (queryArray[i].exec(inputString))[0];
                return output;
            }
        }
    };



    // $scope.toggleHits = [
    //     [/blue/, "cobalt", "blueberry"],
    //     [/green/, "jade", "dragonfly"],
    //     [/red/, "crimson", "tomato"]
    // ];
    // $scope.togglePrint = ["golden", "popcorn cornel"];
    // $scope.toggle = function(inputString, queryArray, outputArray) {
    //     for (var i = 0; i < queryArray.length; i++ ) {
    //         if (queryArray[i][0].exec(inputString) != null) {
    //             queryArray[i].shift();
    //             outPutArray = [];
    //             outputArray.push(queryArray[i]);
    //         }
    //     }
    // };








}]);
