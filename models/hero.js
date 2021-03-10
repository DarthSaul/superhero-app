const mongoose = require('mongoose');
const { Schema } = mongoose;
const Equipment = require('./equipment')

const heroSchema = new Schema({
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
        lowercase: true,
        enum: ["marvel", "dc"]
    }, 
    image: String,
    equipment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Equipment"
        }
    ]
});

heroSchema.post('findOneAndDelete', async function(data) {
    if (data.equipment.length) {
       await Equipment.deleteMany({ _id: { $in: data.equipment } })
    }
})

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
