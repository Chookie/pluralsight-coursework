(function (exports) {

    var passport = require('passport');
    var crypto = require('crypto');

    exports.authenticate = function (req, res, next) {
        req.body.username = req.body.username.toLowerCase();
        var auth = passport.authenticate('local', function (err, user, info) {
            console.log('authenticating user %s', user.name)
            // If no password entered then authenticate does not get called on serverside of passport
            if(err) {
                console.error('login post err' + err);
                return next(err);
            }
            if(!user){
                console.error('login post user falsey');
                res.send({success:false})
            } else {
                // Normally don't need to do this login if using form but we are using xhr so need to
                req.logIn(user, function (err) {
                    if (err) {
                        console.error('login post login' + err);
                        return next(err);
                    }
                    res.send({success: true, user: user});
                });
            }
        });
        auth(req, res, next);
    };

    exports.createSalt = function (){
        // 128 bytes long.  Base64 format characters.
        return crypto.randomBytes(128).toString();
    };

    var hashPwd = function (salt, pwd) {
        // hmac = Hash Message Authentication Code
        // sha1 = algorithm
        var hmac = crypto.createHmac('sha1', salt);
        // This will return hex representation of hasing this pwd using sha1 algo and the given salt
        return hmac.update(pwd).digest('hex');
    };

    exports.hashPwd = hashPwd;

    exports.validatePassword = function (salt, passwordHashToMatch, userPasswordHash) {
        return hashPwd(salt, passwordHashToMatch) === userPasswordHash;
    };

    exports.requiresApiLogin = function (req, res, next) {
        if(!req.isAuthenticated()) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    };

    exports.requiresRole = function(role) {
        return function (req, res, next) {
            if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
                res.status(403);
                res.end();
            } else {
                next();
            }
        };
    };

}(module.exports));