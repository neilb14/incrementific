const buildResponse = (statusCode, body) => ({
    statusCode,
    body: JSON.stringify(
      body,
      null,
      2
    ),
});

module.exports.badRequest = (message) => buildResponse(400, { message });
module.exports.success = (body) => buildResponse(200, body);
