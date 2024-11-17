import type { Express } from 'express';
import healthcheck from 'express-healthcheck';

// Routes
import admin from './admin/admin.route';

export const publicRoutes = (app: Express) => {
  app.use('/health', healthcheck());
};

export const privateRoutes = async (app: Express) => {
  app.use('/admin', admin);
};
