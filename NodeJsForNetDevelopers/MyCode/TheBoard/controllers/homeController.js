(function (controller) {

    var data = require("../data");
    // 6.11 authorizing
    var auth = require("../auth");

    controller.init = function (app) {

        app.get("/", function (req, res) {

            console.log("Getting categories...");
            data.getNoteCategories( function (err, results){

                if(err) {
                    console.log("Error getting categories: " + err);
                } else {
                    console.log("Categories loaded");
                    res.render("vash/index",
                        {
                            title: "The Board",
                            error: err,
                            categories: results,
                            newCatError: req.flash("newCatError"),
                            // user is added to req by the passport middleware
                            user: req.user
                        });
                }
            });
        });

        // telling router to call auth.ensureAuthenticated first and if succeeds then call next which is our function.
        // Look in auth/index.js to see how it calls next if successful
        app.get("/notes/:categoryName", auth.ensureAuthenticated, function (req, res) {
           var categoryName = req.params.categoryName;
           res.render("vash/notes", { title: categoryName, user: req.user})
        });

        app.post("/newCategory", function (req, res) {
            // body is form encoded data
            var categoryName = req.body.categoryName;
            console.log("Creating new category " + categoryName);
            data.createNewCategory( categoryName, function (err) {
                if(err) {
                    // Handle error
                    console.log(err);
                    // flash stores in session
                    req.flash("newCatError", err);
                    res.redirect("/");
                } else {
                    res.redirect("/notes/" + categoryName);
                }
            })
        });
    }

}(module.exports));