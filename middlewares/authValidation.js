const Joi = require("joi");

const signupValidation = (req, res, next) => {
    const Schema = Joi.object({
        phone: Joi.string().length(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
        otp: Joi.string().length(4).required()
    })

    const {error} = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details.map(detail => detail.message).join(', ')
        });
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details.map(detail => detail.message).join(', ')
        });
    }
    next();
};

const otpValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details.map(detail => detail.message).join(', ')
        });
    }
    next();
};


module.exports = { signupValidation, loginValidation, otpValidation }