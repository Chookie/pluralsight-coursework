(function() {

    // This just gets a reference, not create as does not include array
    var module = angular.module("githubViewer");

    var RepoController = function($scope, github, $routeParams) {

        var onComplete = function(repo) {
            $scope.repo = repo;
        };

        var onError = function(reason) {
            $scope.error = reason;
        };

        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        $scope.collaboratorSortOrder = "-stargazers_count";
        github.getRepo($scope.username,$scope.username).then(onComplete, onError);
    };

    module.controller("RepoController", ["$scope", "github", "$routeParams", RepoController])

}());