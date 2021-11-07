const router = rootRequire('app/router.js');
const { loadJobs } = rootRequire('app/airtable.js');

/**
 * Makes the job skills lowercase.
 * Edits the skills object in place.
 * @param {object} Job
 */
function skillsToLowerCase(job) {
  if (undefined === job.skills) return;
  job.skills = job.skills.map((skill) => skill.toLowerCase());
}

router.get('/jobs.json', (ctx, next) => {
  ctx.jobs = [];
  return loadJobs().then((jobs) => {
    jobs.forEach(skillsToLowerCase);
    ctx.body = jobs;
    return next();
  });
});

router.get('/job/:job_id.json', (ctx, next) => {
  return loadJobs().then((jobs) => {
    const jobId = ctx.params.job_id;
    const job = jobs.find((job) => job.id === jobId);
    if (undefined === job) {
      ctx.throw(404, 'Job not found');
    }
    skillsToLowerCase(job);
    ctx.body = job;
    return next();
  });
});

router.post('/jobs/search.json', (ctx, next) => {
  const data = ctx.request.body;

  ctx.jobs = [];
  return loadJobs().then((jobs) => {
    const filterJobTitle = (data.job_title && data.job_title.toLowerCase()) || '~$%_e23'; // We add some garbage so nothing matches
    const filterSkills = data.skills || [];

    // Filter the returning jobs matching criteria
    const matchingJobs = jobs.filter((job) => {
      if (job.title === undefined) return false; // Empty job titles are garbage in the table
      let matches = false;

      if (
        // Job title
        job.title.toLowerCase().indexOf(filterJobTitle) > -1 ||
        // Alternative names
        (job.alternative_names !== undefined && job.alternative_names.toLowerCase().indexOf(filterJobTitle) > -1)
      ) {
        matches = true;
      }
      if (matches === true) return true;

      filterSkills.forEach((skill) => {
        if ((job.skills + '').toLowerCase().indexOf(skill.toLowerCase()) > -1) {
          matches = true;
        }
      });

      return matches;
    });
    matchingJobs.forEach(skillsToLowerCase);
    ctx.body = matchingJobs;
    return next();
  });
});

router.post('/jobs/match.json', (ctx, next) => {
  const data = ctx.request.body;

  ctx.jobs = [];
  return loadJobs().then((jobs) => {
    const filterSkills = data.skills || [];

    // Filter the returning jobs matching criteria
    ctx.body = jobs
      .filter((job) => {
        // Empty job titles are garbage in the table
        // We only care about is_future jobs
        if (job.title === undefined || job.is_future !== true) return false;
        let matchesCount = 0;

        filterSkills.forEach((filterSkill) => {
          job.skills.forEach((jobSkill) => {
            if (jobSkill.toLowerCase() === filterSkill.toLowerCase()) {
              matchesCount++;
            }
          });
        });

        job.match_percent = Math.round((matchesCount * 100) / job.skills.length);

        return matchesCount > 0;
      })
      .sort((a, b) => b.match_percent - a.match_percent);
    return next();
  });
});
