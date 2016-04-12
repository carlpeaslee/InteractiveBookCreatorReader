var myApp = angular.module("myApp", ['ngMaterial', 'ngMessages', 'ngRoute', 'ngSanitize']);

myApp.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);


myApp.directive('dynamic', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function(html) {
                ele.html(html);
                $compile(ele.contents())(scope);
            });
        }
    };
}]);

myApp.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('purple');
}]);

myApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider.
    when("/admin", {
        templateUrl: "/assets/views/admin/main.html",
        controller: "AdminController"
    }).
    when("/readon", {
        templateUrl: "/assets/views/readon.html",
        controller: "ReadController"
    }).
    when("/aa", {
        templateUrl: "/assets/views/aa/test.html",
        controller: "ReadController"
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
        redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);
}]);
