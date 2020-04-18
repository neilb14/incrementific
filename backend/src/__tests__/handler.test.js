const handler = require('../handler');
const mockStorage = require('../lib/storage');
const userKey = require('../lib/user-key');

jest.mock('../lib/storage');
jest.mock('../lib/user-key');

const expectedUserKey = 'abc123';

beforeEach(() => {
  userKey.mockImplementation(() => expectedUserKey);
})

afterEach(() => {
  userKey.mockReset();
  mockStorage.getKey.mockReset();
  mockStorage.incrementKey.mockReset();
  mockStorage.setKey.mockReset();
});

describe('Handler', () => {
  it ('should return current value', async () => {
    mockStorage.getKey = jest.fn(() => Promise.resolve(6));
    const result = await handler.current();
    expect(mockStorage.getKey).toHaveBeenCalledWith(expectedUserKey);
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).result).toBe(6);
  });

  it ('should return a current value of 0 when key doesn\'t exist', async () => {
    mockStorage.getKey = jest.fn(() => Promise.resolve(null));
    const result = await handler.current();
    expect(JSON.parse(result.body).result).toBe(0);
  });

  it ('should increment to next value', async () => {
    mockStorage.incrementKey = jest.fn(() => Promise.resolve(7));
    const result = await handler.next();
    expect(mockStorage.incrementKey).toHaveBeenCalledWith(expectedUserKey);
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).result).toBe(7);
  });

  it ('should set to value', async () => {
    mockStorage.setKey = jest.fn(() => Promise.resolve(100));
    const result = await handler.set({ body: 'current=100' });
    expect(mockStorage.setKey).toHaveBeenCalledWith(expectedUserKey, '100');
    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).result).toBe(100);
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