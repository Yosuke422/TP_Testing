const { validateReservation } = require('../../src/controllers/reservationController');

describe('validateReservation', () => {
  test('should validate a reservation with valid input', () => {
    const reservation = {
      gym: 'Gym A',
      machines: ['Treadmill', 'Bike']
    };
    expect(validateReservation(reservation)).toBe(true);
  });

  test('should not validate a reservation with missing gym', () => {
    const reservation = {
      machines: ['Treadmill', 'Bike']
    };
    expect(validateReservation(reservation)).toBe(false);
  });

  test('should not validate a reservation with no machines', () => {
    const reservation = {
      gym: 'Gym A',
      machines: []
    };
    expect(validateReservation(reservation)).toBe(false);
  });
});
