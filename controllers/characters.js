const Team = require('../models/team');
const wrapAsync = require('../utilities/wrapAsync');
const Character = require('../utilities/characterConstructor')
const getCharacter = require('../utilities/getCharacter')

module.exports.addCharacter = wrapAsync(async(req, res) => {
    const { id: userId, characterId } = req.params;
    const { name, thumbnail} = await getCharacter(characterId)
    const team = await Team.findOne({ owner: { _id: userId } });
    const character = new Character(name, `${thumbnail.path}/`);
    team.characters.push(character);
    await team.save();
    req.flash("success", `${character.name} was added to your team!`);
    res.redirect(`/teams/${team._id}`)
})

module.exports.removeCharacter = wrapAsync(async(req, res) => {
    const { id, characterId } = req.params;
    await Team.findByIdAndUpdate(id, { $pull: { characters: {_id: characterId} } });
    req.flash("success", "Character was removed.")
    res.redirect(`/teams/${id}`)
})