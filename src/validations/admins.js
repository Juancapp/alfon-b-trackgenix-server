import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const adminsValidations = Joi.object({
    name: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().min(3).max(50),
    password: Joi.string().min(8).max(50),
    dni: Joi.number().min(6).max(12),
    phone: Joi.number().min(8).max(15),
  });
  const validation = adminsValidations.validate(req.body);

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
