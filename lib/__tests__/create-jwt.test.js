const createJWT = require('../create-jwt');

process.env.SHARED_KEY = '616263';

describe('Create JWT', () => {
  it('should create a JWT given a username and password', () => {
    const result = createJWT('moose@mailinator.com');
    expect(result).toBeDefined();
    expect(result).toMatch(/^ey.+/);
    expect(result.split('.')).toHaveLength(3);
  });
});