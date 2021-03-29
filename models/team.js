const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('./comment')

const teamSchema = new Schema({
    name: String,
    hqLocation: String,
    bio: String,
    symbol: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

teamSchema.post('findOneAndDelete', async function(data) {
    if (data.comments.length) {
        await Comment.deleteMany({ _id: { $in: data.comments } })
    }
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;