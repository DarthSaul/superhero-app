const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utilities/wrapAsync');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', wrapAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash("success", `Welcome, ${registerUser.username}!`)
            res.redirect('/heroes');
        })
    } catch (error) {
        req.flash("error", error.message)
        res.redirect('/register')
    }
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', 
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
    (req, res) => {
        req.flash("success", `Welcome back!`);
        res.redirect('/heroes')
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "You've been logged out.");
    res.redirect('/')
})

module.exports = router;