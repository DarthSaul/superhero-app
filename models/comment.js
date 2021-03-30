const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: {} });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;