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

router.post(
  '/jobs/search.json',
  (ctx, next) => {
    const data = ctx.request.body;

    ctx.jobs = [];
    return loadJobs().then((jobs) => {
      const filterJobTitle = data.job_title || '~$%_e23'; // We add some garbage so nothing matches
      const filterSkills = data.skills || [];

      // Filter the returning jobs matching criteria
      ctx.jobs = jobs.filter((job) => {
        let matches = false;

        if (
          // Job title
          job.title.indexOf(filterJobTitle) > -1 ||
          // Alternative names
          (job.alternative_names !== undefined && job.alternative_names.indexOf(filterJobTitle) > -1)
        ) {
          matches = true;
        }
        if (matches === true) return;

        filterSkills.forEach((skill) => {
          if ((job.skills + '').indexOf(skill) > -1) {
            matches = true;
          }
        });

        return matches;
      });
      return next();
    });
  },
  (ctx) => (ctx.body = ctx.jobs)
);
