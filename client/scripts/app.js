var myApp = angular.module("myApp", ['ngMaterial', 'ngMessages', 'ngRoute']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('purple');
}]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/admin", {
            templateUrl: "/assets/views/admin/main.html",
            controller: "AdminController"
        }).
        when("/login", {
            templateUrl: "/assets/views/login.html",
            controller: "LoginController"
        }).
        when("/readon", {
            templateUrl: "/assets/views/readon.html",
            controller: "ReadonController"
        }).
        when("/aa/1", {
            templateUrl: "/assets/views/aa/1.html",
            controller: "ReadonController"
        }).
        when("/library", {
            templateUrl: "/assets/views/library/library.html",
            controller: "LibraryController"
        }).
        when("/journal", {
            templateUrl: "/assets/views/journal/journal.html",
            controller: "JournalController"
        }).
        when("/questions", {
            templateUrl: "/assets/views/questions/questions.html",
            controller: "QuestionsController"
        }).
        when("/profile", {
            templateUrl: "/assets/views/profile/profile.html",
            controller: "ProfileController"
        }).
        otherwise({
            redirectTo: '/library'
        });
}]);
