angular.module('app').controller("mvSignupCtrl",
        ["$scope", "mvUser",  "mvNotifier", "$location", "mvAuth",
        function ($scope, mvUser, mvNotifier, $location, mvAuth) {

    $scope.signup = function () {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        };

        mvAuth.createUser(newUserData).then(function () {
            mvNotifier.success('User account created!');
            $location.path("/");
        }, function(reason) {
            mvNotifier.error(reason);
        });
    }
}]);