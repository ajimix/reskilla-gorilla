<template>
  <div>
    <div v-if="checked === false" @click="mainClick" class="cursor-pointer">
      <img
        src="../../assets/images/unchecked.png"
        srcset="../../assets/images/unchecked.png 1x, ../../assets/images/unchecked@2x.png 2x"
        alt="Unchecked"
      />
    </div>
    <div v-else @click="mainClick" class="cursor-pointer">
      <img
        src="../../assets/images/checked.png"
        srcset="../../assets/images/checked.png 1x, ../../assets/images/checked@2x.png 2x"
        alt="Checked"
      />
    </div>
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
