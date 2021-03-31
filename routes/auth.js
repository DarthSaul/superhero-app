const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../controllers/auth');

router.route('/register')
    .get(auth.renderRegisterForm)
    .post(auth.registerUser);

router.route('/login')
    .get(auth.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.login);

router.get('/logout', auth.logout)

module.exports = router;