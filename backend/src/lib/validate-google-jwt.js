const axios = require('axios');

const url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

module.exports = async (token) => {
  try {
    const result = await axios.get(`${url}?id_token=${token}`);
    return result.status === 200;
  } catch (error) {
    console.error('Unable to validate JWT', error);
    return false;
  }
};
