const express = require('express')
const router = express.Router({ mergeParams: true });
const Hero = require('../models/hero')
const Equipment = require('../models/equipment');
const wrapAsync = require('../utilities/wrapAsync');
const { verifyLogin, validateEquipment } = require('../utilities/middleware');

router.post('/', verifyLogin, validateEquipment, wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    const equipment = new Equipment(req.body.equipment);
    hero.equipment.push(equipment);
    await hero.save();
    await equipment.save();
    req.flash("success", "New equipment added.")
    res.redirect(`/heroes/${hero._id}`)
}));

router.delete('/:equipId', verifyLogin, wrapAsync(async (req, res) => {
    const { id, equipId } = req.params;
    await Hero.findByIdAndUpdate(id, { $pull: { equipment: equipId } });
    await Equipment.findByIdAndDelete(equipId);
    req.flash("success", "Equipment was deleted.")
    res.redirect(`/heroes/${id}`)
}));

module.exports = router;