(function(){

    var mongoose = require('mongoose');
    var crypto = require('crypto');

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

        var userSchema = mongoose.Schema({
            firstname: String,
            lastname: String,
            username: String,
            salt: String,
            hashed_pwd: String
        });

        var User = mongoose.model('User', userSchema);

        User.find({}).exec(function (err, collection){
           if(collection.length === 0){
               console.log('populating users collection');
               var salt, hash;
               salt = createSalt();
               // Here just using username for password for simplicity
               hash = hashPwd(salt, 'Alison');
               User.create({firstname: 'Alison', lastname: 'Johnston', username: 'alison', salt: salt, hashed_pwd: hash});
               salt = createSalt();
               hash = hashPwd(salt, 'Jimmy')
               User.create({firstname: 'Jimmy', lastname: 'Hendrix', username: 'jim', salt: salt, hashed_pwd: hash});
           }
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

        var createSalt = function (){
            // 128 bytes long.  Base64 format characters.
            return crypto.randomBytes(128).toString();
        };

        var hashPwd = function (salt, pwd) {
            // hmac = Hash Message Authentication Code
            // sha1 = algorithm
            var hmac = crypto.createHmac('sha1', salt);
            // This will return hex representation of hasing this pwd using sha1 algo and the given salt
            return hmac.update(pwd).digest('hex');
        }
    }

}());