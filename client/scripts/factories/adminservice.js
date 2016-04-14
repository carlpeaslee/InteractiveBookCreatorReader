myApp.factory("AdminService", ["$http", function($http){
    var getQuestions = function(){
        $http.get("/auth/user/admin/questions").then(function(response){
            admin.questions = response.data;
        });
    };

    var submitNewQuestion = function(data){
        $http.post("/auth/user/admin/newquestion", data).then(function(response){
            getQuestions();
        });
    };

    var getPages = function(){
        $http.get("/auth/user/admin/pages").then(function(response){
            admin.pages = response.data;
        });
    };

    var submitNewPage = function(data){
        $http.post("/auth/user/admin/newpage", data).then(function(response){
            getPages();
        });
    };

    var initialCall = function(){
        if(admin.questions === undefined){
            getQuestions();
        }
    };

    var admin = {};

    return {
        getQuestions: getQuestions,
        submitNewQuestion: submitNewQuestion,
        getPages: getPages,
        submitNewPage: submitNewPage,
        initialCall: initialCall,
        admin: admin
    };
}]);
