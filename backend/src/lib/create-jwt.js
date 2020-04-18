const jsrsasign = require('jsrsasign');

module.exports = (username) => {
  const { SHARED_KEY, ISSUER, AUDIENCE } = process.env;
  const header = {alg: 'HS256', typ: 'JWT'};
  const timeNow = jsrsasign.jws.IntDate.get('now');
  const expireAt = jsrsasign.jws.IntDate.get('now + 1month');
  const payload = {
    iss: ISSUER,
    sub: username,
    nbf: timeNow,
    iat: timeNow,
    exp: expireAt,
    jti: 'couldBlacklistThisToPreventReplay123456',
    aud: AUDIENCE,
  };
  // Sign JWT, password=<SHARED KEY>. Will use private key in production.
  var stringifiedHeader = JSON.stringify(header);
  var stringifiedPayload = JSON.stringify(payload);
  return jsrsasign.jws.JWS.sign("HS256", stringifiedHeader, stringifiedPayload, SHARED_KEY);
}