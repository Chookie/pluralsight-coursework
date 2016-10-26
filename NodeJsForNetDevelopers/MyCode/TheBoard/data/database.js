(function (database) {

    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/theBoard";
    var theDb = null;
    // Mongodb uses connection pooling so keeping connection open and reusing speeds up access
    // Mongo prefers keeping this connection open
    database.getDb = function (next) {
        if(!theDb){
            // Connect to the db
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
               if(err) {
                   next(err, null);
               } else {
                   // Wrap the db in an object in case we need to add more to it later
                   var theDb = {
                        db: db,
                        notes: db.collection("notes"),  // Create collection
                        users: db.collection("users")  // Create collection
                   };
                   next(null, theDb);
               }
            });
        } else {
            next(null, theDb);
        }
    }

}(module.exports));