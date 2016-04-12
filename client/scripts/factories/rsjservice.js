myApp.factory("RSJService", ["$http", "$mdDialog", "$location", function($http, $mdDialog, $location){

    var user = {};
    var pages = {};
    var site = {};

    var getPages = function(){
        console.log("getPages fired");
        $http.get("/pages").then(function(response){
            pages.data = response.data;
            console.log("rsjService.pages.data :", pages.data);
        });
    };

    var initialPageGet = function(){
        console.log("initialPageGet fired");
        if (pages.data == undefined) {
            $http.get("/pages").then(function(response){
                pages.data = response.data;
                console.log("rsjService.pages.data :", pages.data);
            });
        }
    };

    var getUserData = function(){
        console.log("getUserData fired");
        $http.get("/user/data").then(function(response){
            user.data = response.data;
            console.log("rsjService.user.data :", user.data);
        });
    };


    var postUserData = function(data){
        console.log("postUserData fired and sent:", data);
        $http.post("/user/data", data).then(function(response){
            getUserData();
        });
    };

    var autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired and sent:", data);
        $http.post("/user/autosave", data).then(function(response){
        });
    };

    var autoSaveCurrentPage = function(data){
        console.log("autoSaveCurrentPage fired");
        $http.post("/user/currentpage", data).then(function(response){
        });
    };


    var getQuestions = function(){
        console.log("getQuestions fired");
        $http.get("/admin/questions").then(function(response){
            site.allQuestions = response.data;
            console.log("rsjService.site.allQuestions was set to", site.allQuestions);
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
                    console.log("rsjService.user.data was set to:", user.data);
                    user.isLoggedIn = true;
                    $location.path('/library');
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
        console.log("login fired");
        $http.post("/", data).then(function(response){
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
        autoSaveCurrentPage: autoSaveCurrentPage,
        initialPageGet: initialPageGet
    };
}]);
