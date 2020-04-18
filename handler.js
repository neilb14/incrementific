const storage = require('./lib/storage');
const buildResponse = require('./lib/build-response');

module.exports.next = async event => {
  const result = await storage.incrementKey('hello');
  return buildResponse.success({
    message: 'Incremented',
    result
  });
};

module.exports.current = async event => {
  const result = await storage.getKey('hello')
  return buildResponse.success({
    message: 'Current',
    result,
  });
};

module.exports.set = async event => {
  if (!event.body || !/^current=\d+/.test(event.body)) return buildResponse.badRequest('expected current=value in payload');
  const value = event.body.split('=')[1];
  const result = await storage.setKey('hello', value);
  return buildResponse.success({
    message: 'Set',
    result,
  })
};

