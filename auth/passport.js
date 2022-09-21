const bcrypt = require('bcryptjs');
const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const loginCheck = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done) => {
            User.findOne({email: email})
            .then((user) => {
                if (!user){
                    console.log("Wrong email");
                    return done();
                }
                else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch){
                            return done(null, user);
                        }
                        else {
                            console.log("Wrong pw");
                            return done();
                        }
                    });
                }
            })
            .catch((e) => console.log(e));
        }));
        passport.serializeUser((user, done) => {
            return done(null, user);
        });
        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                return done(err, user);
            });
        });
}

module.exports = {
    loginCheck
};