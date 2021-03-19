const Hero = require('../models/hero');
const Equipment = require('../models/equipment')
const wrapAsync = require('../utilities/wrapAsync');

module.exports.createEquipment = wrapAsync(async (req, res) => {
    const hero = await Hero.findById(req.params.id);
    const equipment = new Equipment(req.body.equipment);
    hero.equipment.push(equipment);
    equipment.postAuthor = req.user._id;
    await hero.save();
    await equipment.save();
    req.flash("success", "New equipment added.")
    res.redirect(`/heroes/${hero._id}`)
});

module.exports.destroyEquipment = wrapAsync(async (req, res) => {
    const { id, equipId } = req.params;
    await Hero.findByIdAndUpdate(id, { $pull: { equipment: equipId } });
    await Equipment.findByIdAndDelete(equipId);
    req.flash("success", "Equipment was deleted.")
    res.redirect(`/heroes/${id}`)
})