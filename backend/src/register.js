const buildResponse = require('./lib/build-response');
const createJWT = require('./lib/create-jwt');

module.exports.handler = async event => {
  if (!event.body) return buildResponse.badRequest('Missing request body');
  try {
    const { username, password } = JSON.parse(event.body);
    if (!username || !password) return buildResponse.badRequest('Username and password are required')
    return buildResponse.success({
      message: `Successfully registered ${username}`,
      apiKey: createJWT(username, password),
    });
  } catch (error) {
    return buildResponse.badRequest('Invalid request body');
  }
}