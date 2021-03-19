const express = require('express')
const router = express.Router();
const { verifyLogin, isAuthor, validateHero } = require('../utilities/middleware')
const heroes = require('../controllers/heroes')


router.get('/', heroes.index);

router.get('/new', verifyLogin, heroes.renderHeroForm);

router.get('/:id', heroes.showHero);

router.post('/', verifyLogin, validateHero, heroes.showHero);

router.get('/:id/edit', verifyLogin, isAuthor, heroes.renderHeroEdit);

router.put('/:id', verifyLogin, isAuthor, validateHero, heroes.updateHero);

router.delete('/:id', verifyLogin, isAuthor, heroes.destroyHero);

module.exports = router;