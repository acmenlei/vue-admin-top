<template>
  <div id="myheader">
    <div class="title">Vue博客后台管理系统</div>
    <div class="right">
      <screen-full />
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" :src="head" />
          <span>{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="loginOut"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getUsername } from "@/common/cookie";
import screenFull from "@/components/screenFull";

export default {
  name: "myheader",
  data() {
    return {
      username: getUsername(),
      head: "https://images.nowcoder.com/images/20180629/0_1530258288040_8455BFE79F1384FD927ADCA47F03E049",
    };
  },
  components: { screenFull },
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
<style lang="scss" scoped>
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

  span {
    margin-left: 0.5rem;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
