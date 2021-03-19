const express = require('express')
const router = express.Router();
const { verifyLogin, isAuthor, validateHero } = require('../utilities/middleware')
const heroes = require('../controllers/heroes')

router.route('/')
    .get(heroes.index)
    .post(verifyLogin, validateHero, heroes.createHero);

router.get('/new', verifyLogin, heroes.renderHeroForm);

router.route('/:id')
    .get(heroes.showHero)
    .put(verifyLogin, isAuthor, validateHero, heroes.updateHero)
    .delete(verifyLogin, isAuthor, heroes.destroyHero);

router.get('/:id/edit', verifyLogin, isAuthor, heroes.renderHeroEdit);

module.exports = router;