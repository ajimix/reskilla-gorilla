const { rootRequire } = require('./utils.js');
const redis = require('./../config/redis.js');

/**
 * Global helpers or initializations
 */

global.rootPath = __dirname.replace('/app', '');
global.rootRequire = rootRequire;

redis.connect();
