require('./app/globals.js');
const app = rootRequire('app/init.js');

app.start();

// Require all routes
rootRequire('routes/*');

process.on('uncaughtException', (e) => {
  console.error(`uncaughtException: [${e.code}] ${e.message}`, { stack: e.stack });
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.error(`unhandledRejection: [${e.code}] ${e.message}`, { stack: e.stack });
  process.exit(1);
});
