import type { NextFunction, Request, Response } from 'express';
import { errorHandlerMiddleware } from './error-handler.middleware';
import { ErrorCode, ErrorMessage, ServerError } from '@app/services/error/error.service';

describe('errorHandlerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let error: Partial<ServerError>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    error = {
      message: ErrorMessage.INTERNAL_SERVER_ERROR,
      statusCode: ErrorCode.INTERNAL_SERVER_ERROR,
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should response with a json object', () => {
    error.message = { result: '' } as any;
    errorHandlerMiddleware(error as ServerError, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(ErrorCode.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ result: '' });
  });

  it('should response with a plain text', () => {
    errorHandlerMiddleware(error as ServerError, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(ErrorCode.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(ErrorMessage.INTERNAL_SERVER_ERROR);
  });
});
