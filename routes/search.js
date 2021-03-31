const express = require('express');
const router = express.Router();
const search = require('../controllers/search')


router.get('/', (req, res) => {
    res.render('search/index', { results: null });
});

router.post('/', search.findCharacter);

router.get('/:id/:name', search.findSeries)


module.exports = router;
