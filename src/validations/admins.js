import Joi from 'joi';

export const validateNewUser = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    lastName: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    phone: Joi.number().min(10000000).max(999999999999999).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,50}$/).required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Cannot create user: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const validateUpdateUser = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    lastName: Joi.string().pattern(/^([^0-9]*)$/).min(3).max(50)
      .required(),
    phone: Joi.number().min(10000000).max(999999999999999).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
    active: Joi.boolean().required(),
    firebaseUid: Joi.string().required(),
  });

  const validation = adminValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Cannot edit user: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
