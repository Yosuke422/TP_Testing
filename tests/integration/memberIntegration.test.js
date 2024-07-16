const request = require('supertest');
let server;

jest.mock('../../src/models/member');

describe('Member Integration Test', () => {
  beforeAll(() => {
    server = require('../../src/app');
  });

  afterAll((done) => {
    server.close(done);
  });

  test('should register a new member', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        name: 'Jane',
        surname: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123'
      });
    
    expect(response.statusCode).toBe(302); // Redirect
    expect(response.headers.location).toBe('/gymSelection');
  });

  test('should return an error for invalid member data', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        name: '',
        surname: '',
        email: 'invalid-email',
        password: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
