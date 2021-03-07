import type { IResponse, Login, RequestWithUser, TypedRequest } from '../types';
import type { Response, Request } from 'express';
import { Router } from 'express';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authValidation } from '../middleware/validation/AuthValidation';
import auth from '../middleware/Auth';

const router = Router();

//register user
router.post('/register', authValidation, async (req: TypedRequest<Login>, res: Response<IResponse>) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ where: { username } });

    if (foundUser) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'user already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });
    await User.save(newUser);

    const token = jwt.sign({ username }, process.env.SECRET!, { expiresIn: '1h' });

    return res.status(201).json({
      data: { username, token },
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      status: 'error',
      message: 'Server Error',
    });
  }
});

//login user
router.post('/login', authValidation, async (req: TypedRequest<Login>, res: Response<IResponse>) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ where: { username } });

    if (!foundUser) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'username or password does not exist',
      });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'username or password does not exist',
      });
    }
    const token = jwt.sign({ username }, process.env.SECRET!, { expiresIn: '1h' });

    return res.status(200).json({
      data: { username, token },
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      status: 'error',
      message: 'Server Error',
    });
  }
});

//get users
router.get('/users', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  try {
    const users = await User.find();

    return res.json({
      data: users
        .map(({ id, username }) => ({
          id,
          username,
        }))
        .filter((e) => e.id !== req.user?.id),
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      status: 'error',
      message: 'Server Error',
    });
  }
});

export default router;
