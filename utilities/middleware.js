const { heroSchema, equipmentSchema } = require('../joi-schemas/schemas'); 
const Hero = require('../models/hero');
const Equipment = require('../models/equipment')

module.exports.verifyLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please login to view that page.");
        return res.redirect('/login')
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const hero = await Hero.findById(req.params.id);
    if (!hero.postAuthor.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that.");
        return res.redirect(`/heroes/${hero._id}`);
    }
    next();
};

module.exports.isEquipmentAuthor = async (req, res, next) => {
    const { id, equipId } = req.params;
    const equipment = await Equipment.findById(equipId);
    if (!equipment.postAuthor.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that.");
        return res.redirect(`/heroes/${id}`);
    }
    next();
}

module.exports.validateHero = (req, res, next) => {
    const { error } = heroSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        req.flash("error", msg)
        res.redirect('/heroes/new')
    }
    next();
};

module.exports.validateEquipment = (req, res, next) => {
    const { id } = req.params;
    const { error } = equipmentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        req.flash("error", msg)
        res.redirect(`/heroes/${id}`)
    }
    next();
};