import type { IResponse, RequestWithUser, TypedRequest } from '../types';
import type { Response, Request } from 'express';
import { Router } from 'express';
import auth from '../middleware/Auth';
import { addMembersValidation, clubValidation } from '../middleware/validation/ClubValidation';
import { Club } from '../entity/Club';
import { User } from '../entity/User';
import { Invite } from '../entity/Invites';
import { DailyReport } from '../entity/DailyReport';
import { In, Not } from 'typeorm';
import { ClubMembers } from '../entity/ClubMembers';

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
      `SELECT DISTINCT c.name,cm."clubId" AS id, cm."userId" = $1 AS admin FROM club_members cm 
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
    const clubs = await ClubMembers.find({ where: { clubId }, relations: ['user', 'club'] });

    // const c = await Club.find({ where: { clubMembers: { clubId } }, relations: ['clubMembers'] });
    // console.log(c);

    const newClubs = clubs
      .map((e) => ({
        id: e.user.id,
        username: e.user.username,
        name: e.club.name,
      }))
      .filter((e) => e.id !== req.user?.id);

    return res.status(200).json({
      data: newClubs,
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

//add members-remove this only send invites
// router.post(
//   '/addmembers',
//   auth,
//   addMembersValidation,
//   async (req: RequestWithUser<{ id: number; members: number[] }>, res: Response<IResponse>) => {
//     try {
//       const club = await Club.findOne({
//         where: { id: req.body.id },
//         relations: ['clubMembers'],
//       });

//       if (!club) {
//         return res.status(404).json({
//           data: null,
//           status: 'error',
//           message: 'This club does not exist',
//         });
//       }

//       if (club.user_id !== req.user?.id) {
//         return res.status(403).json({
//           data: null,
//           status: 'error',
//           message: 'Permission denied',
//         });
//       }

//       //add error
//       if (!req.body.members.includes(req.user.id)) {
//         const clubMembers = req.body.members.map((e) => {
//           const cM = new ClubMembers();
//           cM.userId = e;
//           cM.is_admin = false;
//           return cM;
//         });
//         club.clubMembers.push(...clubMembers);
//       }

//       await club.save();

//       let dailyReport = await DailyReport.findOne({
//         where: { created_date: new Date().toLocaleDateString(), club_id: club.id },
//       });

//       if (dailyReport) {
//         dailyReport.count = club.clubMembers.length;
//       } else {
//         dailyReport = DailyReport.create({
//           created_date: new Date().toLocaleDateString(),
//           club_id: club.id,
//           count: club.clubMembers.length,
//         });
//       }
//       DailyReport.save(dailyReport);

//       return res.status(200).json({
//         data: club,
//         status: 'success',
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         data: null,
//         status: 'error',
//         message: 'Server Error',
//       });
//     }
//   }
// );

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

      // let dailyReport = await DailyReport.findOne({
      //   where: { created_date: new Date().toLocaleDateString(), club_id: club.id },
      // });

      // if (dailyReport) {
      //   dailyReport.count = club.clubMembers.length;
      // } else {
      //   dailyReport = DailyReport.create({
      //     created_date: new Date().toLocaleDateString(),
      //     club_id: club.id,
      //     count: club.clubMembers.length,
      //   });
      // }
      // DailyReport.save(dailyReport);

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
    });

    if (!club) {
      return res.status(404).json({
        data: null,
        status: 'error',
        message: 'This club does not exist',
      });
    }

    // if (req.user && club.user_id !== req.user?.id) club.clubMembers.push(req.user);

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

export default router;
