const mongoose = require('mongoose');
const Hero = require('../models/hero');

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
    {name: "Iron Man", alias: "Tony Stark", bio: "A true hero!", image: "https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/276493/386626/aug180958__70638.1541100080.jpg?c=2", postAuthor: "6053c7ba837ca9771a87c64c"},
    {name: "Wolverine", alias: "Logan", bio: "A true hero!", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Wolverine_%28James_%27Logan%27_Howlett%29.png/250px-Wolverine_%28James_%27Logan%27_Howlett%29.png", postAuthor: "6053c7ba837ca9771a87c64c"},
    {name: "Captain Marvel", alias: "Carol Danvers", bio: "A true hero!", image: "https://cdn11.bigcommerce.com/s-nq6l4syi/images/stencil/1280x1280/products/72173/195061/131694-1024__21001.1602529200.jpg?c=2?imbypass=on", postAuthor: "6053c7ba837ca9771a87c64c"}
])
.then(res => console.log(res))
.catch(err => console.log(err))