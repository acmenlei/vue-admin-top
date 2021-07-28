<template>
  <div id="myheader">
    <div class="title">测试管理台</div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="head" />
        <span>{{ username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="loginOut">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { getUsername } from "@/common/cookie";

export default {
  name: "myheader",
  data() {
    return {
      username: getUsername(),
      head: "https://images.nowcoder.com/images/20180629/0_1530258288040_8455BFE79F1384FD927ADCA47F03E049",
    };
  },
  methods: {
    async loginOut() {
      try {
        await this.$confirm("确定要退出登录吗？", "提示");
        this.$store.dispatch("user/loginOut", { ll_username: this.username });
      } catch {
        null;
      }
    },
  },
};
</script>
<style scoped>
#myheader,
#myheader .el-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
#myheader {
  width: 100%;
  background: var(--header);
}
#myheader span {
  margin-left: 0.5rem;
}
</style>
