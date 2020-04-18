module.exports = {
  setKey: jest.fn(() => Promise.resolve('OK')),
  getKey: jest.fn(() => Promise.resolve(1)),
  incrementKey: jest.fn(() => Promise.resolve(2)),
};
