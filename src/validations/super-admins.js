import Joi from 'joi';

const validateSuperAdmin = (req, res, next) => {
  const superAdminsValidations = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(10000000).max(999999999999999).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().alphanum().min(8).max(50)
      .required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
  });
  const validation = superAdminsValidations.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateSuperAdmin,
};
