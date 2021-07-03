const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
 //console.log("Joy Log",Joi);
    return Joi.validate(data, schema);
};

const LoginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;