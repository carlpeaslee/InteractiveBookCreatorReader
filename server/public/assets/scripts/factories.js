myApp.factory("RSJService", ["$http", function($http){
    var testFunction = function(){
        console.log("testing RSJService");
    }

    return {
        testFunction: testFunction
    };
}]);
