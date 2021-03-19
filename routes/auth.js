const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utilities/wrapAsync');
const passport = require('passport');
const auth = require('../controllers/auth')

router.get('/register', auth.renderRegisterForm);

router.post('/register', auth.registerUser);

router.get('/login', auth.renderLoginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.login)

router.get('/logout', auth.logout)

module.exports = router;