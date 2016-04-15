myApp.factory("RSJService", ["$http", "$mdDialog", "$location", function($http, $mdDialog, $location){

    var user = {};
    var pages = {};
    var site = {};

    var getPages = function(){
        console.log("getPages fired");
        $http.get("/auth/user/pages").then(function(response){
            pages.data = response.data;
            console.log("rsjService.pages.data :", pages.data);
        });
    };

    var getUserData = function(){
        console.log("getUserData fired");
        $http.get("/auth/user/data").then(function(response){
            user.data = response.data;
            console.log("rsjService.user.data :", user.data);
        });
    };


    var postUserData = function(data){
        console.log("postUserData fired and sent:", data);
        $http.post("/auth/user/data", data).then(function(response){
            getUserData();
        });
    };

    var autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired and sent:", data);
        $http.post("/auth/user/autosave", data).then(function(response){
            console.log("response from autosave", response);
            user.data = response.data;
        });
    };

    var autoSaveCurrentPage = function(data){
        console.log("autoSaveCurrentPage fired");
        $http.post("/auth/user/currentpage", data).then(function(response){
            console.log("response from autoSaveCurrentPage", response);
            user.data = response.data;
        });
    };


    var getQuestions = function(){
        console.log("getQuestions fired");
        $http.get("/auth/user/admin/questions").then(function(response){
            site.allQuestions = response.data;
            console.log("rsjService.site.allQuestions was set to", site.allQuestions);
        });
    };

    var loginStatus =  function() {
        console.log("checking user login status");
        $http.get("/login").then(function(response){
            if(response.data !== true){
                console.log("NOT LOGGED IN!");
                user.isLoggedIn = false;
                showLoginDialog();
            } else {
                console.log("LOGGED IN! ", response.data);
                user.isLoggedIn = true;
                getUserData();
                getPages();
                getQuestions();
                $location.path('/library');
                $mdDialog.hide();
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
        console.log("login fired");
        $http.post("/login", data).then(function(response){
            loginStatus();
        });
    };

    var createUser = function(data) {
        console.log("createUser fired");
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
