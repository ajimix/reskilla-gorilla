const router = rootRequire('app/router.js');
const { loadJobs } = rootRequire('app/airtable.js');

router.get('/skills.json', (ctx, next) => {
  ctx.jobs = [];
  return loadJobs().then((jobs) => {
    const skills = new Set();
    jobs.forEach((job) => {
      if (undefined === job.skills) return;
      job.skills.forEach((skill) => skills.add(skill.toLowerCase()));
    });
    ctx.body = [...skills];
    return next();
  });
});
