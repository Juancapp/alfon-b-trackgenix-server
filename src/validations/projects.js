import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    employee: Joi.string().min(3).max(50).required().Joi.object(),
    role: Joi.string().valid('DEV', 'QA', 'TL').required(),
    rate: Joi.number().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    description: Joi.string().min(10).max(50).required(),
    clientName: Joi.string().min(3).max(50).required(),
    active: Joi.boolean().required(),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `Cannot create project: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
