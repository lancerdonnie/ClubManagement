import type { Response, Request } from 'express';
import { user } from './entity/User';

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
  user?: user;
}

export type Login = {
  username: string;
  password: string;
};

export type Club = {
  name: string;
};
