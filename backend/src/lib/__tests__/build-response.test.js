const buildResponse = require('../build-response');

describe('Build Response', () => {
  it('should return success result with a JSON body', () => {
    const result = buildResponse.success({ message: 'any message' });
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe('any message');
  });

  it('should return a bad request with an error message', () => {
    const result = buildResponse.badRequest('any bad message');
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).message).toBe('any bad message');
  });
});