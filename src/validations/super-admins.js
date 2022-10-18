import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const superAdminsValidations = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().alphanum().min(8).max(50)
      .required(),
    dni: Joi.string().min(6).max(12).pattern(/[0-9]/)
      .required(),
    phone: Joi.string().min(8).max(15).pattern(/[0-9]/)
      .required(),
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

export default { validateUpdate };
