# Reskilla Gorilla Main App

1. Clone the project
1. Install redis in socket mode
1. Run `npm i`
1. Generate Airtable API key here: https://airtable.com/account and save it in `config/config.js` (make sure to not commit it).
1. Start the app with `npm run dev` (this command starts redis and monitors for file changes, you can also run `npm start` if you don't need those features).

## Routes

### Jobs

#### GET `/jobs.json`

Returns all jobs in the table with all information from each job.

### POST `/jobs/search.json`

Allows to search for jobs using POST parameters:

- job_title (string)
- skills (array of strings)

### Skills

#### GET `/skills.json`

Returns all skills in the table.
