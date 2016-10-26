/**
 * Created by Alison on 22/08/2014.
 */

// returns a service with name eventData
eventsApp.factory('eventData', function($http,$log){
     return{
        getEvent: function(successcb){
            $http({method:'GET', url:'./data/event/1.json'}).
                // http returns a promise so this is a 'then' method
                success(function(data,status,headers,config){
                    // headers is a function so execute it to see values
                    $log.info(data, status, headers(), config);
                   successcb(data);
            }).
                error(function(data,status,headers,config){
                   $log.warn(data, status, headers(), config);
            });
        }
     };
});