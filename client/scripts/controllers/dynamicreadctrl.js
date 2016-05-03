myApp.controller("DynamicReadCtrl", ["$scope", "$sce", "$http", "$location", "$route", "$routeParams", "$compile", "$timeout", "$mdToast", "RSJService", function($scope, $sce, $http, $location, $route, $routeParams, $compile, $timeout, $mdToast, RSJService){
    var rsjService = RSJService;
    var dread = this;

    rsjService.user.data.currentpage = $routeParams.page;
    rsjService.user.data.currentbook = $routeParams.book;

    var book = {};
    var pageDex;
    dread.pageObject = {};

    var setBookObject = function() {
        console.log("currentbook", rsjService.user.data.currentbook);
        for (var i = 0; i < rsjService.user.data.books.length; i++) {
            if (rsjService.user.data.books[i].title == rsjService.user.data.currentbook) {
                book = rsjService.user.data.books[i];
                console.log("book:", book);
            }
        }
    }

    var setPageDex = function() {
        console.log("currentpage", rsjService.user.data.currentpage);
        for (var i = 0; i < book.pages.length; i++) {
            console.log("page for loop comparing:", book.pages[i].displaypage, rsjService.user.data.currentpage)
            if (book.pages[i].displaypage == rsjService.user.data.currentpage) {
                pageDex = book.pages[i].pdex;
                console.log("pageDex:", pageDex);
                return;
            } else {
                console.log("dex else");
                pageDex = 0;
                console.log("pageDex:", pageDex);
            }
        }
        if (pageDex == 0) {
            $mdToast.show($mdToast.simple()
                .textContent("Cool! A new book! Let's start at the beginning")
                .parent(angular.element(document.getElementsByClassName('newpage')))
            );
        }
    }

    var setPageObject = function() {
        for (var i = 0; i < book.pages.length; i++) {
            if (book.pages[i].pdex == pageDex) {
                dread.pageObject = book.pages[i];
                dread.html = book.pages[i].content[0];
                console.log("pageObject", dread.pageObject);
                return
            }
        }
    }

    dread.pageForward = function(){
        console.log("pageForward");
        for (var i = 0; i < book.pages.length; i++) {
            if (book.pages[i].pdex == pageDex + 1) {
                pageDex = book.pages[i].pdex;
                dread.pageObject = book.pages[i];
                dread.html = book.pages[i].content[0];
                $route.updateParams({page: dread.pageObject.displaypage});
                rsjService.user.data.currentpage = dread.pageObject.displaypage;
            } else {
                $mdToast.show($mdToast.simple()
                    .textContent("You're at the end.")
                    .parent(angular.element(document.getElementsByClassName('newpage')))
                );
            }
        }
    }
    dread.pageBackward = function(){
        console.log("pageBackward");
        for (var i = 0; i < book.pages.length; i++) {
            if (book.pages[i].pdex == pageDex - 1) {
                pageDex = book.pages[i].pdex;
                dread.pageObject = book.pages[i];
                dread.html = book.pages[i].content[0];
                $route.updateParams({page: dread.pageObject.displaypage});
                rsjService.user.data.currentpage = dread.pageObject.displaypage;
            } else {
                $mdToast.show($mdToast.simple()
                    .textContent("You're at the beginning.")
                    .parent(angular.element(document.getElementsByClassName('newpage')))
                );
            }
        }
    }

    var setup = function() {
        setBookObject();
        setPageDex();
        setPageObject();
    }

    setup();



}]);
