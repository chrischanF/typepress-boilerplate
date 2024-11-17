import type { Request, Response, NextFunction } from 'express';
import { logger } from '@service/logger/logger.service';
import { ServerError } from '@service/error/error.service';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Do the dirty work
  const apiKey = req.headers['auth-token'];
  if (apiKey !== 'dev') {
    logger.error('Invalid api key: ' + apiKey);
    throw new ServerError();
  }
  next();
};
