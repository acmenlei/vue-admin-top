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
  width: 150px;
  height: 150px;
  cursor: pointer;
}
</style>