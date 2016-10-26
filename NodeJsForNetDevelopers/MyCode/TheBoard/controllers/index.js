// Use this controller for initialising all controllers

(function (controllers) {

    var homeController = require("./homeController");
    var usersController = require("./usersController");
    var notesController = require("./notesController");

    controllers.init = function (app) {
        homeController.init(app);
        usersController.init(app);
        notesController.init(app);
    };

}(module.exports));