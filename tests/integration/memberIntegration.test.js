const request = require('supertest');
const app = require('../../src/app'); // Import the app for supertest

describe('Member Integration Test', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3001, () => {
      console.log('Test server running on port 3001');
      done();
    });
  }, 10000);

  afterAll((done) => {
    server.close(done);
  }, 10000);

  test('should register a new member', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Jane',
        surname: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/gymSelection');
  });

  test('should return an error for invalid member data', async () => {
    const response = await request(app)
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
