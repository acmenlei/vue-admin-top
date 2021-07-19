<template>
  <div id="myheader">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="head" />
        <span>name</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "myheader",
  data () {
      return {
           head: "https://images.nowcoder.com/images/20180629/0_1530258288040_8455BFE79F1384FD927ADCA47F03E049"
      }
  }
};
</script>
<style scoped>
#myheader .el-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#myheader span {
  margin-left: 0.5rem;
}
</style>
