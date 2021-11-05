/**
 * Global helpers or initializations
 */

const { rootRequire } = require('./utils.js');

global.rootRequire = rootRequire;
global.rootPath = __dirname.replace('/app', '');

const redis = rootRequire('app/redis.js');
const airtable = rootRequire('app/airtable.js');

redis.connect();
airtable.connect();
