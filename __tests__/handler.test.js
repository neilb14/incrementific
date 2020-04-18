const handler = require('../handler');
const mockStorage = require('../lib/storage');

jest.mock('../lib/storage');

afterEach(() => {
  mockStorage.getKey.mockReset();
  mockStorage.incrementKey.mockReset();
  mockStorage.setKey.mockReset();
});

describe('Handler', () => {
  it ('should return current value', async () => {
    const result = await handler.current();
    expect(mockStorage.getKey).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
  });

  it ('should increment to next value', async () => {
    const result = await handler.next();
    expect(mockStorage.incrementKey).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
  });

  it ('should set to value', async () => {
    const result = await handler.set({ body: 'current=100' });
    expect(mockStorage.setKey).toHaveBeenCalledWith('hello', '100');
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
  });

  it ('should return a bad request when set does not include a value', async () => {
    const result = await handler.set({ body: null });
    expect(mockStorage.setKey).not.toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
  });

  it ('should return a bad request when set does not include an integer value', async () => {
    const result = await handler.set({ body: 'current=moose' });
    expect(mockStorage.setKey).not.toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
  });
});