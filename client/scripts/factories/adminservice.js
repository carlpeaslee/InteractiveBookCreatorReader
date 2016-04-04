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


    var initialCall = function(){
        if(admin.questions === undefined){
            getQuestions();
        }
    };

    var admin = {};

    return {
        getQuestions: getQuestions,
        submitNewQuestion: submitNewQuestion,
        initialCall: initialCall,
        admin: admin
    };
}]);
