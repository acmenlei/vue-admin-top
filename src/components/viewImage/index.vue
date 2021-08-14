<template>
  <viewer :images="[src]"
    ><img v-for="(url, index) in [src]" :src="url" :key="index"
  /></viewer>
</template>

<script>
export default {
  name: "view-image",
  props: {
    src: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
</style>