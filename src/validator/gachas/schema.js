const Joi = require("joi");

const GachaPayloadSchema = Joi.object({
    name: Joi.string().required(),
    urlPhoto: Joi.string().required(),
    position: Joi.string().required(),
    number: Joi.string().required(),
    isGet : Joi.boolean().required(),
    totalGet : Joi.number().required(),
});

module.exports = { GachaPayloadSchema };