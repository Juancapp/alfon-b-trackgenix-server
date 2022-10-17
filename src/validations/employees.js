import Joi from "joi";

const validateCreation = (req, res, next) => {
    const employeesValidation = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(8).max(15).required(),
        email: Joi.string(),
        password: Joi.string(),
        dni: Joi.string(),
    })
    if (validation.error) {
        return res.status(400).json({

        })
    }
}

export default {
    validateCreation,
}