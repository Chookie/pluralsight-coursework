(function(){

    var auth = require('./auth'),
        users = require('../controllers/users'),
        mongoose = require('mongoose'),
        User = mongoose.model('User');

    module.exports = function(app) {

        app.get("/api/users", auth.requiresRole('admin'), users.getUsers);

        app.post('/api/users', users.createUser);

        //app.put('/api/users', users.updateUser);

        /*  5.2 Once add subdirectories get error due to subfolders causing cyclic routing
         // Requests coming from angular, send back the fragment (partial) it wants
         app.get('/partials/:partialPath', function (req, res) {
         res.render('partials/' + req.params.partialPath) ;
         });*/
         // Requests coming from angular, send back the fragment (partial) it wants
         // index[0] returns the star, zeroth element
         // Also moving folder.  Paths is relative to views directory as per view engine above
        app.get('/partials/*', function (req, res) {
            res.render('../../public/app/' + req.params[0]) ;
        });

        app.post('/login', auth.authenticate);

        app.post('/logout', function(req, res){
            // logout function was added by passport
            req.logout();
            res.end();
            // normally you would also redirect on teh server but since our client is handling all views
            // there is no need to redirect on the server at this point.
        });

        // * means how to handle all requests and send to index page
        // Server will always return index.html client page which will then route on client side using angular routing etc.
        // Making client do all the routing rather then this server
        // Can get into trouble if you forget leading slash in angular
        // Other solution is to have server know about all client side routes
        // and have default * send back 404 error
        // 6.4 3:00 adding second parameter object bootstrapuser so can store this value in the rendered page
        app.get('*', function (req, res) {
            res.render('index', {
                bootstrappedUser: req.user
            });
        });
        /* Moved in chapter 4.3
         /app.get('*', function (req, res) {
         res.render('index', { mongoMessage: mongoMessage });
         });*/
    };

}());