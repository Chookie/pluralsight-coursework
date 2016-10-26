(function (data){

    var seedData = require("./seedData");
    var database = require("./database");

/*    data.getNoteCategories = function (next) {
        var error = null;
        next(error, seedData.initialNotes);
    };*/
    data.getNoteCategories = function (next) {
        database.getDb( function (err, db) {
            if(err){
                next(err, null);
            } else {
                // Convert to a collection (like LINQ)
                db.notes.find().sort({ name: 1 }).toArray( function (err, results) {
                    if(err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                })
            }
        });
    };

    data.getNotes = function (categoryName, next) {
      database.getDb( function (err, db) {
          if(err){
              next(err, null);
          } else {
              // Can just pass in next as has same signature as function find expects
              db.notes.findOne( {name: categoryName}, next );
/*              db.notes.findOne( {name: categoryName}( function (err, result) {
                  if(err) {
                      next(err, null);
                  } else {
                      next(err, result);
                  }
              });*/
          }
      });
    };

    data.addNote = function (categoryName, noteToInsert, next) {
        database.getDb( function (err, db) {
            if (err) {
                next(err);
            } else {
                db.notes.update({name: categoryName}, {$push: {notes: noteToInsert}}, next);
            }
        });
    };

    data.createNewCategory = function (categoryName, next) {
      database.getDb( function (err, db) {
            if(err) {
                next(err);
            } else {
                db.notes.find({ name: categoryName}).count( function(err, count) {

                    if(err){
                        next(err);
                    } else {
                        if(count !== 0) {
                            next("Category '" + categoryName + "' already exists");
                        } else {
                            // Need empty notes so we can count them later
                            var cat = {
                                name: categoryName,
                                notes: []
                            };
                            db.notes.insert(cat, function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    next(null);
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    data.addUser = function (user, next) {
        database.getDb( function(err, db) {
            if(err) {
                next(err);
            } else {
                db.users.insert( user, next);
            }
        });
    };

    data.getUser = function (username, next) {
        database.getDb( function(err, db) {
            if(err) {
                next(err);
            } else {
                db.users.findOne( {username: username }, next );
            }
        });
    };

    var seedDatabase = function () {
        database.getDb( function (err, db) {
            if(err){
                console.log("Failed to seed database: " + err);
            } else {
                // Make sure not already seeded.  Needs to be async
                db.notes.count( function(err, count) {
                    if(err){
                        console.log("Error counting notes: " + err);
                    } else {
                        if(count === 0) {
                            // Never stored anything here
                            console.log("Seeding the database...");
                            seedData.initialNotes.forEach( function (item) {
                                db.notes.insert(item, function (err) {
                                    if(err){
                                        console.log("Error inserting note: " + err);
                                    }
                                });
                            });
                            console.log("Seeding complete")
                        } else {
                            console.log("Database already seeded");
                        }
                    }
                });
            }
        });
    };

    seedDatabase();

}(module.exports));