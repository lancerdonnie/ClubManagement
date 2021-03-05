import type { IResponse, RequestWithUser, TypedRequest } from '../types';
import type { Response, Request } from 'express';
import { Router } from 'express';
import auth from '../middleware/Auth';
import { addMembersValidation, clubValidation } from '../middleware/validation/ClubValidation';
import { Club } from '../entity/Club';
import { User } from '../entity/User';
import { Invite } from '../entity/Invites';
import { DailyReport } from '../entity/DailyReport';
import { In } from 'typeorm';

const router = Router();

//create club
router.post(
  '/',
  auth,
  clubValidation,
  async (req: RequestWithUser<{ name: string }>, res: Response<IResponse>) => {
    try {
      const foundClub = await Club.findOne({ where: { name: req.body.name } });

      if (foundClub) {
        return res.status(400).json({
          data: null,
          status: 'error',
          message: 'club exists with this name',
        });
      }

      const newClub = await Club.create({ name: req.body.name, user_id: req.user?.id });
      await Club.save(newClub);

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
  }
);

//get all clubs
router.get('/', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  try {
    const clubs = await Club.find({ where: { user_id: req.user?.id } });

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

//get single club
router.get('/:id', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  const clubId = req.params.id;
  try {
    const clubs = await Club.findOne({ where: { id: clubId }, relations: ['club_members'] });

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

//add members
router.post(
  '/addmembers',
  auth,
  addMembersValidation,
  async (req: RequestWithUser<{ id: number; members: number[] }>, res: Response<IResponse>) => {
    try {
      const club = await Club.findOne({
        where: { id: req.body.id },
        relations: ['club_members'],
      });

      if (!club) {
        return res.status(404).json({
          data: null,
          status: 'error',
          message: 'This club does not exist',
        });
      }

      if (club.user_id !== req.user?.id) {
        return res.status(403).json({
          data: null,
          status: 'error',
          message: 'Permission denied',
        });
      }

      const members = await User.find({ where: { id: In(req.body.members) } });

      club.club_members.push(
        ...members
          .filter((e) => e.id !== req.user?.id)
          .filter((e) => club.club_members.find((m) => m.id === e.id) !== null)
      );

      await club.save();

      let dailyReport = await DailyReport.findOne({
        where: { created_date: new Date().toLocaleDateString(), club_id: club.id },
      });

      if (dailyReport) {
        dailyReport.count = club.club_members.length;
      } else {
        dailyReport = DailyReport.create({
          created_date: new Date().toLocaleDateString(),
          club_id: club.id,
          count: club.club_members.length,
        });
      }
      DailyReport.save(dailyReport);

      return res.status(200).json({
        data: { club },
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
  }
);

//remove members
router.post(
  '/removemembers',
  auth,
  addMembersValidation,
  async (req: RequestWithUser<{ id: number; members: number[] }>, res: Response<IResponse>) => {
    try {
      const club = await Club.findOne({
        where: { id: req.body.id },
        relations: ['club_members'],
      });

      if (!club) {
        return res.status(404).json({
          data: null,
          status: 'error',
          message: 'This club does not exist',
        });
      }

      if (club.user_id !== req.user?.id) {
        return res.status(403).json({
          data: null,
          status: 'error',
          message: 'Permission denied',
        });
      }

      club.club_members = club.club_members.filter((e) => !req.body.members.includes(e.id));

      await club.save();

      let dailyReport = await DailyReport.findOne({
        where: { created_date: new Date().toLocaleDateString(), club_id: club.id },
      });

      if (dailyReport) {
        dailyReport.count = club.club_members.length;
      } else {
        dailyReport = DailyReport.create({
          created_date: new Date().toLocaleDateString(),
          club_id: club.id,
          count: club.club_members.length,
        });
      }
      DailyReport.save(dailyReport);

      return res.status(200).json({
        data: { club },
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
  }
);

//join club
router.post('/join/:id', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  const clubId = req.params.id;

  try {
    const club = await Club.findOne({
      where: { id: clubId },
    });

    if (!club) {
      return res.status(404).json({
        data: null,
        status: 'error',
        message: 'This club does not exist',
      });
    }

    if (req.user && club.user_id !== req.user?.id) club.club_members.push(req.user);

    await club.save();

    return res.status(200).json({
      data: null,
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

//invite user
router.post('/invite/:clubid/:userid', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  const clubId = req.params.clubid;
  const userId = req.params.userid;

  try {
    const club = await Club.findOne({
      where: { id: clubId },
      relations: ['club_members'],
    });

    if (!club) {
      return res.status(404).json({
        data: null,
        status: 'error',
        message: 'This club does not exist',
      });
    }

    if (club.user_id !== req.user?.id) {
      return res.status(403).json({
        data: null,
        status: 'error',
        message: 'Permission denied',
      });
    }

    if (club.club_members.find((e) => e.id.toString() === userId) !== null) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'User is already in this club',
      });
    }

    const invite = await Invite.findOne({
      where: { club_id: clubId, user_id: userId },
    });

    if (invite) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'User has already been invited',
      });
    }

    const newInvite = await Invite.create({ club_id: Number(clubId), user_id: Number(userId) });
    await Invite.save(newInvite);

    return res.status(200).json({
      data: null,
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
