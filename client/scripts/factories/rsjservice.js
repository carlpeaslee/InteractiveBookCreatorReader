myApp.factory("RSJService", ["$http", function($http){

    var user = {};
    var pages = {};

    var getPages = function(){
        $http.get("/pages").then(function(response){
            pages.data = response.data;
        });
    };

    var getUserData = function(){
        $http.get("/user/profile").then(function(response){
            user.data = response.data;
        });
    };

    var postUserData = function(data){
        $http.post("/user/editprofile", data).then(function(response){
            getUserData();
        });
    };


    var initialUserDataCall = function(){
        if(user.data === undefined){
            getUserData();
        }
    };



    return {
        postUserData: postUserData,
        getUserData: getUserData,
        initialUserDataCall: initialUserDataCall,
        getPages: getPages,
        user: user,
        pages: pages
    };
}]);
