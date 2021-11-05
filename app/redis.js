/**
 * Redis module with singleton redis.client
 * redis.connect();
 * Then it can be called like: redis.client.get(...)
 */

const Redis = require('ioredis');

let client;

/**
 * Connect to redis server.
 * @param {object} redisOptions This options will be sent directly to the redis instance
 * @returns {object} Redis client
 */
function connect(redisOptions = {}) {
  if (undefined !== client) {
    return client;
  }
  const redisClient = new Redis(redisOptions);
  redisClient.on('error', (err) => console.error('Redis error: ' + err));
  client = redisClient;
  return redisClient;
}

module.exports = {
  connect,
  /**
   * Returns the global client
   * @returns {object} The redis client
   */
  get client() {
    return client;
  },
};
