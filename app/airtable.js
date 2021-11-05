/**
 * Airtable module with singleton airtable.client
 * redis.connect();
 * Then it can be called like: redis.client.get(...)
 */

const Airtable = require('airtable');
const { airtable: airtableConfig } = rootRequire('config/config.js');

let client;

/**
 * Connect to Airtable API server.
 * @returns {object} Airtable client
 */
function connect() {
  if (undefined !== client) {
    return client;
  }
  Airtable.configure({
    apiKey: airtableConfig.apiKey,
  });
  return (client = Airtable.base(airtableConfig.baseId));
}

module.exports = {
  connect,
  /**
   * Returns the global client
   * @returns {object} The airtable client
   */
  get client() {
    return client;
  },
};
