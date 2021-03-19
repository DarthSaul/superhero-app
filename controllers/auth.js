const User = require('../models/user');
const wrapAsync = require('../utilities/wrapAsync');

module.exports.renderRegisterForm = (req, res) => {
    res.render('auth/register');
};

module.exports.registerUser = wrapAsync(async (req, res) => {
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
});

module.exports.renderLoginForm = (req, res) => {
    res.render('auth/login');
};

module.exports.login = (req, res) => {
    req.flash("success", `Welcome back!`);
    const redirectUrl = req.session.returnTo || '/';
    res.redirect(redirectUrl)
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "You've been logged out.");
    res.redirect('/')
}

