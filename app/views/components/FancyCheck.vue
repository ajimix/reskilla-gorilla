<template>
  <div>
    <div v-if="checked === false" @click="mainClick">unselected</div>
    <div v-else @click="mainClick">selected</div>
  </div>
</template>

<script>
export default {
  props: ['passthrough'],
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    mainClick() {
      this.checked = !this.checked;
      this.$emit('check', this.checked, this.passthrough);
    },
  },
};
</script>
