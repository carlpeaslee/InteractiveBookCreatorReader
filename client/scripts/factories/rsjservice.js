myApp.factory("RSJService", ["$http", "$mdDialog", function($http, $mdDialog){

    var user = {};
    var pages = {};

    var getPages = function(){
        $http.get("/pages").then(function(response){
            pages.data = response.data;
        });
    };

    // var getUserData = function(){
    //     $http.get("/user/profile").then(function(response){
    //         user.data = response.data;
    //     });
    // };
    //
    // var postUserData = function(data){
    //     $http.post("/user/editprofile", data).then(function(response){
    //         getUserData();
    //     });
    // };
    //
    //
    // var initialUserDataCall = function(){
    //     if(user.data === undefined){
    //         getUserData();
    //     }
    // };

    var loginStatus =  function() {
        console.log("checking user login status");
        $http.get("/user").then(function(response){
            if(response.data !== true){
                console.log("NOT LOGGED IN!");
                user.isLoggedIn = false;
                showLoginDialog();
            } else {
                console.log("LOGGED IN! ", response.data);
                $http.get("/user/name").then(function(response){
                    user.data = response.data
                    user.isLoggedIn = true;
                    $mdDialog.hide();
                    //are dialogs gettings randomly closed? this might be the problem!
                });
            };
        });
    };

    var showLoginDialog = function(ev) {
        $mdDialog.show({
          templateUrl: 'assets/views/login.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
      });
    };

    var login = function(data) {
        console.log("trying to login");
        $http.post("/", data).then(function(response){
            loginStatus();
        });
    };

    var createUser = function(data) {
        console.log("trying to create a user");
        $http.post("/register", data).then(function(response){
            console.log(response);
        });
    };

    return {
        // postUserData: postUserData,
        // getUserData: getUserData,
        // initialUserDataCall: initialUserDataCall,
        loginStatus: loginStatus,
        login: login,
        createUser: createUser,
        getPages: getPages,
        user: user,
        pages: pages
    };
}]);
