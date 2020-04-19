const createJWT = require('../create-jwt');
const validateJWT = require('../validate-jwt');

describe('Validate JWT', () => {
  beforeEach(() => {
    process.env.SHARED_KEY = '616263';
    process.env.ISSUER = 'http://incrementific.com';
    process.env.AUDIENCE = 'http://incrementific.com/users';
  });

  it('should validate a JWT and return the claims', async () => {
    const token = createJWT('moose@mailinator.com');
    const result = await validateJWT(token);
    expect(result).toBeDefined();
    expect(result.isValid).toBe(true);
    expect(result.claims.sub).toBe('moose@mailinator.com');
  });

  it('should be an invalid JWT', async () => {
    const token = 'this is not a jwt';
    const result = await validateJWT(token);
    expect(result).toBeDefined();
    expect(result.isValid).toBe(false);
  });

  it('should not be valid when shared key is different', async () => {
    const token = createJWT('moose@mailinator.com');
    process.env.SHARED_KEY = '686868';
    const result = await validateJWT(token);
    expect(result.isValid).toBe(false);
  });

  it('should be invalid when issuer is not expected', async () => {
    const token = createJWT('moose@mailinator.com');
    process.env.ISSUER = 'http://badguy.com';
    const result = await validateJWT(token);
    expect(result.isValid).toBe(false);
  });
});