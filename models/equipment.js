const mongoose = require('mongoose');
const { Schema } = mongoose;

const equipmentSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    postAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;