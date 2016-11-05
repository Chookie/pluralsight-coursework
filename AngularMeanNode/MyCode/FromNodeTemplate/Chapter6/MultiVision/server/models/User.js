(function (exports) {

    var mongoose = require('mongoose'),
        auth = require('../config/auth');

    var userSchema = mongoose.Schema({
        // {PATH} is replaced with property name
        firstname: {type: String, required: '{PATH} is required'},
        lastname: {type: String, required: '{PATH} is required'},
        username: {
            type: String,
            required: '{PATH} is required',
            unique: true
        },
        // We are sending he salt and password back to the client.  Should remove these from data sent to client.
        salt: {type: String, required: '{PATH} is required'},
        hashed_pwd: {type: String, required: '{PATH} is required'},
        roles: [String]
    });

    var User = mongoose.model('User', userSchema);

    exports.createDefaultUsers = function()
    {
        User.find({}).exec(function (err, collection){
            if(collection.length === 0){
                console.log('populating users collection');
                var salt, hash;
                salt = auth.createSalt();
                // Here just using username for password for simplicity
                hash = auth.hashPwd(salt, 'alison');
                User.create({
                    firstname: 'Alison', lastname: 'Johnston', username: 'alison', salt: salt, hashed_pwd: hash,
                    roles: ['admin']
                });
                salt = auth.createSalt();
                hash = auth.hashPwd(salt, 'jim');
                User.create({firstname: 'Jimmy', lastname: 'Hendrix', username: 'jim', salt: salt, hashed_pwd: hash});
            }
        });
    };

}(module.exports));