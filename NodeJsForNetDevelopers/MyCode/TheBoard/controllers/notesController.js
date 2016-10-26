(function (notesController) {

    var auth = require("../auth");

    notesController.init = function (app) {

        var data = require("../data");

        app.get("/api/notes/:categoryName", auth.ensureApiAuthenticated,  function (req, res) {

            var categoryName = req.params.categoryName;

            data.getNotes( categoryName, function (err, category){
                if(err) {
                    // Set body
                    res.send(400,err );
                } else {
                    // Set header
                    res.set("Content Type", "application/json");
                    // Set body
                    res.send(category.notes);
                }
            });

        });

        app.post("/api/notes/:categoryName", auth.ensureApiAuthenticated, function (req, res) {

            var categoryName = req.params.categoryName;

            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author: "Alison Johnston"
            };

            data.addNote( categoryName, noteToInsert, function (err) {
                if(err) {
                    // Set body
                    res.send(400, err);
                } else {
                    res.set("Content Type", "application/json");
                    res.send(201, noteToInsert);
                }
            });

        });
    };

}(module.exports));