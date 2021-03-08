const Joi = require('joi');

module.exports.heroSchema = Joi.object({
    hero: Joi.object({
        name: Joi.string().required(),
        alias: Joi.string().required(),
        universe: Joi.string().required(),
        image: Joi.string().required(),
        stats: Joi.object({
            iq: Joi.number().required(),
            strength: Joi.number().required(),
            speed: Joi.number().required(),
            magic: Joi.number().required(),
        }).required()
    }).required()
})