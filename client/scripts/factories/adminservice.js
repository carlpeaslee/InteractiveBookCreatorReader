myApp.factory("AdminService", ["$http", function($http){
    var getQuestions = function(){
        $http.get("/admin/questions").then(function(response){
            admin.questions = response.data;
        });
    };

    var submitNewQuestion = function(data){
        $http.post("/admin/newquestion", data).then(function(response){
            getQuestions();
        });
    };

    var getPages = function(){
        $http.get("/admin/pages").then(function(response){
            admin.pages = response.data;
        });
    };

    var submitNewPage = function(data){
        $http.post("/admin/newpage", data).then(function(response){
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
