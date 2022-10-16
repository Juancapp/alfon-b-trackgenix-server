import Joi from 'joi';

const validateTask = (req, res, next) => {
  const taskValidation = Joi.object({
    description: Joi.string().min(10).max(100).required(),
  });

  const validation = taskValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateTask;
