import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { createConn } from './createConn';

// Controllers

const app = express();

app.use(express.json());
app.use(cors());

(async () => {
  await createConn();
})();

export default app;
