const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utilities/wrapAsync');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.flash("success", `Welcome, ${registerUser.username}!`);
        res.redirect('/heroes')
    } catch (error) {
        req.flash("error", error.message)
        res.redirect('/register')
    }
});

module.exports = router;