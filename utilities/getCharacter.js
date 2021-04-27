const axios = require('axios'); 

const md5 = require('md5');
const publicKey = process.env.MARVEL_API_PUBLIC;
const privateKey = process.env.MARVEL_API_PRIVATE;
const timeStamp = Date.now().toString();
const md5hash = md5(`${timeStamp}${privateKey}${publicKey}`);

const api = require('./marvelApi');

async function getCharacter(id) {
    const accessKey = `ts=${timeStamp}&apikey=${publicKey}&hash=${md5hash}`;
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?&${accessKey}`
    const { data } = await axios.get(url)
    const { results } = data.data;
    return results[0]
}

module.exports = getCharacter