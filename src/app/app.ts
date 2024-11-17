import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { publicRoutes, privateRoutes } from './routes';
import { initMiddleware, protectRoutes } from './middlewares';
import { logger } from '@service/logger/logger.service';
import { errorHandlerMiddleware } from '@middleware/error-handler/error-handler.middleware';
require('dotenv').config();

export const app = express();

app.use(express.json());
app.use(logger.httpLogger);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!').status(200);
});

// Swagger API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initMiddleware(app);
publicRoutes(app);
// Everything below is private or should require a special header
protectRoutes(app);
privateRoutes(app);

// Catches every thrown `ServerError`
app.use(errorHandlerMiddleware);
