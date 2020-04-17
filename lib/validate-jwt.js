const jwtDecode = require('jwt-decode');
const jsrsasign = require('jsrsasign');

const buildResult = (isValid, claims = {}) => ({
  isValid,
  claims,
})

module.exports = (token) => {
  const { SHARED_KEY } = process.env;
  try {
    const isValid = jsrsasign.jws.JWS.verifyJWT(token, SHARED_KEY, {alg: ['HS256']});
    const payload = jwtDecode(token);
    return buildResult(isValid, payload);
  } catch (error) {
    return buildResult(false);
  }
};
