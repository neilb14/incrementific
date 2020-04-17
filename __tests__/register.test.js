const register = require('../register');

const buildEvent = body => ({
  body: JSON.stringify(body),
});

describe('Register endpoint', () => {
  it('should return a bad request response when body is not present', async () => {
    const event = buildEvent();
    const response = await register.handler(event);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
  });

  it('should return a bad request response when username or password is not present', async () => {
    const event = buildEvent({});
    const response = await register.handler(event);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe('Username and password are required');
  });

  it('should return a success response', async () => {
    const event = buildEvent({ username: 'moose@mailinator.com', password: 'I<3Squirrels' });
    const response = await register.handler(event);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toBe('Successfully registered moose@mailinator.com');
  });

  it('should include a JWT when successful', async () => {
    const event = buildEvent({ username: 'moose@mailinator.com', password: 'I<3Squirrels' });
    const response = await register.handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).apiKey).toMatch(/^ey/);
  });
});