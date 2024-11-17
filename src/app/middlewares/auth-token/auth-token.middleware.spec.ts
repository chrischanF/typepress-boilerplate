import { Request, Response, NextFunction } from 'express';
import { apiKeyMiddleware } from '@app/middlewares/auth-token/auth-token.middleware';
import { ErrorMessage } from '@app/services/error/error.service';

describe('apiKeyMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should call next if the auth-token header is "dev"', () => {
    req.headers = { 'auth-token': 'dev' };

    apiKeyMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should return 500 if the auth-token header is not "dev"', () => {
    req.headers = { 'auth-token': 'invalid-key' };
    expect(() => apiKeyMiddleware(req as Request, res as Response, next)).toThrow(ErrorMessage.INTERNAL_SERVER_ERROR);
  });

  it('should return 500 if the auth-token header is missing', () => {
    req.headers = {};
    expect(() => apiKeyMiddleware(req as Request, res as Response, next)).toThrow(ErrorMessage.INTERNAL_SERVER_ERROR);
  });
});
