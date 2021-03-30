const wrapAsync = require('../utilities/wrapAsync');
const buildMarvelApiRoute = require('../utilities/buildMarvelApiRoute');
const api = require('../utilities/marvelApi');

module.exports.findCharacter = wrapAsync(async(req, res) => {
    const queries = req.body;
    const url = buildMarvelApiRoute('/characters', queries);
    const { data } = await api.get(url)
    const { results } = data.data;
    console.log(results[0])
    res.render('search/index', { results })
})