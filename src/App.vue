<template>
  <router-view />
</template>
<script>
import { TAG_COLORS } from "@/common/tag-color"

export default {
  name: "App",
  data() {
    return {
      TAG_COLORS
    }
  },
  provide() {
    return {
      TAG_COLORS: this.TAG_COLORS
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.my-page {
  margin-top: 1rem;
}
.my-tag {
  margin-right: .2rem;
  margin-top: .2rem;
}
#nprogress .bar {
  background: red !important;
}
</style>
