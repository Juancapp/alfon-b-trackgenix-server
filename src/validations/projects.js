import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    rate: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required(),
    role: Joi.string().min(3).max(50).required(),
  });

  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(100).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(3).max(50).required(),
    employees: Joi.array().items(employeeValidation),
    active: Joi.boolean().required(),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There has been an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateUpdate,
};
