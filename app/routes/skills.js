const { CrawlingAPI } = require('proxycrawl');
const router = rootRequire('app/router.js');
const { loadJobs } = rootRequire('app/airtable.js');
const { proxycrawlToken } = rootRequire('config/config.js');

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

router.get('/skills/:skill_name/courses.json', (ctx, next) => {
  const skillName = ctx.params.skill_name;
  const api = new CrawlingAPI({ token: proxycrawlToken });

  return api
    .get(`https://udemyfreecourses.org/ajax/search.php?query=${encodeURIComponent(skillName)}&p=1`, { ajaxWait: true })
    .then((response) => {
      if (response.statusCode === 200) {
        const json = JSON.parse(response.body);
        ctx.body = json.courses;
      } else {
        ctx.throw(500, 'Error querying data, please try again');
      }
      return next();
    })
    .catch(console.error);
});
