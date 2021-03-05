import type { RequestWithUser, TypedRequest } from '../types';
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { user } from '../entity/User';

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      data: null,
      status: 'error',
      message: 'You are not allowed to view this resource',
    });
  }

  try {
    let valid;

    try {
      valid = (await jwt.verify(token, process.env.SECRET!)) as { username: string };
    } catch (error) {
      return res.status(401).json({
        data: null,
        status: 'error',
        message: 'You are not allowed to view this resource',
      });
    }

    const foundUser = await user.findOne({ where: { username: valid.username } });

    if (!foundUser) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'userdoes not exist',
      });
    }

    req.user = foundUser;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      status: 'error',
      message: 'Server error',
    });
  }
};

export default auth;
