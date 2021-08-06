<template>
  <div id="not-found">
    <el-empty description="Not Found 404 未找到您想找的页面"></el-empty>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>

<style scoped>
#not-found {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>