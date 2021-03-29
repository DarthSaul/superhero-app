const express = require('express')
const router = express.Router({ mergeParams: true });
const { verifyLogin } = require('../utilities/middleware');
const characters = require('../controllers/characters')

router.post('/', verifyLogin, characters.addCharacter)

router.delete('/:characterId', verifyLogin, characters.removeCharacter)

module.exports = router;