var myApp = angular.module("myApp", ['ngMaterial', 'ngMessages', 'ngRoute']);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('purple');
}]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/readon", {
            templateUrl: "/assets/views/readon.html",
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
        when("/profile", {
            templateUrl: "/assets/views/profile/profile.html",
            controller: "ProfileController"
        }).
        otherwise({
            redirectTo: '/library'
        });
}]);
