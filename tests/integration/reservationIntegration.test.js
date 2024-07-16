const request = require('supertest');
const app = require('../../src/app');
const Reservation = require('../../src/models/reservation');

jest.mock('../../src/models/reservation');

describe('Reservation Integration Test', () => {
  let server;

  beforeAll(() => {
    server = require('../../src/app');
  });
  afterAll((done) => {
    server.close(done);
  });

  test('should create a new reservation', async () => {
    Reservation.create.mockImplementation((reservation) => reservation);
    let response = await request(server)
      .post('/selectGym')
      .send({ gym: 'Gym A' });
    expect(response.statusCode).toBe(302); 
    expect(response.headers.location).toBe('/machineSelection');

    const agent = request.agent(server);

    response = await agent
      .post('/selectMachines')
      .send({ machines: ['Treadmill', 'Bike'] });
    expect(response.statusCode).toBe(302); 
    expect(response.headers.location).toBe('/reservationConfirmation');
  });

  test('should return an error for invalid reservation data', async () => {
    let response = await request(server)
      .post('/selectGym')
      .send({ gym: 'Gym A' });
    expect(response.statusCode).toBe(302); 
    expect(response.headers.location).toBe('/machineSelection');

    const agent = request.agent(server);

    response = await agent
      .post('/selectMachines')
      .send({ machines: [] });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
