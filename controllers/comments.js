const Team = require('../models/team');
const Comment = require('../models/comment');
const wrapAsync = require('../utilities/wrapAsync');

module.exports.createComment = wrapAsync(async(req, res) => {
    const team = await Team.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.created = Date.now();
    comment.owner = req.user._id;
    team.comments.push(comment);
    await comment.save();
    await team.save();
    req.flash("success", "New comment posted.")
    res.redirect(`/teams/${team._id}`)
})

module.exports.destroyComment = wrapAsync(async(req, res) => {
    const { id, commentId } = req.params;
    await Team.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Comment was deleted");
    res.redirect(`/teams/${id}`)
})