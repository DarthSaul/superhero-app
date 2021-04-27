const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin, isOwner, countCharacters } = require('../utilities/middleware');
const characters = require('../controllers/characters')

router.post('/:characterId', verifyLogin, countCharacters, characters.addCharacter)

router.delete('/:characterId', verifyLogin, isOwner, characters.removeCharacter)

module.exports = router;