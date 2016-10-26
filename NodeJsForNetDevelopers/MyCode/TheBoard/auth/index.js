(function (auth) {

    var data = require("../data");
    var hasher = require("./hasher");
    var passport = require('passport');
    // This is the version of auth we are using with passport.
    // .Strategy is because we only need the Strategy object
    var localStrategy = require('passport-local').Strategy;

    // Signature matches that required by passport.  See passport.use below.
    var userVerify = function (username, password, next) {
        data.getUser( username, function (err, user) {
            if(!err && user){
                // Verify hash of password from user matches the hash we have stored
                var testHash = hasher.computeHash(password, user.salt);
                if(testHash === user.paswordHash){
                    next(null, user);
                    return;
                }
            }

            // passport function expects null first, then false if failure, then message with failure reason.
            // We don't want to be specific about reason though for security.
            next(null, false, { message: "Invalid Credentials"});
        });
    };

    //6.11 Authorising pages
    auth.ensureAuthenticated = function (req, res, next) {
        // isAuthenticated added by passport middleware
        if(req.isAuthenticated()) {
            // continue
            next();
        } else {
            req.flash("loginReturnTo",req.path);
            res.redirect("/login");
        }
    };

    //6.11 Authorising apis
    auth.ensureApiAuthenticated = function (req, res, next) {
        // isAuthenticated added by passport middleware
        if(req.isAuthenticated()) {
            // continue
            next();
        } else {
            res.status(401).send("Not Authorised");
        }
    };

    auth.init = function (app) {

        // Setup passport authentication.  Tell it when needs to verify user can use this function
        passport.use(new localStrategy(userVerify));
        // Could also add google, OAuth etc
        //
        // Passport needs to know how to write and read user
        passport.serializeUser( function (user, next) {
            // null means not error and use this value as the key
            next(null, user.username);
        });
        passport.deserializeUser( function ( key, next) {
            data.getUser( key, function (err, user) {
                if(err) {
                    // expects null, then false for error, them message object
                    next(null, false, {message: "Failed to retrieve user"} );
                } else {
                    next(null, user);
                }
            });
        });
        // initialise returns an object representing all the passport configuration including bits we did above
        app.use(passport.initialize());
        // tell passport to use session storage to store logged in users temporarily
        app.use(passport.session());

        app.get("/login", function (req, res) {
           res.render( "vash/login", {title: "Login to The Board", message: req.flash("loginError")})
        });

        // Need additional param 'next' as passport wants post after as to whether login worked.
        app.post("/login", function (req, res, next) {
            // 'local' = username and password
            // This creates and returns a function that can be called to authenticate
            var authFunction = passport.authenticate("local", function (err, user, info) {
               if(err) {
                   next(err);
               } else {
                   req.logIn(user, function (err) {
                       if(err) {
                           next(err);
                       } else {
                           // Really want to look at url find original request and redirect to it
                           var redirect = req.flash("loginReturnTo").length === 0 ? '/' : req.flash("loginReturnTo");
                           res.redirect(redirect);
                           //res.redirect("/");
                       }
                   });
               }
            });
            // This actually starts the authentication setup above
            authFunction(req, res, next);
        });
        // Can just use this but want more control above
/*        app.post('/login',
            passport.authenticate('local', { successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true })
        );*/

        app.get("/register", function (req, res) {
           res.render("vash/register", {title: "Register for the board", message: req.flash("registrationError")});
        });

        app.post("/register", function (req, res) {

            var salt = hasher.createSalt();

            // salt is randomly generated string to strengthen encryption
            // salt makes the encryption algorithm a little more random
            var user = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                paswordHash: hasher.computeHash(req.body.password, salt),
                salt: salt
            };

            data.addUser(user, function (err) {
                if(err) {
                    // Store message in cookie and redirect to get above
                    res.flash("registrationError", "Could not save user to database.");
                    res.redirect("/register");
                } else {
                    // Should send email, verify email etc
                    res.redirect("/login");
                }
            })
        });
    };

}(module.exports));