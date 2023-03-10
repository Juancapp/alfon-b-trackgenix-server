import Joi from 'joi';

export const validateSuperAdmin = (req, res, next) => {
  const superAdminsValidations = Joi.object({
    name: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    lastName: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    phone: Joi.number().min(10000000).max(999999999999999)
      .required(),
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

export const updateSuperAdmin = (req, res, next) => {
  const superAdminsValidationsEdit = Joi.object({
    name: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    lastName: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    phone: Joi.number().min(10000000).max(999999999999999)
      .required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
  });
  const validation = superAdminsValidationsEdit.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
