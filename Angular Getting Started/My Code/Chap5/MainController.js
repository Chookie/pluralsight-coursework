(function() {

    // This just gets a reference, not create as does not include array
    var app = angular.module("githubViewer");

    var MainController = function($scope, $interval, $location) {

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function(username) {
            if(countdownInterval){
                $interval.cancel(countdownInterval);
                $scope.countdown=null;
            }
            $location.path("/user/" + username)
        };

        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
    };

    // Supply names like "$scope" in the array is so minification does not abreviate
    // then and then angular wont fint them.s
    app.controller("MainController", ["$scope", "$interval", "$location", MainController])

}());