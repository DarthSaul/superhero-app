const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: String,
    hqLocation: String,
    bio: String,
    symbol: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;