const userKey = require('../user-key');

describe('User key', () => {
  it ('should generate a user key', () => {
    const result = userKey({ requestContext: { authorizer: { principalId: 'moose@mailinator.com' } } });
    expect(result).toBeDefined();
    expect(result).toMatch(/\w+/);
  });

  it ('should generate different user keys for different users', () => {
    const mooseKey = userKey({ requestContext: { authorizer: { principalId: 'moose@mailinator.com' } } });
    const squirrelKey = userKey({ requestContext: { authorizer: { principalId: 'squirrel@mailinator.com' } } });
    expect(mooseKey).not.toBe(squirrelKey);
  });
});
