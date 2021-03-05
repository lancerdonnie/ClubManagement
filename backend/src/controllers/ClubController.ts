import type { Club, IResponse, RequestWithUser, TypedRequest } from '../types';
import type { Response, Request } from 'express';
import { Router } from 'express';
import auth from '../middleware/Auth';
import { clubValidation } from '../middleware/validation/ClubValidation';
import { club } from '../entity/Club';

const router = Router();

//create club
router.post('/', auth, clubValidation, async (req: RequestWithUser<Club>, res: Response<IResponse>) => {
  try {
    const foundClub = await club.findOne({ where: { name: req.body.name } });

    if (foundClub) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'club exists with this name',
      });
    }

    const newClub = await club.create({ name: req.body.name, user_id: req.user?.id });
    await club.save(newClub);

    return res.status(201).json({
      data: { newClub },
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

//get all clubs
router.get('/', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  try {
    const clubs = await club.find({ where: { user_id: req.user?.id } });

    return res.status(201).json({
      data: { clubs },
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
