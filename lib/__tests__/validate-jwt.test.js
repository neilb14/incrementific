const createJWT = require('../create-jwt');
const validateJWT = require('../validate-jwt');

process.env.SHARED_KEY = '616263';

describe('Validate JWT', () => {
  it('should validate a JWT and return the claims', () => {
    const token = createJWT('moose@mailinator.com');
    const result = validateJWT(token);
    expect(result).toBeDefined();
    expect(result.isValid).toBe(true);
    expect(result.claims.sub).toBe('moose@mailinator.com');
  });

  it('should be an invalid JWT', () => {
    const token = 'this is not a jwt';
    const result = validateJWT(token);
    expect(result).toBeDefined();
    expect(result.isValid).toBe(false);
  });
});