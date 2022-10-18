import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeesValidation = Joi.object({
    name: Joi.string().min(3).max(50).pattern(/^[A-Za-z]+$/)
      .required(),
    last_name: Joi.string().min(3).max(50).pattern(/^[A-Za-z]+$/)
      .required(),
    phone: Joi.string().min(8).max(15).pattern(/[0-9]/)
      .required(),
    email: Joi.string().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    dni: Joi.string().min(6).max(12).pattern(/[0-9]/)
      .required(),
  });

  const validation = employeesValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Cannot update employees: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
