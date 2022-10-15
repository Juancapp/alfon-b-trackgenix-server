import Joi from 'joi';

const validateTimesheets = (req, res, next) => {
  const timesheetsValidation = Joi.object({
    description: Joi.string().min(20).max(100).required(),
    date: Joi.date().required(),
    task: Joi.string().min(10).max(50).required(),
  });

  const validation = timesheetsValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateTimesheets,
};
