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
logoSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_150');
})

// const opts = { toJSON: { virtuals: true } };
const teamSchema = new Schema({
    name: String,
    hqLocation: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
}, { toJSON: { virtuals: true } });

teamSchema.virtual('properties.popup').get(function(){
    return `
        <div class="cluster-map-popup">
            <strong><a href="/teams/${this._id}">${this.name}</a></strong>
            <p>${this.hqLocation}</p>
        </div>
    `
})

teamSchema.post('findOneAndDelete', async function(data) {
    if (data.comments.length) {
        await Comment.deleteMany({ _id: { $in: data.comments } })
    }
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;