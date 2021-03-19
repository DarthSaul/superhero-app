const express = require('express')
const router = express.Router();
const Hero = require('../models/hero');
const wrapAsync = require('../utilities/wrapAsync');
const { verifyLogin, isAuthor, validateHero } = require('../utilities/middleware')


router.get('/', wrapAsync( async (req, res) => {
    const heroes = await Hero.find();
    res.render('heroes/index', { heroes })
}));

router.get('/new', verifyLogin, (req, res) => {
    res.render('heroes/new')
});

router.get('/:id', wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id).populate("equipment").populate("postAuthor");
    if (!hero) {
        req.flash("error", `Sorry, cannot find a hero profile under the ID: ${req.params.id} `)
        return res.redirect('/heroes')
    }
    res.render('heroes/show', { hero })
}));

router.post('/', verifyLogin, validateHero, wrapAsync(async (req, res) => {
    const newHero = new Hero(req.body.hero);
    newHero.postAuthor = req.user._id;
    const hero = await newHero.save();
    req.flash("success", "New hero added to the database!");
    res.redirect(`/heroes/${hero._id}`);
}));

router.get('/:id/edit', verifyLogin, isAuthor, wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('heroes/edit', { hero })
}));

router.put('/:id', verifyLogin, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findByIdAndUpdate(id, req.body.hero, {runValidators: true, new: true})
    req.flash("success", "Hero profile updated!");
    res.redirect(`/heroes/${hero._id}`)
}));

router.delete('/:id', verifyLogin, isAuthor, wrapAsync(async (req, res) => {
    await Hero.findByIdAndDelete(req.params.id);
    req.flash("success", "Hero profile was deleted.");
    res.redirect('/heroes');
}));

module.exports = router;