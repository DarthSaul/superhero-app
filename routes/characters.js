const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin, isOwner, countCharacters } = require('../utilities/middleware');
const characters = require('../controllers/characters')

router.post('/:characterId', verifyLogin, characters.addCharacter)

router.delete('/:characterId', verifyLogin, characters.removeCharacter)

module.exports = router;