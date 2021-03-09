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

//  Post hook goes here:
heroSchema.post('findOneAndDelete', async function(data) {
    if (data.equipment.length) {
       await Equipment.deleteMany({ _id: { $in: data.equipment } })
    }
})


const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;

// stats: {
//     iq: {type: Number, required: true},
//     strength: {type: Number, required: true},
//     speed: {type: Number, required: true},
//     magic: {type: Number, required: true}, 
//     total: {
//         type: Number, 
//         default: function() {
//             const { iq, strength, speed, magic } = this.stats; 
//             return iq + strength + speed + magic;
//         },
//         max: [20, "Stats total for new player must be <= 20"]
//     }
// }
