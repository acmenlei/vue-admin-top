<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        class="breadcrumb-item"
        v-for="(breadcrumbsItem, index) in breadcrumbs"
        :key="index"
        :to="{ path: breadcrumbsItem.path }"
        >{{ breadcrumbsItem.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      breadcrumbs: [{ path: '/home', name: "工作台" }], // 默认为工作台
    };
  },
  created() {
    window.bus.$on("add-breadcrumb", (data) => {
      const { name } = data;
      const result = this.breadcrumbs.find(
        (breadcrumbsItem) => breadcrumbsItem.name == name
      );
      if (!result) {
        this.breadcrumbs.push(data);
      } else {
        this.breadcrumbs.pop();
      }
    });
  },
};
</script>
<style scoped>
.breadcrumb {
    margin-bottom: 1rem;
}
</style>