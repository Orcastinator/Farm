const registerView = (req, res) => {
    res.render("register", {});
}

const loginView = (req, res) => {
    res.render("login", {});
}

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const registerUser = (req, res) => {
    const { name, email, location, password, confirm } = req.body;
    if (!name || !email || !password || !confirm){
        console.log("Empty fields");
    }
    else if (password !== confirm){
        console.log("Password doesnt match");
    }
    else{
        User.findOne({email: email}).then((user) => {
            if (user){
                console.log("Email exists");
                res.render('register', {
                    name,
                    email,
                    password,
                    confirm
                });
            }
            else{
                const newUser = new User ({
                    name,
                    email,
                    location,
                    password
                });
                bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(res.redirect('/login'))
                    .catch((err) => console.log(err));
                })
                );
            }
        });
    }
}

const passport = require('passport');
const loginUser = (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        console.log/("empty fields");
        res.render('login', {
            email,
            password
        });
    }
    else{
        passport.authenticate("local", {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);
    }
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
}