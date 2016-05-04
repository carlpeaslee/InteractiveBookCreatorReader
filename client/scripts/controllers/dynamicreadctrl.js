myApp.controller("DynamicReadCtrl", ["$scope", "$sce", "$http", "$location", "$route", "$routeParams", "$compile", "$timeout", "$mdToast", "RSJService", function($scope, $sce, $http, $location, $route, $routeParams, $compile, $timeout, $mdToast, RSJService){
    var rsjService = RSJService;
    var dread = this;

    var book = {};
    var pageDex;
    dread.pageObject = {};

    rsjService.user.data.currentbook = $routeParams.book;

    var setup = function() {


        liblinkHandler();
        setBookObject();
        setPageDex();
        setPageObject();
    }



    var liblinkHandler = function() {
        if ($routeParams.page == "liblink") {
            for (var i = 0; i < rsjService.user.data.allprogress.length; i++) {
                if (rsjService.user.data.allprogress[i].linktitle == rsjService.user.data.currentbook) {
                    rsjService.user.data.currentpage = rsjService.user.data.allprogress[i].pnumber;
                    console.log("liblinkHandler set currentpage and routeParams.page to::", rsjService.user.data.currentpage);
                    return;
                }
            }
        }
    }

    var setBookObject = function() {
        console.log("setBookObject fired using currentbook:", rsjService.user.data.currentbook);
        for (var i = 0; i < rsjService.user.data.books.length; i++) {
            if (rsjService.user.data.books[i].linktitle == rsjService.user.data.currentbook) {
                book = rsjService.user.data.books[i];
                console.log("setBookObject set this book:", book);
            }
        }
    }


    var setPageDex = function() {
        console.log("setPageDex fired using currentpage", rsjService.user.data.currentpage);
        var startAtBeginning = true;
        for (var i = 0; i < book.pages.length; i++) {
            console.log("page for loop comparing:", book.pages[i].pnumber, rsjService.user.data.currentpage)
            if (rsjService.user.data.currentpage == "new") {
                pageDex = 0;
            }
            if (book.pages[i].pnumber == rsjService.user.data.currentpage) {
                pageDex = parseInt(book.pages[i].pdex);
                console.log("pageDex:", pageDex);
                startAtBeginning = false;
                return;
            }
        }
        if (startAtBeginning === true) {
            pageDex = 0;
            $mdToast.show($mdToast.simple()
                .textContent("Let's start at the beginning")
                .parent(angular.element(document.getElementsByClassName('newpage')))
            );
        }
    }

    var setPageObject = function() {
        for (var i = 0; i < book.pages.length; i++) {
            if (parseInt(book.pages[i].pdex) == pageDex) {
                dread.pageObject = book.pages[i];
                dread.html = book.pages[i].content[0];
                rsjService.user.data.currentpage = book.pages[i].pnumber;
                $route.updateParams({page: book.pages[i].pnumber});
                console.log("pageObject", dread.pageObject);
                return
            }
        }
    }

    dread.pageForward = function(){
        console.log("pageForward");
        var theEnd = false;
        for (var i = 0; i < book.pages.length; i++) {
            console.log("pageForward comparing", parseInt(book.pages[i].pdex), pageDex);
            if (parseInt(book.pages[i].pdex) == pageDex + 1) {
                pageDex = parseInt(book.pages[i].pdex);
                dread.pageObject = book.pages[i];
                dread.html = book.pages[i].content[0];
                $route.updateParams({page: book.pages[i].pnumber});
                rsjService.user.data.currentpage = book.pages[i].pnumber;
                //run a function that sets the allprogress tracker
                return;
            } else {
                theEnd = true;
            }
        }
        if (theEnd === true) {
            $mdToast.show($mdToast.simple()
                .textContent("You're at the end.")
                .parent(angular.element(document.getElementsByClassName('newpage')))
            );
        }
    }

    dread.pageBackward = function(){
        console.log("pageBackward");
        var theBeginning = false;
        for (var i = 0; i < book.pages.length; i++) {
            if (parseInt(book.pages[i].pdex) == pageDex - 1) {
                pageDex = parseInt(book.pages[i].pdex);
                dread.pageObject = book.pages[i];
                dread.html = book.pages[i].content[0];
                $route.updateParams({page: book.pages[i].pnumber});
                rsjService.user.data.currentpage = book.pages[i].pnumber;
                //run a function that sets the allprogress tracker
                return;
            } else {
                theBeginning = true;
            }
        }
        if (theBeginning === true) {
            $mdToast.show($mdToast.simple()
                .textContent("You're at the beginning.")
                .parent(angular.element(document.getElementsByClassName('newpage')))
            );
        }
    }

    setup();

}]);
