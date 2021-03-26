const Joi = require('joi');

const loginValidator = (data) => {
    //validate
    const rule = Joi.object({
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().min(6).max(100).required(),
    });

    return rule.validate(data);
};

module.exports.loginValidator = loginValidator;
