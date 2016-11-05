(function () {

    var express = require('express');
    var stylus = require('stylus');
    var logger = require('morgan');  // Express logger
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    var passport = require('passport');

    module.exports = function (app, config) {

        // Setup stylus middlewareconfiguration
        function compile(str, path) {
            return stylus(str).set('filename', path);
        }

        // * Config section
        // setup view location and view engine
        // __dirname is main script directory
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');

        // Set logging mode to dev (verbose).  Express 4 moved logger to separate module called morgan
        app.use(logger('dev'));
        // Session uses cookie for storage, also no longer part of express
        app.use(cookieParser());

        //// Used by other middleware to encode/decode form and json messages
        // app.use(bodyParser()); is deprecated
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        // Enable session storage, also no longer part of <<express></express></express>
        // secret is what session is encrypted with so no one else can intercept
        app.use(session({ secret: 'multivisionunicorns', saveUninitialized: true, resave: true}));

        // Initialise passport
        app.use(passport.initialize());
        // Tell passport to use session
        app.use(passport.session());


        // Middleware is express concept where injected into chain takes req, res, next and can modify req or response then call next.
        // stylus middleware is method that wraps this and we just set some other properties.
        // Where to find stylus files
        //noinspection JSCheckFunctionSignatures
        app.use(stylus.middleware (
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));

        // Tell express that any static files come from the public folder. E.g. favicon, angular files.
        app.use(express.static(config.rootPath + '/public'));
    };

}());
