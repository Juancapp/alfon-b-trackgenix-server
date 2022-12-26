import Joi from 'joi';

export const validateEmployees = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().pattern(/^([^0-9]*)$/i).min(3).max(50)
      .required(),
    lastName: Joi.string().pattern(/^([^0-9]*)$/i).min(3).max(50)
      .required(),
    phone: Joi.number().min(10000000).max(999999999999999).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,50}$/).required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const validateUpdateEmployee = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().pattern(/^([^0-9]*)$/i).min(3).max(50)
      .required(),
    lastName: Joi.string().pattern(/^([^0-9]*)$/i).min(3).max(50)
      .required(),
    phone: Joi.number().min(10000000).max(999999999999999).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
