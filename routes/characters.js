const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin, isOwner } = require('../utilities/middleware');
const characters = require('../controllers/characters')

router.post('/', verifyLogin, isOwner, characters.addCharacter)

router.delete('/:characterId', verifyLogin, isOwner, characters.removeCharacter)

module.exports = router;