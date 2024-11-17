import winston from 'winston';
import morgan, { StreamOptions } from 'morgan';

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export const stream: StreamOptions = {
  write: (message: string) => winstonLogger.info(message.trim()),
};

export const morganMiddleware = morgan(
  `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms`,
  { stream },
);

export const logger = {
  info: (message: string) => winstonLogger.info(message),
  warn: (message: string) => winstonLogger.warn(message),
  error: (message: string) => winstonLogger.error(message),
  httpLogger: morganMiddleware, // HTTP logging middleware
};
