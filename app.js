const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')

const heroRoutes = require('./routes/heroes');

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

// EJS IMPLEMENTATION AND VIEWS DIRECTORY CONFIG
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// HOME PAGE
app.get('/', (req, res) => {
    res.render('home')
});

// HERO ROUTES
app.use('/heroes', heroRoutes);

// PLAY ROUTES
app.get('/play', (req, res) => {
    res.render('play/index');
})

// ERROR HANDLING
app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Oops, something went wrong..." } = err;
    res.status(status).render('error', { message })
})

// LOCAL BROWSER PORT CONNECTION
app.listen(3000, () => {
    console.log("PORT 3000 CONNECTION OPEN")
});
