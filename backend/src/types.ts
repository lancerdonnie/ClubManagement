import type { Response, Request } from 'express';

export interface IResponse {
  message?: string;
  status: 'success' | 'error';
  data: {} | null;
}

export type TypedResponse = Omit<Response, 'json'> & {
  json(data: IResponse): Response;
};

export interface TypedRequest<T> extends Request {
  body: T;
}
