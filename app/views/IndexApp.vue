<template>
  <div>
    Hello {{ name }}!
    <button class="bg-red-300">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vue',
    };
  },
};
</script>
