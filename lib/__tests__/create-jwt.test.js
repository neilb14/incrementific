const createJWT = require('../create-jwt');

describe('Create JWT', () => {
  it('should create a JWT given a username and password', () => {
    const result = createJWT('moose@mailinator.com', 'I<3Squirrels');
    expect(result).toBeDefined();
    expect(result).toMatch(/^ey.+/);
    expect(result.split('.')).toHaveLength(3);
  });
});