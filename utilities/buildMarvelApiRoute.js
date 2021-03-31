const md5 = require('md5');

const publicKey = process.env.MARVEL_API_PUBLIC;
const privateKey = process.env.MARVEL_API_PRIVATE;
const timeStamp = Date.now().toString();
const md5hash = md5(`${timeStamp}${privateKey}${publicKey}`);

const buildMarvelApiRoute = (route, queries) => {
    let url = `${route}?`;
    const accessKey = `ts=${timeStamp}&apikey=${publicKey}&hash=${md5hash}`;

    // Add on query fields from req.body
    if (queries) {
        for (const [key, value] of Object.entries(queries)) {
            if (value) {
               url += `${key}=${value}&`; 
            }     
        }
    }

    url += "limit=100&"; // set limit for every request
    return url += accessKey; // attach access info
}

module.exports = buildMarvelApiRoute;