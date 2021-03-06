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
    when("/library", {
        templateUrl: "/assets/views/library/library.html",
        controller: "LibraryController",
        controllerAs: "lib"
    }).
    when("/login", {
        templateUrl: "/assets/views/library/library.html",
        controller: "UserController"
    }).
    when("/create", {
        templateUrl: "/assets/views/create/createmain.html",
        controller: "CreateController",
        controllerAs: "create"
    }).
    when("/read", {
        templateUrl: "/assets/views/aa/test.html",
        controller: "ReadController"
    }).
    when("/sass/:page", {
        templateUrl: "/assets/views/aa/sasstest2.html",
        controller: "NewRead"
    }).
    when("/journal", {
        templateUrl: "/assets/views/journal/journal.html",
        controller: "JournalController"
    }).
    when("/questions", {
        templateUrl: "/assets/views/questions/questions.html",
        controller: "QuestionsController"
    }).
    when("/:book/:page", {
        templateUrl: "/assets/views/library/dynamicbook.html",
        controller: "DynamicReadCtrl",
        controllerAs: "dread"
    }).
    when("/profile", {
        templateUrl: "/assets/views/profile/profile.html",
        controller: "ProfileController"
    });

    $locationProvider.html5Mode(true);

}]);
