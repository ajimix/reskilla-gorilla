/**
 * Global app config goes here.
 */
module.exports = {
  port: 3000,
  sessionSecret: 'Rge34roidjoi2j304joIJGoi2jo34rjiojdvoiet',
  isDevelopment: true,
  airtable: {
    baseId: 'app3avpIkkNR62AqO',
    apiKey: process.env.AIRTABLE_API_KEY || 'ADD_YOUR_API_KEY_HERE',
  },
  proxycrawlToken: process.env.PC_TOKEN || 'ENTER_PROXYCRAWL_TOKEN_HERE',
};
