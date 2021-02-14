const mongoose = require('mongoose');
const Hero = require('./models/hero');

mongoose.connect('mongodb://localhost:27017/superheroApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("CONNECTED TO mongod")
    })
    .catch(err => {
        console.log("mongod CONNECTION ERROR")
    });

Hero.insertMany([
    {name: "Iron Man", alias: "Tony Stark", universe: "marvel", stats: {iq: 10, strength: 4, speed: 6, magic: 0}},
    {name: "Batman", alias: "Bruce Wayne", universe: "dc", stats: {iq: 8, strength: 6, speed: 4, magic: 0}},
    {name: "Thor", alias: "Thor Odinson", universe: "marvel", stats: {iq: 2, strength: 8, speed: 4, magic: 6}}
])
.then(res => console.log(res))
.catch(err => console.log(err))


