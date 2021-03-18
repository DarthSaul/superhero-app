const { heroSchema, equipmentSchema } = require('../joi-schemas/schemas'); 

module.exports.verifyLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please login to view that page.");
        return res.redirect('/login')
    }
    next();
};

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