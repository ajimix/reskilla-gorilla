const send = require('koa-send');
const path = require('path');
const fs = require('fs');
const router = rootRequire('app/router.js');

/**
 * Serves static files.
 * @param {object} ctx
 * @param {string} folder
 * @param {string} file
 * @returns {Promise} The file
 */
function serveStaticFile(ctx, folder, file) {
  if (file.length === 0 || file === '/' || !fs.existsSync(folder.substr(1) + file)) {
    return;
  }

  ctx.cacheControl = {
    maxAge: 60 * 60 * 24 * 8, // 8 days
  };

  return send(ctx, file, { root: path.resolve(global.rootPath + folder) });
}

router.get('/assets/(.*)', (ctx) => {
  const requested = path.normalize(ctx.params[0]);

  return serveStaticFile(ctx, '/public/assets/', requested);
});
