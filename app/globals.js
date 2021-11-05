const { rootRequire } = require('./utils.js');
const redis = require('./redis.js');

/**
 * Global helpers or initializations
 */

global.rootPath = __dirname.replace('/app', '');
global.rootRequire = rootRequire;

redis.connect();
