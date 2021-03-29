const express = require('express');
const router = express.Router();
const wrapAsync = require('../utilities/wrapAsync');

// const checkForSearch = (req, res, next) => {
//     console.log(req.body);
//     next()
// }

router.get('/', (req, res) => {
    res.render('search/index', { nameQuery: null });
});

router.post('/', (req, res) => {
    console.log(req.body)
    const nameQuery = req.body.name;
    res.render('search/index', { nameQuery })
})

module.exports = router;