import Joi from 'joi';
import { Request, NextFunction, Response } from 'express';

const authSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(5),
});

const authValidation = (req: Request, res: Response, next: NextFunction) => {
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

export { authValidation };
