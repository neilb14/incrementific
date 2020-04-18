const storage = require('./lib/storage');

module.exports.hello = async event => {
  const result = await storage.incrementKey('hello');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        result,
      },
      null,
      2
    ),
  };
};
