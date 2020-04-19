const buildResponse = (statusCode, body) => ({
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      body,
      null,
      2
    ),
});

module.exports.badRequest = (message) => buildResponse(400, { message });
module.exports.success = (body) => buildResponse(200, body);
