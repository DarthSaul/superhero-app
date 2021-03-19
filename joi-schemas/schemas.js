const Joi = require('joi');

module.exports.heroSchema = Joi.object({
    hero: Joi.object({
        name: Joi.string().required(),
        alias: Joi.string().required(),
        image: Joi.string().required(),
        bio: Joi.string()
    }).required()
})

module.exports.equipmentSchema = Joi.object({
    equipment: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    }).required()
})