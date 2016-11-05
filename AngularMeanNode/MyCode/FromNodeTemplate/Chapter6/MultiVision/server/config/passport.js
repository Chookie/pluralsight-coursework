(function() {

      var passport = require('passport'),
          mongoose = require('mongoose'),
          LocalStrategy = require('passport-local').Strategy,
          User = mongoose.model('User'),
          auth = require('./auth');

      module.exports = function () {
          passport.use(new LocalStrategy(
              function (username, password, done) {
                  console.log('findOne ' + username + ' ' + password);
                  User.findOne({username: username}).exec(function (err, user) {
                    if (user && auth.validatePassword(user.salt, password, user.hashed_pwd)) {
                        console.log('found ' + username);
                        return done(null, user);
                    } else {
                        console.error('error finding %s : %s ', username, err);
                        return done(null, false);
                    }
                  })
              }
          ));

          passport.serializeUser(function (user, done) {
              if (user) {
                  done(null, user._id);
              }
          });

          passport.deserializeUser(function (id, done) {
              User.findOne({_id: id}).exec(function (err, user) {
                  if (user) {
                      return done(null, user);
                  } else {
                      return done(null, false);
                  }
              })
          });
      };
}());