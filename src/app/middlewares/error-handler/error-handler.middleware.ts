import type { Request, Response, NextFunction } from 'express';
import { ServerError } from '@service/error/error.service';

export const errorHandlerMiddleware = (error: ServerError, _: Request, res: Response, next: NextFunction) => {
  if (typeof error.message === 'object') {
    return res.status(error.statusCode).json(error.message);
  }
  res.status(error.statusCode).send(error.message);
};
