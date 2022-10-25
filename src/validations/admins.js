import Joi from 'joi';

const validateAdmin = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.number().min(10000000).max(999999999999999).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,50}$/).required(),
    dni: Joi.number().min(100000).max(999999999999).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Cannot create admin: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default { validateAdmin };
