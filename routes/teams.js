const express = require('express')
const router = express.Router();
const { verifyLogin, isAuthor } = require('../utilities/middleware')
const teams = require('../controllers/teams')

router.route('/')
    .get(teams.index)
    .post(verifyLogin, teams.createTeam);

router.get('/new', verifyLogin, teams.renderNewForm);

router.route('/:id')
    .get(teams.showTeam)
    .put(verifyLogin, teams.updateTeam)
    .delete(verifyLogin, teams.destroyTeam);

router.get('/:id/edit', verifyLogin, teams.renderEditForm)
    
module.exports = router;