
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

// Node has variable for environment, if it has been set else default
var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';

// Create express app
var app = express();

// Setup middleware configuration
function compile(str, path) {
    return stylus(str).set('filename', path);
}

// setup view location and view engine
// __dirname is main script directory
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// Set logging mode to dev (verbose)
app.use(logger('dev'));

// Used by other middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Middleware is express concept where injected into chain takes req, res, next and can modify req or response then call next.
// stylus middleware is method that wraps this and we just set some other properties.
// Where to find stylus files
app.use(stylus.middleware (
    {
        src: __dirname + '/public',
        compile: compile
    }
));
// Tell express that any static files come from the public folder. E.g. favicon, angular files.
app.use(express.static(__dirname + '/public'));

// * means how to handle all requests and send to index page
// Server will always return index.html client page which will then route on client side using angular routing etc.
// Making client do all the routing rather then this server
// Can get into trouble if you forget leading slash in angular
// Other solution is to have server know about all client side routes
// and have default * send back 404 error
app.get('*', function (req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log("listening on ports " + port + " in " + env + " mode...");