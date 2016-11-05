// This is the user object we are passing around

(function (ngapp) {
    // Determine on client if user is an admin
    // Could just look at user.roles everywhere but better way is to implement modelling
    // and in Angular the best way is to use a resource.
    // Can use this for any user, not just current user.
    // For current user not calling rest, setting from mvAuth
    ngapp.factory('mvUser', function($resource){
        var UserResource = $resource('/api/users/:id', {_id: '@id'}, {
            // Add operations by adding parameter with key name of param, value is config for this operation
            update: {method: 'PUT', isArray: false}
        });

        // Add a new method to the resource (normally just query, save, update)
        UserResource.prototype.isAdmin = function() {
            // This is the user that this instance of the resource is managing
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return UserResource;
    });

}(window.angular.module('app')));