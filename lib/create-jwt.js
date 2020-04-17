const jsrsasign = require('jsrsasign');

module.exports = (username, password) => {
  var header = {alg: 'HS256', typ: 'JWT'};
  var payload = {};
  var timeNow = jsrsasign.jws.IntDate.get('now');
  var expireAt = jsrsasign.jws.IntDate.get('now + 1month');
  payload.iss = "http://incrementific.com";
  payload.sub = username;
  payload.nbf = timeNow;
  payload.iat = timeNow;
  payload.exp = expireAt;
  payload.jti = "couldBlacklistThisToPreventReplay123456";
  payload.aud = "http://incrementific.com/users";
  // Sign JWT, password=<provided>
  var sHeader = JSON.stringify(header);
  var sPayload = JSON.stringify(payload);
  return jsrsasign.jws.JWS.sign("HS256", sHeader, sPayload, password);
}