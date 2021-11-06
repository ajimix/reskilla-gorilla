const http = require('http');
const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const conditionalGet = require('koa-conditional-get');
const etag = require('koa-etag');
const json = require('koa-json');
const redisStore = require('koa-redis');
const cacheControl = require('koa-cache-control');
const router = rootRequire('app/router.js');
const enforceWWW = require('koa-www-force');
const { port, sessionSecret } = rootRequire('config/config.js');

/**
 * Simple wrapper for the success start of the server.
 */
function listeningReporter() {
  const { address, port } = this.address();
  const protocol = this.addContext ? 'https' : 'http';
  console.log(`Listening on ${protocol}://${address}:${port}...`);
}

/**
 * Starts the koa app.
 */
function start() {
  const app = new Koa();

  app.keys = [sessionSecret];

  app
    .use(bodyParser())
    .use(
      session(
        {
          store: redisStore(),
          key: 'reskilla:session',
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        },
        app
      )
    )
    .use(
      enforceWWW({
        www: false,
        useHTTPS: true,
        trustHostHeader: true,
      })
    )
    .use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      await next();
    })
    .use(cacheControl({ noCache: true }))
    .use(json())
    .use(conditionalGet())
    .use(etag())
    .use(router.routes())
    .use(router.allowedMethods());

  app.on('error', (error) => console.error(error.message, { stack: error.stack }));

  http.createServer(app.callback()).listen(port, 'localhost', listeningReporter);
}

module.exports = {
  start,
};
