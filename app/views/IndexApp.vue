<template>
  <div v-cloak>
    <form @submit.prevent>
      <div v-if="[1, 2].indexOf(currentStep) > -1">
        <h3 class="text-5xl mt-20 text-center">1. Tell us about your current job</h3>
        <div class="grid grid-cols-2 gap-16 mt-10">
          <label>
            <span class="pl-4 text-sm">Current job title</span>
            <job-search @job-selected="jobSelected" />
          </label>
          <div>
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
              @click="step1Click"
            >
              Give me luck!
            </button>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 2">
        <div class="grid grid-cols-2 gap-16 mt-14">
          <ul class="flex justify-between space-x-4 pl-4">
            <li v-for="index in currentJob.future_demand" :key="index">
              <img
                src="../assets/images/foot-icon.png"
                srcset="../assets/images/foot-icon.png 1x, ../assets/images/foot-icon@2x.png 2x"
                alt="Star"
              />
            </li>
            <li v-for="index in 5 - currentJob.future_demand" :key="index">
              <img
                src="../assets/images/foot-icon.png"
                srcset="../assets/images/foot-icon.png 1x, ../assets/images/foot-icon@2x.png 2x"
                alt="Star"
                class="opacity-50"
              />
            </li>
          </ul>
          <div v-if="currentJob.future_demand < 3">
            You like risky things!! Your job has a very high change to get automated by 2030.
          </div>
          <div v-else-if="currentJob.future_demand > 3 && currentJob.future_demand < 5">
            Jor job will continue to be demanded. Your job has some changes to get automated in 2030.
          </div>
          <div v-else>You are lucky!! Your job will unlikely be automated by 2030.</div>
        </div>
        <h3 class="text-5xl mt-20 text-center">2. And which skills from {{ currentJob.title }} do you master?</h3>
        <ul class="grid grid-cols-2 gap-16 mt-14">
          <li v-for="skill in currentJob.skills" :key="skill" class="flex justify-between">
            <div class="flex justify-between w-full">
              <span class="text-xl">{{
                skill.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
              }}</span>
              <fancy-check @check="skillCheck" :passthrough="skill" />
            </div>
          </li>
        </ul>
        <div v-if="currentSkills.size > 0" class="w-96 mx-auto mt-14">
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
            @click="step2Click"
          >
            Continue Please!
          </button>
        </div>
      </div>

      <div v-if="currentStep === 3">
        <h3 class="text-5xl mt-20 text-center">These are your future possibilities!</h3>
        <ul class="grid grid-cols-2 gap-16 content-start mt-14">
          <li v-for="job in jobMatches" :key="job.id" class="rounded-3xl text-white job-offer-skilled">
            <div class="flex justify-between w-full mt-5 px-5">
              <span class="text-2xl">{{
                job.title.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
              }}</span>
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
                      src="../assets/images/foot-icon.png"
                      srcset="../assets/images/foot-icon.png 1x, ../assets/images/foot-icon@2x.png 2x"
                      alt="Star"
                      class="invert"
                    />
                  </li>
                  <li v-for="index in 5 - job.future_demand" :key="index">
                    <img
                      src="../assets/images/foot-icon.png"
                      srcset="../assets/images/foot-icon.png 1x, ../assets/images/foot-icon@2x.png 2x"
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
                      src="../assets/images/foot-icon.png"
                      srcset="../assets/images/foot-icon.png 1x, ../assets/images/foot-icon@2x.png 2x"
                      alt="Star"
                      class="invert"
                    />
                  </li>
                  <li v-for="index in 5 - job.salary_range" :key="index">
                    <img
                      src="../assets/images/foot-icon.png"
                      srcset="../assets/images/foot-icon.png 1x, ../assets/images/foot-icon@2x.png 2x"
                      alt="Star"
                      class="opacity-50 invert"
                    />
                  </li>
                </ul>
              </div>
              <div class="col-span-2 font-bold text-base mt-5">Skills to Learn</div>
              <div class="col-span-2 grid grid-cols-2 gap-x-10 skills-learn-styled">
                <span v-for="skill in job.skills" :key="skill" class="text-lg">{{
                  skill.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
                }}</span>
              </div>
            </div>
            <div class="w-11/12 mx-auto mb-4 mt-5">
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
                @click="step3Click"
                :data-job-id="job.id"
              >
                Choose this Path
              </button>
            </div>
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
    /**
     * The match percentage between the current job and the selected job
     */
    jobMatch() {
      let matchingSkillsCount = 0;
      this.currentJob.skills.forEach((skill) => {
        if (this.selectedJob.skills.indexOf(skill) > -1) {
          matchingSkillsCount++;
        }
      });
      return Math.round((matchingSkillsCount * 100) / this.selectedJob.skills.length);
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
        .then((jobs) => {
          // We remove the current job if it's in the array
          const sameJobId = jobs.findIndex((job) => job.id === this.currentJob.id);
          if (sameJobId > -1) {
            jobs.splice(sameJobId, 1);
          }
          this.jobMatches = jobs;
        })
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
