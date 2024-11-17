import { logger, stream, winstonLogger } from './logger.service';
import morgan from 'morgan';

jest.mock('morgan');
describe('LoggerService', () => {
  it('should log `info` using winstonLogger', () => {
    jest.spyOn(winstonLogger, 'info');
    logger.info('Hello world!');
    expect(winstonLogger.info).toHaveBeenCalledWith('Hello world!');
  });

  it('should log `warn` using winstonLogger', () => {
    jest.spyOn(winstonLogger, 'warn');
    logger.warn('Warning!');
    expect(winstonLogger.warn).toHaveBeenCalledWith('Warning!');
  });

  it('should log `error` using winstonLogger', () => {
    jest.spyOn(winstonLogger, 'error');
    logger.error('Syntax Error!');
    expect(winstonLogger.error).toHaveBeenCalledWith('Syntax Error!');
  });

  it('should log http using morgan', () => {
    jest.spyOn(winstonLogger, 'info');
    expect(morgan).toHaveBeenCalledWith(
      `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms`,
      { stream },
    );
  });
});
