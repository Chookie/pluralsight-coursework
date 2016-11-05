var express = require('express');

// Node has variable for environment, if it has been set else default
var env = process.env.DEBUG_ENV = process.env.DEBUG_ENV || 'development';

// Create express app
var app = express();

var config = require("./server/config/config")[env];

require("./server/config/express")(app, config);

require("./server/config/mongoose")(app, config);

require('./server/config/passport')();

require("./server/config/routes")(app);


app.listen(config.port);
console.log("Listening on port " + config.port + " in " + env + " mode");