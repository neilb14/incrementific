const jwtDecode = require('jwt-decode');
const validateGoogleJwt = require('./validate-google-jwt');
const validateOwnJwt = require('./validate-own-jwt');

const buildResult = (isValid, claims = {}) => ({
  isValid,
  claims,
});

module.exports = async (token) => {
  const providers = {
    'accounts.google.com': validateGoogleJwt,
    [process.env.ISSUER]: validateOwnJwt, 
  };
  try {
    const claims = jwtDecode(token);
    if (!(claims.iss in providers)) return buildResult(false);
    const isValid = await providers[claims.iss](token);
    return buildResult(isValid, claims);
  } catch (error) {
    return buildResult(false);
  }
};
