const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    alias: {
        type: String,
        required: true
    },
    universe: {
        type: String,
        required: true,
        enum: ["marvel", "dc"]
    }, 
    stats: {
        iq: {type: Number, required: true},
        strength: {type: Number, required: true},
        speed: {type: Number, required: true},
        magic: {type: Number, required: true}, 
        total: {type: Number, default: this.iq + this.strength + this.magic}
    }
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;