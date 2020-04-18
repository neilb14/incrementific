const crypto = require('crypto');

module.exports = ({ requestContext: { authorizer } }) => {
  if (!authorizer) throw Error('Missing authorizer');
  return crypto.createHash('md5').update(authorizer.principalId).digest('hex');  
}
