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
    res.render('start/show', { hero })
});

app.listen(3000, () => {
    console.log("PORT 3000 CONNECTION OPEN")
});
