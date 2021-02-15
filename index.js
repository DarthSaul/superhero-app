const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Hero = require('./models/hero');

// Connect to local MongoDB daemon (mongod)
mongoose.connect('mongodb://localhost:27017/superheroApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("CONNECTED TO mongod")
    })
    .catch(err => {
        console.log("mongod CONNECTION ERROR")
    });

// Clears deprecation warning after using .find()
mongoose.set('useFindAndModify', false);

// Serve static assets from dir 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Settings for parsing POST requests
app.use(express.urlencoded({ extended: true }));

// method-override for PUT, PATCH, and DELETE
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/database', async (req, res) => {
    const heroes = await Hero.find();
    res.render('start/index', { heroes })
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
    const { name, alias, universe, iq, strength, speed, magic } = req.body;
    const newHero = new Hero({name, alias, universe, stats: {iq, strength, speed, magic}});
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
    const { name, alias, universe, iq, strength, speed, magic } = req.body;
    try {
        const hero = await Hero.findByIdAndUpdate(id, 
            {name, alias, universe, stats: {iq, strength, speed, magic}},
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
})

app.listen(3000, () => {
    console.log("PORT 3000 CONNECTION OPEN")
});
