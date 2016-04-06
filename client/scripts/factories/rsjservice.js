myApp.factory("RSJService", ["$http", function($http){

    var user = {};
    var pages = {};

    var getPages = function(){
        $http.get("/pages").then(function(response){
            pages.data = response.data;
        });
    };

    var getUserData = function(){
        $http.get("/user").then(function(response){
            user.data = response.data;
        });
    };

    var postData = function(data){
        $http.post("/user", data).then(function(response){
            getUserData();
        });
    };


    var initialCall = function(){
        if(user.data === undefined){
            $http.get("/data").then(function(response){
                user.data = response.data;
            });
        }
    };



    return {
        postData: postData,
        getUserData: getUserData,
        initialCall: initialCall,
        getPages: getPages,
        user: user,
        pages: pages
    };
}]);
