const express = require('express')
const router = express.Router();
const { verifyLogin, isOwner, validateTeam, sanitize } = require('../utilities/middleware')
const teams = require('../controllers/teams');
const multer = require('multer');
const { storage } = require('../cloudinary')

const upload = multer({ storage })


router.route('/')
    .get(teams.index)
    .post(verifyLogin, upload.single('logo'), sanitize, validateTeam, teams.createTeam)


router.get('/new', verifyLogin, teams.renderNewForm);

router.route('/:id')
    .get(teams.showTeam)
    .put(verifyLogin, isOwner, upload.single('logo'), sanitize, validateTeam, teams.updateTeam)
    .delete(verifyLogin, isOwner, teams.destroyTeam);

router.get('/:id/edit', verifyLogin, isOwner, teams.renderEditForm)
    
module.exports = router;