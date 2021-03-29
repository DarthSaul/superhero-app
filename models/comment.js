const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    created: Date,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;