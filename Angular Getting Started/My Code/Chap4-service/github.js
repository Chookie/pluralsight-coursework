
(function (){

    var github = function ($http) {

        var getUser = function (username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    // .then wraps response in a promise,
                    // so don't just return value, return a promise
                    // that will return data.
                    return response.data;
                });
        };

        var getRepos = function (user) {
            return $http.get(user.repos_url)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    // Get reference to existng module
    var module = angular.module("githubViewer");
    // Register with angular.  There are lots of ways
    // but this is simplest
    module.factory("github",github);

}());
