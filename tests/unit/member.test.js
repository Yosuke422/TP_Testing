const { validateMember } = require('../../src/controllers/memberController');

describe('validateMember', () => {
  test('should validate a member with valid input', () => {
    const member = {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };
    expect(validateMember(member)).toBe(true);
  });

  test('should not validate a member with missing fields', () => {
    const member = {
      name: 'John',
      surname: '',
      email: 'john.doe@example.com',
      password: 'password123'
    };
    expect(validateMember(member)).toBe(false);
  });

  test('should not validate a member with invalid email', () => {
    const member = {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe',
      password: 'password123'
    };
    expect(validateMember(member)).toBe(false);
  });
});
