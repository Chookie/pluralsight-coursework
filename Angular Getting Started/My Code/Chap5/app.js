/**
 * Created by Alison on 10/01/15.
 */
(function (){

    // This one creates the module as has the array parameter
    var app = angular.module("githubViewer", ["ngRoute"]);

    // Configuration function to run when bringing this module to life
    // will run early on in the lifetime of the application.
    app.config( function ($routeProvider) {
        $routeProvider
            // Main is the default view
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/user/:username",{
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/user/:username/:reponame",{
                templateUrl: "repo.html",
                controller: "RepoController"
            })
            // If some route we don't support then redirect back to main view
            .otherwise({ redirectTo: "/main"})
    });

/*    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }])*/

}());