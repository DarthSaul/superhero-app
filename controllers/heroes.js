const Hero = require('../models/hero');
const wrapAsync = require('../utilities/wrapAsync');

module.exports.index = wrapAsync(async (req, res) => {
    const heroes = await Hero.find();
    res.render('heroes/index', { heroes });
});

module.exports.renderHeroForm = (req, res) => {
    res.render('heroes/new')
};

module.exports.showHero = wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id).populate({
        path: "equipment", 
        populate: {
            path: "postAuthor"
        }
    }).populate("postAuthor");
    if (!hero) {
        req.flash("error", `Sorry, cannot find a hero profile under the ID: ${req.params.id} `)
        return res.redirect('/heroes')
    }
    res.render('heroes/show', { hero })
});

module.exports.createHero = wrapAsync(async (req, res) => {
    const newHero = new Hero(req.body.hero);
    newHero.postAuthor = req.user._id;
    const hero = await newHero.save();
    req.flash("success", "New hero added to the database!");
    res.redirect(`/heroes/${hero._id}`);
});

module.exports.renderHeroEdit = wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    res.render('heroes/edit', { hero })
});

module.exports.updateHero = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hero = await Hero.findByIdAndUpdate(id, req.body.hero, {runValidators: true, new: true});
    req.flash("success", "Hero profile updated!");
    res.redirect(`/heroes/${hero._id}`)
});

module.exports.destroyHero = wrapAsync(async (req, res) => {
    await Hero.findByIdAndDelete(req.params.id);
    req.flash("success", "Hero profile was deleted.");
    res.redirect('/heroes');
});

