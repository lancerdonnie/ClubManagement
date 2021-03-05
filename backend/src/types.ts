import type { Response, Request } from 'express';
import { User } from './entity/User';

export interface IResponse {
  message?: string;
  status: 'success' | 'error';
  data: {} | null;
}

export interface TypedRequest<T> extends Request {
  body: T;
}

export interface RequestWithUser<T = any> extends Request {
  body: T;
  user?: User;
}

export type Login = {
  username: string;
  password: string;
};

export type Club = {
  name: string;
};
