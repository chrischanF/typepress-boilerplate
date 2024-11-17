import express from 'express';
import type { Express } from 'express';
import cookieParser from 'cookie-parser';

import { apiKeyMiddleware } from './auth-token/auth-token.middleware';

export const initMiddleware = (app: Express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

export const protectRoutes = (app: Express) => {
  app.use(apiKeyMiddleware);
};
