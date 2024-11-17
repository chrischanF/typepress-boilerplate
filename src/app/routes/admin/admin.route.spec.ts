import request from 'supertest';
import { app } from '@app/app';
import { ErrorMessage } from '@app/services/error/error.service';

describe('GET /admin', () => {
  it('should return a 500 response if no auth-token header is provided', async () => {
    const response = await request(app).get('/admin');
    expect(response.status).toBe(500);
    expect(response.text).toEqual(ErrorMessage.INTERNAL_SERVER_ERROR);
  });

  it('should return a 200 response if auth-token header is provided', async () => {
    const response = await request(app).get('/admin').set('auth-token', 'dev');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('{}');
  });
});
