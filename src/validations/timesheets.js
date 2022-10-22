import Joi from 'joi';

const validateTimeSheets = (req, res, next) => {
  const timesheetsValidation = Joi.object({
    description: Joi.string().min(20).max(100).required(),
    date: Joi.date().required(),
    task: Joi.string().alphanum().required(),
    hours: Joi.number().integer().positive().greater(0)
      .max(12)
      .required(),
    employee: Joi.string().alphanum().required(),
    project: Joi.string().alphanum().required(),
  });

  const validation = timesheetsValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Cannot create timesheet: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateTimeSheets,
};
