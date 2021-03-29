const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search')
const teamRoutes = require('./routes/teams')
const commentRoutes = require('./routes/comments')
const characterRoutes = require('./routes/characters')

const ExpressError = require('./utilities/ExpressError');

// CONNECT TO LOCAL MongoDB DAEMON (mongod)
mongoose.connect('mongodb://localhost:27017/superheroApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongod CONNECTION ERROR"));
db.once("open", () => {console.log("CONNECTED TO mongod")});

app.use(express.urlencoded({ extended: true })); // SETTINGS FOR PARSING POST REQUESTS
app.use(methodOverride('_method')); // method-override FOR PUT, PATCH, AND DELETE
app.use(express.static(path.join(__dirname, 'public'))); // SERVE STATIC ASSETS FROM DIR 'public'


const sessionConfig = {
    secret: "areallybadsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60,
        maxAge: 1000 * 60 * 60
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    if (!['/login', '/register', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    };
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// EJS IMPLEMENTATION AND VIEWS DIRECTORY CONFIG
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ROUTING
app.get('/', (req, res) => {
    res.render('home')
});
app.use('/', authRoutes);
app.use('/search', searchRoutes)
app.use('/teams', teamRoutes)
app.use('/teams/:id/comments', commentRoutes)
app.use('/teams/:id/characters', characterRoutes)

// ERROR HANDLING
app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) => {
    // console.log(err)
    const { status = 500, message = "Oops, something went wrong..." } = err;
    res.status(status).render('error', { message })
});

// LOCAL BROWSER PORT CONNECTION
app.listen(3000, () => {
    console.log("PORT 3000 CONNECTION OPEN")
});
