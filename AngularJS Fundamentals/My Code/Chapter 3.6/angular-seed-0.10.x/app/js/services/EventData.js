/**
 * Created by Alison on 22/08/2014.
 */

// returns a service with name eventData
eventsApp.factory('eventData', function($resource){

    var resource = $resource('./data/event/:id.json',{id:'@id'});

     return{
        getEvent: function(){
            return  resource.get({id:1})
        },
        save: function(event){
            event.id = 999;
            resource.save(event);
        }
     };
});