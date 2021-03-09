const express = require('express')
const router = express.Router({ mergeParams: true });
const Hero = require('../models/hero')
const Equipment = require('../models/equipment');
const wrapAsync = require('../utilities/wrapAsync');
const { equipmentSchema } = require('../schemas.js');

const ExpressError = require('../utilities/ExpressError');

const validateEquipment = (req, res, next) => {
    const { id } = req.params;
    const { error } = equipmentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        req.flash("error", msg)
        res.redirect(`/heroes/${id}`)
        // throw new ExpressError(msg, 400)
    }
    next();
}

router.post('/', validateEquipment, wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    const equipment = new Equipment(req.body.equipment);
    hero.equipment.push(equipment);
    await hero.save();
    await equipment.save();
    // Flash message here
    res.redirect(`/heroes/${hero._id}`)
}));

router.delete('/equipId', wrapAsync(async (req, res) => {
    const { id, equipId } = req.params;
    await Hero.findByIdAndUpdate(id, { $pull: { equipment: equipId } });
    await Equipment.findByIdAndDelete(equipId);
    // Flash message here
    res.redirect(`/heroes/${id}`)
}))

module.exports = router;