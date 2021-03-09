const express = require('express')
const router = express.Router();
const Hero = require('../models/hero');
const ExpressError = require('../utilities/ExpressError');
const wrapAsync = require('../utilities/wrapAsync');
const { heroSchema } = require('../schemas.js');

const validateHero = (req, res, next) => {
    const { error } = heroSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    }
    next();
}

router.get('/', wrapAsync( async (req, res) => {
    const { universe } = req.query;
    if (!universe) {
        const heroes = await Hero.find();
        res.render('heroes/index', { heroes, universe: null })
    } else {
        const heroes = await Hero.find({ universe });
        res.render('heroes/index', { heroes, universe })
    }
}));

router.get('/new', (req, res) => {
    res.render('heroes/new')
});

router.get('/:id', wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('heroes/show', { hero, errorMsg: null })
}));

router.post('/', validateHero, wrapAsync( async (req, res) => {
    const newHero = new Hero(req.body.hero);
    try {
        const hero = await newHero.save()
        res.redirect(`/heroes/${hero._id}`);
    } catch (error) {
        const msg = error;
        throw new ExpressError(msg, 400)
    };
}));

router.get('/:id/edit', wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('heroes/edit', { hero })
}));

router.put('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findByIdAndUpdate(id, req.body.hero, {runValidators: true, new: true})
    res.redirect(`/heroes/${hero._id}`)
}));

router.delete('/:id', wrapAsync(async (req, res) => {
    await Hero.findByIdAndDelete(req.params.id);
    res.redirect('/heroes');
}));

module.exports = router;