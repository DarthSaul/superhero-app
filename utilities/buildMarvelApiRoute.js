const md5 = require('md5');

const publicKey = "12334538c4740e72eae357738430b840";
const privateKey = "afe655f79b831ff1d1e96df2de82a5e9b8e2d114";
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

    url += "limit=50&"; // set limit for every request
    return url += accessKey; // attach access info
}

module.exports = buildMarvelApiRoute;