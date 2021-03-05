import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { createConn } from './createConn';

// Controllers
import UserController from './controllers/UserController';
import ClubController from './controllers/ClubController';

const app = express();

app.use(express.json());
app.use(cors());

app.use(UserController);
app.use('/clubs', ClubController);

(async () => {
  await createConn();
})();

export default app;
