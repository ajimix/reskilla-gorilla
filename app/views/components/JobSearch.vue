<template>
  <div>
    <input
      type="text"
      @keyup="jobTitleInputKeyDown"
      class="border-4 border-green-800 border-solid rounded-full input-extra-style p-2 px-4 w-full"
      ref="searchInput"
    />
    <ul
      class="w-11/12 mx-auto job-results-styled rounded cursor-pointer px-4 py-2 pb-4"
      v-if="jobs.length > 0 && selectedJob === null"
    >
      <li
        v-for="job in jobs.slice(0, 10)"
        :key="job.id"
        @click="jobTitleClick"
        :data-id="job.id"
        class="pt-2 text-green-900 hover:text-green-700"
      >
        {{ job.title.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
      selectedJob: null,
    };
  },
  methods: {
    jobTitleInputKeyDown(event) {
      const data = { job_title: event.target.value };

      this.selectedJob = null;

      fetch('http://localhost:3000/jobs/search.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => (this.jobs = json))
        .catch(console.error);
    },
    jobTitleClick(event) {
      const jobId = event.target.dataset.id;

      this.selectedJob = this.jobs.find((x) => x.id === jobId);
      this.$emit('jobSelected', this.selectedJob);
      this.$refs.searchInput.value = event.target.textContent;
    },
  },
};
</script>
