<template>
  <div class="rounded-3xl text-white job-offer-skilled p-2">
    <div class="flex justify-between w-full mt-5 px-5">
      <span class="text-2xl">{{ caps(job.title) }}</span>
      <div class="text-right">
        <div class="text-4xl font-bold">{{ job.match_percent }}%</div>
        <div class="text-sm">match</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-10 mt-5 px-5">
      <div>
        <div class="font-bold text-base">2030 Demand</div>
        <ul class="flex justify-between space-x-4 w-full mt-2">
          <li v-for="index in job.future_demand" :key="index">
            <img
              src="../../assets/images/foot-icon.png"
              srcset="../../assets/images/foot-icon.png 1x, ../../assets/images/foot-icon@2x.png 2x"
              alt="Star"
              class="invert"
            />
          </li>
          <li v-for="index in 5 - job.future_demand" :key="index">
            <img
              src="../../assets/images/foot-icon.png"
              srcset="../../assets/images/foot-icon.png 1x, ../../assets/images/foot-icon@2x.png 2x"
              alt="Star"
              class="opacity-50 invert"
            />
          </li>
        </ul>
      </div>
      <div>
        <div class="font-bold text-base">Salary Potential</div>
        <ul class="flex justify-between space-x-4 w-full mt-2">
          <li v-for="index in job.salary_range" :key="index">
            <img
              src="../../assets/images/foot-icon.png"
              srcset="../../assets/images/foot-icon.png 1x, ../../assets/images/foot-icon@2x.png 2x"
              alt="Star"
              class="invert"
            />
          </li>
          <li v-for="index in 5 - job.salary_range" :key="index">
            <img
              src="../../assets/images/foot-icon.png"
              srcset="../../assets/images/foot-icon.png 1x, ../../assets/images/foot-icon@2x.png 2x"
              alt="Star"
              class="opacity-50 invert"
            />
          </li>
        </ul>
      </div>
      <div class="col-span-2 font-bold text-base mt-5">Skills to Learn</div>
      <div class="col-span-2 grid grid-cols-2 gap-x-10 skills-learn-styled">
        <span v-for="skill in missingSkills" :key="skill" class="text-lg">{{ caps(skill) }}</span>
      </div>
    </div>
    <div class="w-11/12 mx-auto mb-4 mt-5" v-if="showButton">
      <button
        class="
          bg-green-900
          border-4 border-green-700 border-solid
          rounded-full
          py-3
          mt-2
          w-full
          text-white text-2xl
          button-extra-style
        "
        @click="jobProceedClick"
        :data-job-id="job.id"
      >
        Choose this Path
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['job', 'showButton', 'jobMatches', 'currentSkills'],
  data() {
    return {};
  },
  computed: {
    missingSkills() {
      return this.job.skills.filter((skill) => !this.currentSkills.has(skill));
    },
  },
  methods: {
    caps(text) {
      return text.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    },
    jobProceedClick(event) {
      const jobId = event.target.dataset.jobId;
      this.$emit(
        'jobProceedClick',
        this.jobMatches.find((x) => x.id === jobId)
      );
    },
  },
};
</script>
