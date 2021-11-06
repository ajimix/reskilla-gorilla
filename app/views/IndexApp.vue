<template>
  <div v-cloak>
    <form @submit.prevent>
      <h3>1. Tell us about your current job</h3>
      <label>
        Current job title
        <job-search @job-selected="jobSelected" />
      </label>
      <button class="bg-green-800" @click="step1Click">Give me luck!</button>

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
        <button class="bg-green-800" @click="step2Click">Continue Please!</button>
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
    };
  },
  mounted() {
    // App mounted
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
    },
    step2Click() {
      this.currentStep = 3;
    },
  },
};
</script>
