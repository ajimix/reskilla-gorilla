const router = rootRequire('app/router.js');
const { loadJobs } = rootRequire('app/airtable.js');

router.get(
  '/jobs.json',
  (ctx, next) => {
    ctx.jobs = [];
    return loadJobs().then((jobs) => {
      ctx.jobs = jobs;
      return next();
    });
  },
  (ctx) => (ctx.body = ctx.jobs)
);
