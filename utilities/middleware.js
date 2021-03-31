const { teamSchema, commentSchema } = require('../joi-schemas/schemas'); 
const Team = require('../models/team');
const Comment = require('../models/comment');
const mongoSanitize = require('express-mongo-sanitize')

module.exports.verifyLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please login to view that page.");
        return res.redirect('/login')
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const team = await Team.findById(req.params.id);
    if (!team.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that.");
        return res.redirect(`/teams/${team._id}`);
    }
    next();
};

module.exports.isCommentOwner = async (req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that.");
        return res.redirect(`/teams/${id}`);
    }
    next();
};

module.exports.sanitize = (req, res, next) => {
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.query);
    mongoSanitize.sanitize(req.params);
    next();
}

module.exports.validateTeam = (req, res, next) => {
    const { error } = teamSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        req.flash("error", msg)
        return res.redirect(req.session.returnTo)
    }
    next();
};

module.exports.validateComment = (req, res, next) => {
    const { id } = req.params;
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        req.flash("error", msg)
        return res.redirect(`/teams/${id}`)
    }
    next();
};

module.exports.countCharacters = async (req, res, next) => {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (team.characters.length >= 5) {
        req.flash("error", "Your team can only have five characters!");
        return res.redirect(`/teams/${id}`)
    }
    next()
};