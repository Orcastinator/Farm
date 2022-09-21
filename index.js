const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

const passport = require('passport');
const { loginCheck } = require('./auth/passport');
loginCheck(passport);
const session = require('express-session');

const db = process.env.MONGOLAB_URI;
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log("DB Connected."))
.catch(err => console.log(err));

app.use(session({
    secret: "oneboy",
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/login'));

app.listen(process.env.PORT || 3001, console.log("Server listening at "+process.env.PORT));