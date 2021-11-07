/**
 * Global helpers or initializations
 */

const { rootRequire } = require('./utils.js');

global.rootRequire = rootRequire;
global.rootPath = __dirname.replace('/app', '');

const airtable = rootRequire('app/airtable.js');

airtable.connect();
