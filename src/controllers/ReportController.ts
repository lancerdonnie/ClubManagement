import type { IResponse, RequestWithUser } from '../types';
import type { Response } from 'express';
import { Router } from 'express';
import auth from '../middleware/Auth';
import { DailyReport } from '../entity/DailyReport';

const router = Router();

//get daily report
router.get('/dailyreport/:id', auth, async (req: RequestWithUser, res: Response<IResponse>) => {
  const clubId = req.params.id;
  try {
    //add join clubs here
    const reports = await DailyReport.find({ where: { club_id: clubId }, order: { created_date: 'ASC' } });

    return res.status(200).json({
      data: reports,
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
