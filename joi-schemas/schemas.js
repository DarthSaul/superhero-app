const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html')

const Joi = BaseJoi.extend((joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean
            }
        }
    }
}))

module.exports.teamSchema = Joi.object({
    team: Joi.object({
        name: Joi.string().required().escapeHTML(),
        hqLocation: Joi.string().required().escapeHTML(),
        bio: Joi.string().required().escapeHTML()
    }).required(),
    logo: Joi.string().allow('').escapeHTML() // If no file uploaded, "logo" is included on req.body as empty string ""
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        text: Joi.string().required().escapeHTML()
    }).required()
})
