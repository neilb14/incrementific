const createJWT = require('../create-jwt');

process.env.SHARED_KEY = '616263';
process.env.ISSUER = 'http://incrementific.com';
process.env.AUDIENCE = 'http://incrementific.com/users';

describe('Create JWT', () => {
  it('should create a JWT given a username and password', () => {
    const result = createJWT('moose@mailinator.com');
    expect(result).toBeDefined();
    expect(result).toMatch(/^ey.+/);
    expect(result.split('.')).toHaveLength(3);
  });
});