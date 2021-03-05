import Joi from 'joi';
import { Request, NextFunction, Response } from 'express';

const authSchema = Joi.object({
  name: Joi.string().required().min(3),
  // user_id: Joi.number().required(),
});

const clubValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = authSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      data: null,
      message: error.message,
      status: 'error',
    });
  }

  return next();
};

export { clubValidation };
