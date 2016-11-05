var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');  // Express logger
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Node has variable for environment, if it has been set else default
var env = process.env.DEBUG_ENV = process.env.DEBUG_ENV || 'development';

// Create express app
var app = express();

// Setup stylus middlewareconfiguration
function compile(str, path) {
    return stylus(str).set('filename', path);
}

// * Config section
// setup view location and view engine
// __dirname is main script directory
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// Set logging mode to dev (verbose).  Express 4 moved logger to separate module called morgan
app.use(logger('dev'));

// Used by other middleware to encode/decode form and json messages
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Middleware is express concept where injected into chain takes req, res, next and can modify req or response then call next.
// stylus middleware is method that wraps this and we just set some other properties.
// Where to find stylus files
//noinspection JSCheckFunctionSignatures
app.use(stylus.middleware (
    {
        src: __dirname + '/public',
        compile: compile
    }
));
// Tell express that any static files come from the public folder. E.g. favicon, angular files.
app.use(express.static(__dirname + '/public'));

var dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/multivision';
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened on ' + (dbUrl.indexOf("localhost") !== -1 ? 'localhost' : 'remote host'));
});
/* Moved in chapter 4.3
// Create a schema
var messageSchema = mongoose.Schema({message:  String });
// Create model using this schema
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
// Find first message in database
Message.findOne().exec( function( err, result) {
   mongoMessage = result.message;
});*/

/*  5.2 Once add subdirectories get error due to subfolders causing cyclic routing
// Requests coming from angular, send back the fragment (partial) it wants
app.get('/partials/:partialPath', function (req, res) {
   res.render('partials/' + req.params.partialPath) ;
});*/
// Requests coming from angular, send back the fragment (partial) it wants
// index[0] returns the star, zeroth element
app.get('/partials/*', function (req, res) {
    res.render('partials/' + req.params[0]) ;
});

// * means how to handle all requests and send to index page
// Server will always return index.html client page which will then route on client side using angular routing etc.
// Making client do all the routing rather then this server
// Can get into trouble if you forget leading slash in angular
// Other solution is to have server know about all client side routes
// and have default * send back 404 error
app.get('*', function (req, res) {
    res.render('index');
});
/* Moved in chapter 4.3
/app.get('*', function (req, res) {
    res.render('index', { mongoMessage: mongoMessage });
});*/

var port = parseInt(process.env.PORT, 10) || 3030;
app.listen(port);
console.log("Listening on port " + port + " in " + env + " mode");