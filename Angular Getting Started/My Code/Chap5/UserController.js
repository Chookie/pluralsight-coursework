(function() {

    // This just gets a reference, not create as does not include array
    var app = angular.module("githubViewer");

    var UserController = function($scope, github, $routeParams, $location) {

        var onComplete = function(user) {
            $scope.user = user;
            github.getRepos(user).then(onRepos, onError);
        };

        var onRepos = function(repos) {
            $scope.repos = repos;
        };

        var onError = function() {
            $scope.error = "Could not fetch the data";
        };

        $scope.getRepo = function (username, reponame) {
            $location.path("/user/" + username + "/" + reponame);
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUser($scope.username).then(onComplete, onError);
    };

    app.controller("UserController", ["$scope", "github", "$routeParams", "$location", UserController])

}());