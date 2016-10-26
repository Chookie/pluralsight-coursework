( function (controller) {

    controller.init = function (app) {

        app.get("/api/users", function (req, res) {
            res.set("Content Type", "application/json");
            res.send({name: "Alison", location: "London"});
        });
    };

}(module.exports));