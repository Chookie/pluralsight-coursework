(function() {
    var app = angular.module("githubViewer", []);

    var MainController = function($scope, $http) {

        var onComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response) {
            $scope.repos = response.data;
        };

        var onError = function() {
            $scope.error = "Could not fetch the data";
        };

        $scope.search = function (username) {
            $scope.error = null;
            $http.get("https://api.github.com/users/" + username)
                .then(onComplete, onError);
        };

        $scope.username="angular";
        $scope.message="GitHubViewer";
        $scope.repoSortOrder="-stargazers_count"
    };

    app.controller("MainController", ["$scope","$http", MainController])

}());