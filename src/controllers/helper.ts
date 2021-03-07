import { DailyReport } from '../entity/DailyReport';

export const report = async (clubId: number) => {
  await DailyReport.query(
    `INSERT INTO daily_report (created_date, count, club_id) VALUES($2, 5, $1) on conflict do nothing`,
    [clubId, new Date().toLocaleDateString()]
    // [clubId, '2021-01-01']
  );
};
