(function () {

    var github = function ($http) {

        var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                .then( function (response) {
                    // .then wraps our response function in a promise
                    // We return a promise to caller that will deliver 
                    // value response.data provides
                    return response.data;
                });
        };

        var getRepos = function (user) {
            return $http.get(user.repos_url)
                .then( function (response){
                    return response.data;
                });
        };

        var getRepo = function (username, reponame) {
            var result;
            var url = "https://api.github.com/repos/" + username + "/" + reponame;
            return $http.get(url)
                .then( function (response) {
                    result = response.data;
                    //return $http.get(url + "/collaborators");
                    return result;
                });
 /*               .then( function (response) {
                    result.collaborators = response.data;
                    return result;
                });*/
        };

        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepo: getRepo
        };

    };

    // Get reference to exisitng module
    var module = angular.module("githubViewer");
    // Register with angular.  There are lots of ways
    // but this is simplest
    module.factory("github",github);

}());