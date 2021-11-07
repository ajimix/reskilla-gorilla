# Reskilla Gorilla Main App

1. Clone the project
1. Run `npm i`
1. Generate Airtable API key here: https://airtable.com/account and save it in `config/config.js` (make sure to not commit it).
1. Start the app with `npm run dev` (this command starts the app and monitors for file changes).

The backend is now accessible in `localhost:3000` and the frontend in `localhost:1234`

## Routes

### Jobs

#### GET `/jobs.json`

Returns all jobs in the table with all information from each job.

#### GET `/jobs/job_id.json`

Returns the job matching the ID.

#### POST `/jobs/search.json`

Allows to search for jobs using POST parameters:

- job_title (string)
- skills (array of strings)

#### POST `/jobs/match.json`

Matches future jobs based on skills:

- skills (array of strings)

### Skills

#### GET `/skills.json`

Returns all skills in the table.
