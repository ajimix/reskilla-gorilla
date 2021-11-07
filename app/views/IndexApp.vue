<template>
  <div v-cloak>
    <form @submit.prevent>
      <div v-if="[1, 2].indexOf(currentStep) > -1">
        <h3 class="text-5xl mt-20">1. Tell us about your current job</h3>
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
              Tell me more
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
          <div v-else>
            You are lucky!! Your job will unlikely be automated by 2030. Still, you can look around to see what the
            future looks like.
          </div>
        </div>
        <h3 class="text-5xl mt-20">2. Select the skills your have</h3>
        <ul class="grid grid-cols-2 gap-x-16 mt-14">
          <li v-for="skill in currentJob.skills" :key="skill" class="flex justify-between">
            <div class="flex justify-between w-full">
              <span class="text-xl">{{ caps(skill) }}</span>
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
            Show me future jobs
          </button>
        </div>
      </div>

      <div v-if="currentStep === 3">
        <p class="mt-20">
          There is
          <span v-if="currentJob.future_demand < 3"> 95% </span>
          <span v-else-if="currentJob.future_demand > 3 && currentJob.future_demand < 5"> 65% </span>
          <span v-else> 23% </span>
          risk that some part or all of your job will be automated. Here's looking at your future job!
        </p>
        <h3 class="text-5xl mt-5">These are your future possibilities!</h3>
        <div v-if="jobMatches.length === 0" class="mt-5">
          <strong>
            Oops! Looks like we don't have any job suggestions for you. Refresh the page and try again with another job
            or selecting less skills
          </strong>
        </div>
        <div v-else>
          <p class="mt-5">
            Here are a number of jobs you can transition into where your current skills will help. Click on the job
            you're interested in and find out new skills needed. Then see how you can learn those skills over time.
          </p>
          <ul class="grid grid-cols-2 gap-16 content-start mt-14">
            <li v-for="job in jobMatches" :key="job.id">
              <job-card :job="job" :show-button="true" @job-proceed-click="step3Click" :job-matches="jobMatches" />
            </li>
          </ul>
        </div>
      </div>

      <div v-if="currentStep === 4">
        <h3 class="text-5xl mt-20">Hello future {{ selectedJob.title }}</h3>
        <div class="grid grid-cols-2 gap-16 mt-8">
          <div>
            <p class="mt-5">
              {{ caps(selectedJob.title) }} is a great future job, with
              {{ Math.round((selectedJob.future_demand * 100) / 5) }}% chances of not getting obsolete in 2030 and a
              {{ Math.round((selectedJob.salary_range * 100) / 5) }}% average salary potential. With a {{ jobMatch }}%
              match you will quickly become a great {{ caps(selectedJob.title) }} to save your future!
            </p>
            <job-card :job="selectedJob" :job-matches="jobMatches" class="mt-5" />
          </div>
          <img
            src="../assets/images/gorilla-yay.png"
            srcset="../assets/images/gorilla-yay.png 1x, ../assets/images/gorilla-yay@2x.png 2x"
            alt="Gorilla YAY"
          />
        </div>

        <h3 class="text-5xl mt-20">Skills School</h3>
        <p class="mt-5">
          {{ caps(selectedJob.title) }} requires some additional skills which you are currently missing:
          {{ missingSkillsSchoolText }}.
        </p>
        <p class="mt-5">You can quickly gain those skills if you start as soon as possible with your reeskilling.</p>
        <p class="mt-5">Find below some online courses which will help you start your new career path.</p>
        <ul v-if="Object.keys(skillCourses).length > 0">
          <li v-for="skill in missingSkills" :key="skill">
            <div v-if="skillCourses[skill]">
              <h4 class="text-3xl mt-10 mb-5">Courses for {{ caps(skill) }}</h4>
              <ul>
                <li
                  v-for="course in skillCourses[skill]"
                  :key="course.id"
                  class="rounded-lg mb-5 flex course-item-styled overflow-hidden"
                >
                  <img :src="course['image_304x171']" alt="Course image" />
                  <div class="p-5">
                    <strong>{{ course.title }}</strong>
                    <p v-html="course.headline" class="mt-3"></p>
                    <div class="mt-2">
                      <a :href="'https://udemy.com' + course.url" target="_blank" title="View course" class="underline"
                        >View Course</a
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div v-else>Loading, please wait...</div>
      </div>
    </form>
  </div>
</template>

<script>
import FancyCheck from './components/FancyCheck.vue';
import JobCard from './components/JobCard.vue';
import JobSearch from './components/JobSearch.vue';

export default {
  components: { JobSearch, FancyCheck, JobCard },
  data() {
    return {
      currentStep: 1,
      currentJob: null,
      currentSkills: new Set(),
      jobMatches: [],
      selectedJob: null,
      skillCourses: {},
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
      const missingSkills = this.missingSkills;
      let string;

      if (missingSkills.length === 1) {
        string = this.caps(missingSkills[0]);
      } else {
        string = missingSkills
          .map((x) => this.caps(x))
          .slice(0, missingSkills.length - 1)
          .join(', ');

        if (missingSkills.length > 1) {
          string += ` and ${this.caps(missingSkills[missingSkills.length - 1])}`;
        }
      }

      return string;
    },
    missingSkills() {
      return this.selectedJob.skills.filter((skill) => this.currentJob.skills.indexOf(skill) === -1);
    },
  },
  methods: {
    caps(text) {
      return text.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    },
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
      fetch('/api/jobs/match.json', {
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
    step3Click(job) {
      this.selectedJob = job;
      this.currentStep = 4;

      this.missingSkills.forEach((skill) => {
        fetch(`/api/skills/${encodeURIComponent(skill)}/courses.json`)
          .then((response) => response.json())
          .then((courses) => (this.skillCourses[skill] = courses.slice(0, 5)))
          .catch(console.error);
      });
    },
  },
};
</script>
