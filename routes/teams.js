const express = require('express')
const router = express.Router();
const { verifyLogin, isOwner, validateTeam } = require('../utilities/middleware')
const teams = require('../controllers/teams')

router.route('/')
    .get(teams.index)
    .post(verifyLogin, validateTeam, teams.createTeam);

router.get('/new', verifyLogin, teams.renderNewForm);

router.route('/:id')
    .get(teams.showTeam)
    .put(verifyLogin, isOwner, validateTeam, teams.updateTeam)
    .delete(verifyLogin, isOwner, teams.destroyTeam);

router.get('/:id/edit', verifyLogin, isOwner, teams.renderEditForm)
    
module.exports = router;