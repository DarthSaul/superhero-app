const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Hero = require('./models/hero');

const ExpressError = require('./utilities/ExpressError');
const wrapAsync = require('./utilities/wrapAsync');

const { heroSchema } = require('./schemas.js');


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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


const validateHero = (req, res, next) => {
    const { error } = heroSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    }
    next();
}


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/database', wrapAsync( async (req, res) => {
    const { universe } = req.query;
    if (!universe) {
        const heroes = await Hero.find();
        res.render('start/index', { heroes, universe: null })
    } else {
        const heroes = await Hero.find({ universe });
        res.render('start/index', { heroes, universe })
    }
}));

app.get('/database/new', (req, res) => {
    res.render('start/new', { errorMsg: null })
});

app.get('/database/:id', wrapAsync( async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('start/show', { hero, errorMsg: null })
}));

app.post('/database', validateHero, wrapAsync( async (req, res) => {
    const newHero = new Hero(req.body.hero);
    try {
        const hero = await newHero.save()
        res.redirect(`/database/${hero._id}`);
    } catch (error) {
        const msg = error;
        throw new ExpressError(msg, 400)
    };
}));

app.get('/database/:id/edit', wrapAsync( async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('start/edit', { hero, errorMsg: null })
}));

app.put('/database/:id', wrapAsync( async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findByIdAndUpdate(id, req.body.hero, {runValidators: true, new: true})
    res.redirect(`/database/${hero._id}`)
}));

app.delete('/database/:id', wrapAsync( async (req, res) => {
    await Hero.findByIdAndDelete(req.params.id);
    res.redirect('/database');
}));

app.get('/play', (req, res) => {
    res.render('play/index');
})

// ERROR HANDLING
app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
});

app.use((err, req, res, next) => {
    console.log("Hello from the error handler")
    const { status = 500, message = "Oops, something went wrong..." } = err;
    res.status(status).render('error', { message })
})

// LOCAL BROWSER PORT CONNECTION
app.listen(3000, () => {
    console.log("PORT 3000 CONNECTION OPEN")
});
