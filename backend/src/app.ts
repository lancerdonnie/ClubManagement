import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { createConn } from './createConn';

// Controllers
import UserController from './controllers/UserController';
import ClubController from './controllers/ClubController';
import InvitesController from './controllers/InvitesController';
import ReportController from './controllers/ReportController';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

app.use(UserController);
app.use('/clubs', ClubController);
app.use('/invites', InvitesController);
app.use(ReportController);

app.use(express.static(path.join(__dirname, '../../frontend', 'build')));

app.get('/*', function (_, res) {
  res.sendFile(path.join(__dirname, '../../frontend', 'build', 'index.html'));
});

(async () => {
  await createConn();
})();

export default app;
