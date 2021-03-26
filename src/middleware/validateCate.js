const Joi = require('joi');

const cateValidator = (data) => {
    //validate
    const rule = Joi.object({
        name: Joi.string()
            .min(6)
            .max(225)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')),
        description: Joi.string().min(6).max(255).required(),
    });

    return rule.validate(data);
};

module.exports.cateValidator = cateValidator;
