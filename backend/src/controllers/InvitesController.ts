import type { IResponse, RequestWithUser } from '../types';
import type { Response } from 'express';
import { Router } from 'express';
import auth from '../middleware/Auth';
import { Invite } from '../entity/Invites';
import { Club } from '../entity/Club';
import { DailyReport } from '../entity/DailyReport';

const router = Router();

//get invites
router.get('/', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  try {
    //add join clubs here
    const invites = await Invite.find({ where: { user_id: req.user?.id } });

    return res.status(200).json({
      data: invites,
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
router.post('/:clubid/:userid', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
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

//accept invite
router.post('/:id', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  const clubId = req.params.id;
  try {
    //add join clubs here
    const invite = await Invite.find({ where: { user_id: req.user?.id, club_id: clubId } });

    if (!invite) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'This invitation does not exist',
      });
    }

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

    Invite.remove(invite);

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