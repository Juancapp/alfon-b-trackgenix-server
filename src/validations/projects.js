import Joi from 'joi';

const validateUpdate = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).max(50),
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM'),
    rate: Joi.number().min(0),
  });

  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(50),
    description: Joi.string().min(10).max(100),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(3).max(50),
    employees: Joi.array().items(employeeValidation),
    active: Joi.boolean(),
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
