<template>
  <div v-cloak>
    <form @submit.prevent>
      <div v-if="[1, 2].indexOf(currentStep) > -1">
        <h3>1. Tell us about your current job</h3>
        <label>
          Current job title
          <job-search @job-selected="jobSelected" />
        </label>
        <button class="bg-green-800" @click="step1Click">Give me luck!</button>
      </div>

      <div v-if="currentStep === 2">
        <ul v-for="index in currentJob.future_demand" :key="index">
          <li>star</li>
        </ul>
        <div v-if="currentJob.future_demand < 3">
          You like risky things!! Your job has very high change to get automated by 2030.
        </div>
        <div v-else-if="currentJob.future_demand > 3 && currentJob.future_demand < 5">
          Jor job will continue to be demanded. Your job has some changes to get automated in 2030.
        </div>
        <div v-else>You are lucky!! Your job will unlikely be automated by 2030.</div>
        <h3>2. And which skills from {{ currentJob.title }} do you master?</h3>
        <ul v-for="skill in currentJob.skills" :key="skill">
          <li>
            {{ skill }}
            <fancy-check @check="skillCheck" :passthrough="skill" />
          </li>
        </ul>
        <button class="bg-green-800" @click="step2Click" v-if="currentSkills.size > 0">Continue Please!</button>
      </div>

      <div v-if="currentStep === 3">
        <h3>These are your future possibilities!</h3>
        <ul v-for="job in jobMatches" :key="job.id">
          <li>
            {{ job.title }}
            <button class="bg-green-800" @click="step3Click" :data-job-id="job.id">Choose this Path</button>
          </li>
        </ul>
      </div>

      <div v-if="currentStep === 4">
        <h3>Welcome future {{ selectedJob.title }}!</h3>
        <p>
          {{ selectedJob.title }} is a great future job, with {{ selectedJob.future_demand }} chances of not getting
          obsolete in 2030 and a {{ selectedJob.salary_range }} average salary potential. With a {{ jobMatch }}% match
          you will quickly become a great {{ selectedJob.title }} to save your future!
        </p>
        <h3>Skills School</h3>
        <p>
          {{ selectedJob.title }} requires some additional skills which you are currently missing.
          {{ missingSkillsSchoolText }}. You can quickly gain those skills if you start as soon as possible with your
          reeskilling.
        </p>
        <p>Find below some online courses which will help you start your new career path.</p>
        <!-- <ul v-for="course in courses" :key="course.id">
          <li>
            {{ course.title }}
          </li>
        </ul> -->
      </div>
    </form>
  </div>
</template>

<script>
import FancyCheck from './components/FancyCheck.vue';
import JobSearch from './components/JobSearch.vue';

export default {
  components: { JobSearch, FancyCheck },
  data() {
    return {
      currentStep: 1,
      currentJob: null,
      currentSkills: new Set(),
      jobMatches: [],
      selectedJob: null,
    };
  },
  computed: {
    jobMatch() {
      return 123;
    },
    missingSkillsSchoolText() {
      return 'Cooking and gardening';
    },
  },
  methods: {
    jobSelected(job) {
      this.currentJob = job;
    },
    step1Click() {
      this.currentStep = 2;
    },
    skillCheck(checked, skillName) {
      if (checked) {
        this.currentSkills.add(skillName);
      } else {
        this.currentSkills.delete(skillName);
      }
      // We load the matches on each skill, so they are ready for when the user clicks to the next step
      const data = { skills: [...this.currentSkills] };
      fetch('http://localhost:3000/jobs/match.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => (this.jobMatches = json))
        .catch(console.error);
    },
    step2Click() {
      this.currentStep = 3;
    },
    step3Click(event) {
      const jobId = event.target.dataset.jobId;
      this.selectedJob = this.jobMatches.find((x) => x.id === jobId);
      this.currentStep = 4;
    },
  },
};
</script>
