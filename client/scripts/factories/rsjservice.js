myApp.factory("RSJService", ["$http", "$mdDialog", function($http, $mdDialog){

    var user = {};
    var pages = {};
    var site = {};

    var getPages = function(){
        $http.get("/pages").then(function(response){
            pages.data = response.data;
        });
    };

    var getUserData = function(){
        $http.get("/user/data").then(function(response){
            user.data = response.data;
            console.log(user.data);
        });
    };


    var postUserData = function(data){
        $http.post("/user/data", data).then(function(response){
            getUserData();
        });
    };

    var autoSaveAnswers = function(data){
        $http.post("/user/autosave", data).then(function(response){
        });
    };

    var autoSaveCurrentPage = function(data){
        console.log("autoSaveCurrentPage fired");
        $http.post("/user/currentpage", data).then(function(response){
        });
    };


    var getQuestions = function(){
        $http.get("/admin/questions").then(function(response){
            site.allQuestions = response.data;
        });
    };

    var loginStatus =  function() {
        console.log("checking user login status");
        $http.get("/user").then(function(response){
            if(response.data !== true){
                console.log("NOT LOGGED IN!");
                user.isLoggedIn = false;
                showLoginDialog();
            } else {
                console.log("LOGGED IN! ", response.data);
                $http.get("/user/data").then(function(response){
                    user.data = response.data;
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
        });
    };

    return {
        loginStatus: loginStatus,
        login: login,
        createUser: createUser,
        postUserData: postUserData,
        getUserData: getUserData,
        getPages: getPages,
        user: user,
        pages: pages,
        site: site,
        getQuestions: getQuestions,
        autoSaveAnswers: autoSaveAnswers,
        autoSaveCurrentPage: autoSaveCurrentPage
    };
}]);
