const Joi = require('joi');

const postValidator = (data) => {
    //validate
    const rule = Joi.object({
        title: Joi.string()
            .min(6)
            .max(225)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,100}$')),
        description: Joi.string().min(6).max(255).required(),
        content: Joi.string().min(6).max(1000).required(),
        selectCate: Joi.array(),
    });

    return rule.validate(data);
};

module.exports.postValidator = postValidator;
