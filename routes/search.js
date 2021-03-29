const express = require('express');
const router = express.Router();
const wrapAsync = require('../utilities/wrapAsync');
const axios = require('axios');
const md5 = require('md5');

const Character = require('../utilities/characterConstructor')


const publicKey = "12334538c4740e72eae357738430b840";
const privateKey = "afe655f79b831ff1d1e96df2de82a5e9b8e2d114";
const timeStamp = Date.now().toString();
const md5hash = md5(`${timeStamp}${privateKey}${publicKey}`);

router.get('/', (req, res) => {
    res.render('search/index', { character: null });
});

router.post('/', wrapAsync(async(req, res) => {
    const { name } = req.body;
    const url = `http://gateway.marvel.com/v1/public/characters?name=${name.toLowerCase().replace(' ', "%20")}&ts=${timeStamp}&apikey=${publicKey}&hash=${md5hash}`
    const response = await axios.get(url);
    const result = response.data.data.results[0];
    const character = new Character(`${result.name}`, `${result.description}`, `${result.thumbnail.path}`)
    res.render('search/index', { character })
}))

module.exports = router;
