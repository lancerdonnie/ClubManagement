import type { IResponse, RequestWithUser } from '../types';
import type { Response } from 'express';
import { Router } from 'express';
import auth from '../middleware/Auth';
import { addMembersValidation, clubValidation } from '../middleware/validation/ClubValidation';
import { Club } from '../entity/Club';
import { ClubMembers } from '../entity/ClubMembers';
import { report } from './helper';

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

      const newClub = await Club.create({
        name: req.body.name,
        user_id: req.user?.id,
        clubMembers: [{ is_admin: true, user: req.user }],
      });

      await newClub.save();

      await report(newClub.id);

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

//get my clubs
router.get('/', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  try {
    const clubs: { admin: boolean; name: string; id: number }[] = await Club.query(
      `SELECT c.name,cm."clubId" AS id, cm.is_admin AS admin FROM club_members cm 
    INNER JOIN club c ON cm."clubId" = c.id WHERE cm."userId" = $1`,
      [req.user?.id]
    );

    return res.status(200).json({
      data: clubs,
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

//get other clubs
router.get('/other', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  try {
    const clubs: {
      name: string;
      clubId: number;
    } = await Club.query(
      `SELECT DISTINCT cm."clubId", c.name from club_members cm 
      LEFT JOIN club c ON cm."clubId" = c.id where cm."clubId" not in 
      (SELECT cm."clubId" FROM club_members cm where cm."userId" = $1)`,
      [req.user?.id]
    );

    return res.status(200).json({
      data: clubs,
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
    let club = await Club.createQueryBuilder('club')
      .leftJoinAndSelect('club.clubMembers', 'clubMembers')
      .leftJoinAndSelect('clubMembers.user', 'user')
      .select(['club.id', 'club.name', 'clubMembers.userId', 'user.username'])
      .where('club.id= :clubId', { clubId })
      .getOne();

    if (!club) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'club does not exist',
      });
    }

    club.clubMembers = club.clubMembers.filter((e) => e.userId !== req.user?.id);

    return res.status(200).json({
      data: club,
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

//remove members
router.post(
  '/removemembers',
  auth,
  addMembersValidation,
  async (req: RequestWithUser<{ id: number; members: number[] }>, res: Response<IResponse>) => {
    try {
      const club = await Club.findOne({
        where: { id: req.body.id },
        relations: ['clubMembers', 'clubMembers.user'],
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

      if (req.body.members.includes(req.user?.id)) {
        return res.status(400).json({
          data: null,
          status: 'error',
          message: 'Cannot remove admin',
        });
      }

      // club.clubMembers = club.clubMembers.filter((e) => !req.body.members.includes(e.user.id));

      // await club.save();

      await ClubMembers.query(`DELETE FROM club_members cm WHERE cm."clubId" = $1 AND cm."userId" in ($2)`, [
        club.id,
        req.body.members.join(','),
      ]);

      await report(club.id);

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
  }
);

//join club
router.post('/join/:id', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  const clubId = req.params.id;

  try {
    const club = await Club.findOne({
      where: { id: clubId },
      relations: ['clubMembers'],
    });

    if (!club) {
      return res.status(404).json({
        data: null,
        status: 'error',
        message: 'This club does not exist',
      });
    }

    const clubMember = new ClubMembers();
    clubMember.user = req.user!;
    clubMember.is_admin = false;

    if (req.user && club.user_id !== req.user?.id) club.clubMembers.push(clubMember);

    await club.save();

    await report(club.id);

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
