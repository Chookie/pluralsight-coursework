// Some changes compared to video for express 4 from http://www.pluralsight.com/courses/discussion/nodejs-dotnet-developers

var http = require('http');
var express = require('express');
//var ejsEngine = require('ejs-locals')  // not require for view engine, dependency of it though for master layout
var controllers = require('./controllers');  // This will look for index.js in folder
// Another Express 4.x change that requires an additional install:
var expressSession = require('express-session');
// Another Express 4.x change that requires an additional install:…
var cookieParser = require('cookie-parser');
// Flash put data in the session, like a stack, only there first time.
var flash = require('connect-flash');

var app = express();

// Setup the view engine.  Don't need jade require as setting it here and express will set require
//app.set('view engine', 'jade');
//app.engine("ejs", ejsEngine);    // Support master pages (optional if dont want master)
//app.set('view engine', 'ejs');
app.set('view engine', 'vash');

// url encoded is for the form to work
app.use(bodyParser.urlencoded({ extended: true }));
// opt into services
// body parser no longer part of express as in course
// this is for the api to work with json
app.use(bodyParser.json());

// Session uses cookie for storage, also no longer part of express
app.use(cookieParser());
// Enable session storage, also no longer part of <<express></express></express>
// secret is what session is encrypted with so no one else can intercept
app.use(expressSession({
   secret: 'PluralsightTheBoard',
   saveUninitialized: true,
   resave: true

}));
// Flash stores data in session
app.use(flash());

// Tell express to allow static and which ones
app.use(express.static(__dirname + "/public"));

// use authentication
var auth = require("./auth");
auth.init(app);

// Map the routes
controllers.init(app);

/* Moved to controller
   app.get("/", function (req, res) {
   //res.send("URL = " + req.url);
   // json is passed into view and can be used during rendering
   //res.render("jade/index", { title: "Express + Jade"});
   //res.render("ejs/index", { title: "Express + EJS"});
   res.render("vash/index", { title: "Express + Vash"});
});*/

/*app.get("/api/users", function (req, res) {
   res.set("Content Type", "application/json");
   res.send({name: "Alison", location: "London"});
});*/

var server = http.createServer(app);

server.listen(3000);

// Attach to server and get socket messages
var updater = require("./updater");
updater.init(server);