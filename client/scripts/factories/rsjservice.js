myApp.factory("RSJService", ["$http", function($http){
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

    var user = {};

    return {
        postData: postData,
        getUserData: getUserData,
        initialCall: initialCall,
        user: user
    };
}]);
