import { ErrorCode, ErrorMessage, ServerError } from './error.service';

describe('ErrorService', () => {
  it('should create error service', () => {
    expect(ServerError).toBeTruthy();
  });

  it('should throw statusCode 500 and Internal Server Error by default', () => {
    const serverError = new ServerError();

    expect(serverError.message).toBe(ErrorMessage.INTERNAL_SERVER_ERROR);
    expect(serverError.statusCode).toBe(ErrorCode.INTERNAL_SERVER_ERROR);
  });

  it('should throw custom statusCode and error message', () => {
    const serverError = new ServerError('Schema error', 503);

    expect(serverError.message).toBe('Schema error');
    expect(serverError.statusCode).toBe(503);
  });
});
