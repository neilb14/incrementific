const Redis = require('ioredis');

class Storage {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      reconnectOnError(err) {
        const targetError = 'READONLY';
        if (err.message.slice(0, targetError.length) === targetError) {
          // Only reconnect when the error starts with "READONLY"
          return 2; // 2 - to resend failed command.
        }
        return 2;
      },
    })
  }

  setKey(key, value) {
    return this.redis.set(key, value);
  }

  getKey(key) {
    return this.redis.get(key);
  }

  incrementKey(key) {
    return this.redis.incr(key);
  }
}

module.exports = new Storage();
