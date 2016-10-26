'use strict';

// Module name eventsApp from app.js
eventsApp.controller('EventController',
    function EventController($scope, eventData){

        $scope.sortOrder="name";
        $scope.boolValue=true;
        $scope.myStyle={color:'red'};
        $scope.myClass="blue";
        $scope.buttonDisabled=true;
        eventData.getEvent().then(
            function(event){ $scope.event = event; },
            function(statusCode){ console.log(statusCode)}
        );

        $scope.upVoteSession=function(session){
            session.upVoteCount++;
        };

        $scope.downVoteSession=function(session){
            session.upVoteCount--;
        }
    }
);
