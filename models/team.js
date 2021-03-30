const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('./comment')

const logoSchema = new Schema({
    url: String,
    filename: String
});

logoSchema.virtual('medium').get(function() {
    return this.url.replace('/upload', '/upload/w_500');
})

const teamSchema = new Schema({
    name: String,
    hqLocation: String,
    bio: String,
    logo: logoSchema,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    characters: [
        {
            id: {
                type: Number,
                index: true
            },
            name: String,
            thumbnail: String  
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