(function (angular) {

    var app = angular.module('app', ['ngResource','ngRoute']);

    app.config( function ($routeProvider, $locationProvider) {

        var routeRoleChecks = {
            admin: {
                // This is injectable function so can bring in any injectables I want
                auth: function(mvAuth) {
                    return mvAuth.authoriseCurrentUserForRoute('admin')
            }},
            user: {
                auth: function(mvAuth){
                    return mvAuth.authoriseAuthenticatedUserForRoute()
                }
            }
        };

        $locationProvider.html5Mode(true);
        // Tell angular that when directed to root, route to our main partial
        // app.js then gets this and returns the right page.
        $routeProvider
            .when('/',{ templateUrl: '/partials/main/main', controller: 'mainCtrl'})
            .when('/admin/users', {templateUrl: '/partials/admin/user-list',
                controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
                // resolver allows conditions for going to route
 /*               resolve: {
                    // This is injectable function so can bring in any injectables I want
                    auth: function(mvAuth) {
                        return mvAuth.authoriseCurrentUserForRoute('admin')
                    }
                }*/
            .when('/signup',{ templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl'})
            .when('/profile',{ templateUrl: '/partials/account/profile',
                controller: 'mvProfileCtrl',resolve: routeRoleChecks.user})
            ;
    });

    // This will run after all of the above
    app.run( function( $rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(eventt, current, previous, rejectionReason){
            // Reason from above
            if(rejectionReason === 'not authorised') {
                $location.path('/');
            }
        });
    });

}(window.angular));