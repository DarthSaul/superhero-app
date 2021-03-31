const Joi = require('joi');

module.exports.teamSchema = Joi.object({
    team: Joi.object({
        name: Joi.string().required(),
        hqLocation: Joi.string().required(),
        bio: Joi.string().required()
    }).required(),
    logo: Joi.string().allow('') // If no file uploaded, "logo" is included on req.body as empty string ""
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        text: Joi.string().required()
    }).required()
})
