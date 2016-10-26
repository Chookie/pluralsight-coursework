// notesView.js
(function (angular) {

    //Need to include ui.bootstrap because we are using bootstrap btn-group on notes.vash
    var app = angular.module("notesView",["ui.bootstrap"]);

    var notesViewController = function ($scope, $window, $http) {

        $scope.notes = [];
        $scope.newNote = createBlankNote();

        // Get category name
        // Using $window rather than window so we can inject and unit test
        var urlParts = $window.location.pathname.split("/");
        var categoryName = urlParts[urlParts.length - 1];
        var notesUrl = "/api/notes/" + categoryName;
        // http uses promises so can chain several together
        $http.get(notesUrl)
            .then(function (result) {
                $scope.notes = result.data;
            }, function (err) {
                console.log(err);
            });

        var socket = io.connect();
 /*       socket.on("showThis", function (msg) {
           alert(msg);
        });*/

        // Join a 'Room' called the category name
        socket.emit("join category", categoryName);

        socket.on("broadcast note", function (note) {
            // Add to angular model
            $scope.notes.push(note);
            // because are not within angular piece of code we need to rebind
            $scope.$apply();
        });

        $scope.save = function() {
            $http.post(notesUrl, $scope.newNote)
            .then( function (result) {
                // Add saved and enriched note to collection
                $scope.notes.push(result.data);
                $scope.newNote = createBlankNote();
                socket.emit("newNote", {categoryName: categoryName, note: result.data});
            }, function (err) {
                // TODO
            });
        };

/*        $scope.notes = [
            {
                note: "Hello World",
                color: "yellow",
                author: "Alison Johnston"
            },
            {
                note: "Hello world again",
                color: "blue",
                author: "Alison Johnston"
            }
        ];*/
    };

    function createBlankNote() {
        return {
            note: "",
            color: "yellow"
        };
    }

    app.controller("notesViewController", ["$scope", "$window","$http", notesViewController]);

}(window.angular));