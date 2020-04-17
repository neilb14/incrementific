const jwtDecode = require('jwt-decode');
const jsrsasign = require('jsrsasign');

const buildResult = (isValid, claims = {}) => ({
  isValid,
  claims,
})

module.exports = (token) => {
  const { SHARED_KEY, ISSUER } = process.env;
  try {
    const isValid = jsrsasign.jws.JWS.verifyJWT(token, SHARED_KEY, {alg: ['HS256']});
    const payload = jwtDecode(token);
    return buildResult(isValid && payload.iss === ISSUER, payload);
  } catch (error) {
    console.error('Unable to validate JWT', error);
    return buildResult(false);
  }
};
