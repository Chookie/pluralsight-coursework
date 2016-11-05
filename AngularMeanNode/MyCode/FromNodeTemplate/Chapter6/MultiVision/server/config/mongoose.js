(function(){

    var mongoose = require('mongoose');
    var userModel = require('../models/User');

    module.exports = function(app, config){

        mongoose.connect(config.db);
        var db = mongoose.connection;
        //db.on('error', console.error.bind(console, 'connection error...'));
        db.on('error', function (err){
            console.error("connection error... %s", err);
            app.close();
            process.exit(0);
        });
        db.once('open', function callback() {
            console.log('multivision db opened on ' + (config.db.indexOf("localhost") !== -1 ? 'localhost' : 'remote host'));
        });

        userModel.createDefaultUsers();

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
    }

}());