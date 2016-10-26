/**
 * Created by Alison on 22/08/2014.
 */

// returns a service with name eventData
eventsApp.factory('eventData', function($http,$q){
     return{
        getEvent: function(){
            var deferred = $q.defer();

            $http({method:'GET', url:'./data/event/1.json'}).
                // http returns a promise so this is a 'then' method
                success(function(data,status,headers,config){
                   deferred.resolve(data);
            }).
                error(function(data,status,headers,config){
                   deferred.reject(status);
            });

            return deferred.promise;
        }
     };
});