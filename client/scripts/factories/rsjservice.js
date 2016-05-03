myApp.factory("RSJService", ["$http", "$mdDialog", "$mdToast", "$location", function($http, $mdDialog, $mdToast, $location){

    var user = {};
    var pages = {};
    var site = {};

    var initialPageGet = function(){
        console.log("getPages fired");
        if (!pages.data){
            $http.get("/auth/user/pages")
                .then(function(response){
                    pages.data = response.data;
                    console.log("rsjService.pages.data :", pages.data);
                });
        }
    };

    var refreshPages = function(){
        console.log("refreshPages fired");
        return $http.get("/auth/user/pages")
            .then(function(response){
                pages.data = response.data;
                console.log("rsjService.pages.data :", pages.data);
                return pages.data;
            });
    };

    var refreshUserData = function(){
        console.log("refreshUserData fired");
        return $http.get("/auth/user/data").then(function(response){
            user.data = response.data;
            console.log("rsjService.user.data :", user.data);
            return user.data;
        });
    };

    var initialUserData = function(){
        console.log("initialUserData fired");
        if (!pages.data){
            $http.get("/auth/user/data").then(function(response){
            user.data = response.data;
            console.log("rsjService.user.data :", user.data);
            });
        }
    };

    var postUserData = function(data){
        console.log("postUserData fired and sent:", data);
        return $http.post("/auth/user/data", data)
            .then(function(response){
                user.data = response.data;
                console.log("postUserData: rsjService.user.data was refreshed:", user.data);
                return user.data;
        });
    };

    var autoSaveAnswers = function(data){
        console.log("autoSaveAnswers fired and sent:", data);
        return $http.post("/auth/user/autosave", data)
            .then(function(response){
                user.data = response.data;
                console.log("autoSaveAnswers: jService.user.data was refreshed:", user.data);
                return user.data;
        });
    };

    var saveNewQuestion = function(data){
        console.log("saveNewQuestion fired and sent:", data);
        return $http.post("/auth/user/newquestion", data)
            .then(function(response){
                user.data = response.data;
                console.log("saveNewQuestion: rsjService.user.data was refreshed:", user.data);
                return user.data;
        });
    };

    var saveNewBook = function(data){
        console.log("saveNewBook fired and sent:", data);
        return $http.post("/auth/user/newbook", data)
            .then(function(response){
                user.data = response.data;
                console.log("saveNewBook: rsjService.user.data was refreshed:", user.data);
                return user.data;
        });
    };

    var saveNewPage = function(data){
        console.log("saveNewPage fired and sent:", data);
        return $http.post("/auth/user/newpage", data)
            .then(function(response){
                user.data = response.data;
                console.log("saveNewPage: rsjService.user.data was refreshed:", user.data);
                return user.data;
        });
    };


    var autoSaveCurrentPage = function(data){
        console.log("autoSaveCurrentPage fired");
        $http.post("/auth/user/currentpage", data)
            .then(function(response){
                console.log("autoSaveCurrentPage responded");
        });
    };

    var loginStatus =  function() {
        console.log("checking user login status");
        $http.get("/login").then(function(response){
            if(!response.data._id){
                console.log("NOT LOGGED IN!");
                user.isLoggedIn = false;
                showWelcomeDialog();
            } else {
                console.log("LOGGED IN! ", response.data);
                user.isLoggedIn = true;
                user.data = response.data;
                initialPageGet();
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
            if (response.data._id){
                console.log("logged in");
                user.isLoggedIn = true;
                user.data = response.data;
                $location.path('/library')
                initialPageGet();
                $mdDialog.hide();
            }
        });
    };

    var autoTestLogin = function() {
        var data= {
            email: "cpeaslee@gmail.com",
            password: "asdfasdf"
        };
        console.log("admin cheat login fired", data);
        $http.post("/login", data).then(function(response){
            if (response.data._id){
                console.log("logged in");
                user.isLoggedIn = true;
                user.data = response.data;
                $location.path('/library')
                initialPageGet();
                $mdDialog.hide();
            }
        });
    };

    var createUser = function(data) {
        console.log("createUser fired");
        $http.post("/register", data).then(function(response){
            if (response.data._id) {
                console.log("user was created");
                createUserToast();
                setTimeout(login(response.config.data),1000);
            }
            else {

                console.log("no user?", response);
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
        initialPageGet: initialPageGet,
        refreshPages: refreshPages,
        initialUserData: initialUserData,
        refreshUserData: refreshUserData,
        loginStatus: loginStatus,
        login: login,
        createUser: createUser,
        postUserData: postUserData,
        user: user,
        pages: pages,
        site: site,
        autoSaveAnswers: autoSaveAnswers,
        autoSaveCurrentPage: autoSaveCurrentPage,
        loginAlert: loginAlert,
        autoTestLogin: autoTestLogin,
        saveNewQuestion: saveNewQuestion,
        saveNewBook: saveNewBook,
        saveNewPage: saveNewPage
    };
}]);
