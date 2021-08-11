<template>
  <div>
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <el-aside width="220px"><Tabview /></el-aside>
        <el-main
          ><Breadcrumd />
          <!-- 路由缓存 -->
          <!-- <router-view v-slot="{ Component }">
            <keep-alive include="/home">
              <component :is="Component" />
            </keep-alive> </router-view
        > -->
          <keep-alive :exclude="['category-edit', 'tag-edit', 'article-edit', 'user-edit']">
            <router-view class="router-animate"></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Tabview from "./tabview.vue";
import Header from "./header.vue";
import Breadcrumd from "@/components/breadcrumb";

export default {
  name: "layout",
  components: { Tabview, Header, Breadcrumd },
};
</script>
<style>
:root {
  --theme: #fff;
  --header: #409eff;
}
footer,
header,
.title {
  background: var(--header);
  color: var(--theme);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
main,
footer,
header {
  padding: 10px;
}
@keyframes animate {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
.router-animate {
  animation: animate .3s;
}
</style>