/**
 * Airtable module with singleton airtable.client
 * redis.connect();
 * Then it can be called like: redis.client.get(...)
 */

const Airtable = require('airtable');
const { airtable: airtableConfig } = rootRequire('config/config.js');

let client;
let cachedJobs;
let cachedJobsInterval;

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

/**
 * Helper to load and cache all jobs as they don't change much and increases the speed of the app.
 */
function loadJobs() {
  if (undefined !== cachedJobs) {
    return Promise.resolve(cachedJobs);
  }
  clearInterval(cachedJobsInterval);
  let jobs = [];
  return client('Main')
    .select({
      maxRecords: 100,
      view: 'Grid view',
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const jobData = record._rawJson;
        const job = {
          id: jobData.id,
          createdTime: jobData.createdTime,
        };
        Object.assign(job, jobData.fields);
        jobs.push(job);
      });
      return fetchNextPage();
    })
    .then(() => {
      cachedJobs = JSON.parse(JSON.stringify(jobs));
      cachedJobsInterval = setInterval(() => (cachedJobs = undefined), 1000 * 60 * 1); // Clean the cache in 1 minute
      return cachedJobs;
    })
    .catch((err) => {
      console.error(err);
      throw Error(err.message);
    });
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
  loadJobs,
};
