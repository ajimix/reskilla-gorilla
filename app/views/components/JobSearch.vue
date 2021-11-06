<template>
  <div>
    <input type="text" @keyup="jobTitleInputKeyDown" class="border-2" ref="searchInput" />
    <ul v-for="job in jobs" :key="job.id">
      <li @click="jobTitleClick" class="cursor-pointer" :data-id="job.id">{{ job.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    };
  },
  methods: {
    jobTitleInputKeyDown(event) {
      const data = { job_title: event.target.value };

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
      this.$emit(
        'jobSelected',
        this.jobs.find((x) => x.id === jobId)
      );
      this.$refs.searchInput.value = event.target.textContent;
    },
  },
};
</script>
