var myApp = angular.module("myApp", ["ngRoute", "ngAnimate", "ngMaterial"]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/readon", {
            templateUrl: "/views/partials/pages/readon.html",
            controller: "ReadonController"
        }).
        when("/library", {
            templateUrl: "/views/partials/pages/library.html",
            controller: "LibraryController"
        }).
        when("/journal", {
            templateUrl: "/views/partials/pages/journal.html",
            controller: "JournalController"
        }).
        when("/wiki", {
            templateUrl: "/views/partials/pages/wiki.html",
            controller: "WikiController"
        }).
        when("/profile", {
            templateUrl: "/views/partials/pages/profile.html",
            controller: "ProfileController"
        }).
        otherwise({
            redirectTo: '/library'
        });
}]);
