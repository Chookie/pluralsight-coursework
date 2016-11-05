(function (exports) {

    var passport = require('passport');

    exports.authenticate = function (req, res, next) {
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

}(module.exports));