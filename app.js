const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Hero = require('./models/hero');

const ExpressError = require('./utilities/ExpressError')

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/database', async (req, res) => {
    const { universe } = req.query;
    if (!universe) {
        const heroes = await Hero.find();
        res.render('start/index', { heroes, universe: null })
    } else {
        const heroes = await Hero.find({ universe });
        res.render('start/index', { heroes, universe })
    }
});

app.get('/database/:id', async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    res.render('start/show', { hero, errorMsg: null })
});

app.get('/new', (req, res) => {
    res.render('start/new', { errorMsg: null })
});

app.post('/database', async (req, res) => {
    const { name, alias, image, universe, iq, strength, speed, magic } = req.body;
    const newHero = new Hero({name, alias, image, universe, stats: {iq, strength, speed, magic}});
    try {
        const hero = await newHero.save()
        res.redirect(`/database/${hero._id}`);
    } catch (error) {
        console.log(error)
        const errorMsg = true;
        res.render('start/new', { errorMsg })
    };
});

app.get('/database/:id/edit', async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    res.render('start/edit', { hero, errorMsg: null })
});

app.put('/database/:id', async (req, res) => {
    const { id } = req.params;
    const { name, alias, image, universe, iq, strength, speed, magic } = req.body;
    try {
        const hero = await Hero.findByIdAndUpdate(id, 
            {name, alias, image, universe, stats: {iq, strength, speed, magic}},
            {runValidators: true, new: true}
        );
        res.redirect(`/database/${hero._id}`);
    } catch (error) {
        const hero = await Hero.findById(id)
        const errorMsg = true;
        res.redirect(`start/${hero._id}/edit`, { hero, errorMsg })
    }
});

app.delete('/database/:id', async (req, res) => {
    const { id } = req.params;
    await Hero.findByIdAndDelete(id);
    res.redirect('/database');
});

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
