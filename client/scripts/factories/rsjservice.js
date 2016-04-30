myApp.factory("RSJService", ["$http", "$mdDialog", "$mdToast", "$location", function($http, $mdDialog, $mdToast, $location){

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
                showWelcomeDialog();
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

    var showWelcomeDialog = function(ev) {
        $mdDialog.show({
          templateUrl: 'assets/views/welcome.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
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

    var loginAlert = {};

    var login = function(data) {
        console.log("login fired", data);
        $http.post("/login", data).then(function(response){
            console.log(response);
            if (response.data[0] == "password") {
                loginAlert.password = true;
            }
            if (response.data[0] == "email") {
                loginAlert.email = true;
            }
            if (response.data==true){
                loginStatus();
            }
        });
    };

    var createUser = function(data) {
        console.log("createUser fired");
        $http.post("/register", data).then(function(response){
            if (response.data == true) {
                createUserToast();
                setTimeout(login(user.data),1000);
            }
            else {
                console.log(response);
            }
        });
    };

    var createUserToast = function($event) {
        $mdToast.show($mdToast.simple()
            .textContent("User Created. Now logging in...")
            .position('bottom')
            .parent(angular.element(document.getElementsByClassName('login-box')))
        );
    };

    var backToLogin = function(ev){
        $mdDialog.hide();
        $mdDialog.show({
          templateUrl: 'assets/views/login.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
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
        loginAlert: loginAlert
    };
}]);
