const Joi = require("joi");

const GachaPayloadSchema = Joi.object({
    name: Joi.string(),
    url_photo: Joi.string(),
    position: Joi.string(),
    number: Joi.string(),
    is_get : Joi.boolean().required(),
    total_get : Joi.number().required(),
});

module.exports = { GachaPayloadSchema };