const InvariantError = require('../../exceptions/InvariantError');
const { GachaPayloadSchema } = require("./schema");

const GachasValidator = {
    validateGachaPayload: (payload) => {
        const validationResult = GachaPayloadSchema.validate(payload);
        if (validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = GachasValidator;