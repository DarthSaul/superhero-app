const Team = require('../models/team');
const wrapAsync = require('../utilities/wrapAsync');
const Character = require('../utilities/characterConstructor')

module.exports.addCharacter = wrapAsync(async(req, res) => {
    const team = await Team.findById(req.params.id);
    const { name, thumbnail } = req.body.character
    const character = new Character(name, thumbnail);
    team.characters.push(character);
    await team.save();
    console.log(team)
    req.flash("success", "New character added to your team!");
    res.redirect(`/teams/${team._id}`)
})

module.exports.removeCharacter = wrapAsync(async(req, res) => {
    const { id, characterId } = req.paramsl
    await Team.findByIdAndUpdate(id, { $pull: { characters: characterId } });
    req.flash("success", "Character was removed.")
    res.redirect(`/teams/${id}`)
})