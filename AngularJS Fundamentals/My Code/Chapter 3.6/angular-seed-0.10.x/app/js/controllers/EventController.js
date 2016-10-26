'use strict';

// Module name eventsApp from app.js
eventsApp.controller('EventController',
    function EventController($scope, eventData){

        $scope.sortOrder="name";
        $scope.boolValue=true;
        $scope.myStyle={color:'red'};
        $scope.myClass="blue";
        $scope.buttonDisabled=true;

        // Can just bind straight to function (unlike promise before)
        // $scope.event = eventData.getEvent();
        // Or can use promise if want to do some more processing, handle error etc
        eventData.getEvent().$promise.then(
            function(event) { $scope.event = event; console.log(event)},
            function(response) { console.log(response)}
        );

        $scope.upVoteSession=function(session){
            session.upVoteCount++;
        };

        $scope.downVoteSession=function(session){
            session.upVoteCount--;
        }
    }
);
