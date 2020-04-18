const storage = require('./lib/storage');
const userKey = require('./lib/user-key');
const buildResponse = require('./lib/build-response');

module.exports.next = async event => {
  const key = userKey(event);
  const result = await storage.incrementKey(key);
  return buildResponse.success({
    message: 'Incremented',
    result: parseInt(result, 10),
  });
};

module.exports.current = async event => {
  const key = userKey(event);
  const result = await storage.getKey(key);
  return buildResponse.success({
    message: 'Current',
    result: result ? parseInt(result, 10) : 0,
  });
};

module.exports.set = async event => {
  const key = userKey(event);
  if (!event.body || !/^current=\d+/.test(event.body)) return buildResponse.badRequest('expected current=value in payload');
  const value = event.body.split('=')[1];
  await storage.setKey(key, value);
  return buildResponse.success({
    message: 'Set',
    result: parseInt(value, 10),
  })
};

