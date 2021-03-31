const wrapAsync = require('../utilities/wrapAsync');
const buildMarvelApiRoute = require('../utilities/buildMarvelApiRoute');
const api = require('../utilities/marvelApi');

module.exports.findCharacter = wrapAsync(async(req, res) => {
    const queries = req.body;
    const url = buildMarvelApiRoute('/characters', queries);
    const { data } = await api.get(url)
    const { results } = data.data;
    res.render('search/index', { results })
})

module.exports.findSeries = wrapAsync(async(req, res) => {
    const { id, name } = req.params;
    const url = buildMarvelApiRoute(`/characters/${id}/series`, {orderBy: "startYear"});
    const { data } = await api.get(url)
    const { results } = data.data;
    res.render('search/showSeries', { results, name })
})