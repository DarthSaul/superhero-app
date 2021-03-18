const express = require('express')
const router = express.Router();
const Hero = require('../models/hero');
const wrapAsync = require('../utilities/wrapAsync');
const { heroSchema } = require('../joi-schemas/schemas.js');

const validateHero = (req, res, next) => {
    const { error } = heroSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        req.flash("error", msg)
        res.redirect('/heroes/new')
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
    const hero = await Hero.findById(req.params.id).populate("equipment");
    if (!hero) {
        req.flash("error", `Sorry, cannot find a hero profile under the ID: ${req.params.id} `)
        return res.redirect('/heroes')
    }
    res.render('heroes/show', { hero })
}));

router.post('/', validateHero, wrapAsync( async (req, res) => {
    const newHero = new Hero(req.body.hero);
    const hero = await newHero.save();
    req.flash("success", "New hero added to the database!");
    res.redirect(`/heroes/${hero._id}`);
}));

router.get('/:id/edit', wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('heroes/edit', { hero })
}));

router.put('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findByIdAndUpdate(id, req.body.hero, {runValidators: true, new: true})
    req.flash("success", "Hero profile updated!");
    res.redirect(`/heroes/${hero._id}`)
}));

router.delete('/:id', wrapAsync(async (req, res) => {
    await Hero.findByIdAndDelete(req.params.id);
    req.flash("success", "Hero profile was deleted.");
    res.redirect('/heroes');
}));

module.exports = router;