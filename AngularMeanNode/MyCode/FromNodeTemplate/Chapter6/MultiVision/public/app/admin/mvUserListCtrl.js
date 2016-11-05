(function (angular) {

    var app = angular.module('app');

    var mvUserListCtrl = function ($scope, mvUser) {
        console.log("Querying Users...");
        $scope.users = mvUser.query();
    };

    app.controller("mvUserListCtrl", ["$scope", "mvUser", mvUserListCtrl]);

}(window.angular));