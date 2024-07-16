const request = require('supertest');
const app = require('../../src/app'); // Import the app for supertest

describe('Reservation Integration Test', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3002, () => {
      console.log('Test server running on port 3002');
      done();
    });
  }, 10000);

  afterAll((done) => {
    server.close(done);
  }, 10000);

  test('should create a new reservation', async () => {
    const agent = request.agent(app);

    let response = await agent.post('/selectGym').send({ gym: 'Gym A' });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/machineSelection');

    response = await agent.post('/selectMachines').send({ machines: ['Treadmill', 'Bike'] });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/reservationConfirmation');
  });

  test('should return an error for invalid reservation data', async () => {
    const agent = request.agent(app);

    let response = await agent.post('/selectGym').send({ gym: 'Gym A' });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/machineSelection');

    response = await agent.post('/selectMachines').send({ machines: [] });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
