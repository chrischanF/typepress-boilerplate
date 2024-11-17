import request from 'supertest';
import { app } from '../app/app';

describe('GET /', () => {
  it('should return a 200 response', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual('Hello world!');
  });
});
