const jsrsasign = require('jsrsasign');

module.exports = (token) => {
  const { SHARED_KEY } = process.env;
  try {
    return jsrsasign.jws.JWS.verifyJWT(token, SHARED_KEY, {alg: ['HS256']});
  } catch (error) {
    console.error('Unable to validate JWT', error);
    return false;
  }
};
