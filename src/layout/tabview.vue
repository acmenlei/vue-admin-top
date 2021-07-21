<template>
  <div id="tabview">
    <el-menu
      :uniqueOpened="true"
      class="el-menu-vertical-demo"
      background-color="var(--theme)"
      style="height: 100vh;"
      router
    >
      <div v-for="(route, index) in routes" :key="index">
        <!-- 多个路由嵌套 -->
        <el-submenu v-if="!route.onlyOne" :index="route.path">
          <template #title>
            <i :class="route.icon"></i>
            <span>{{ route.name }}</span>
          </template>
          <el-menu-item
            v-for="(croute, j) in route.children"
            :key="j"
            :index="croute.path"
            v-show="!croute.hidden"
          >
            <i :class="croute.icon"></i>{{ croute.name }}</el-menu-item
          >
        </el-submenu>
        <!-- 单个路由 -->
        <el-menu-item
          v-else
          v-for="(croute, j) in route.children"
          :key="j"
          :index="croute.path"
          v-show="!croute.hidden"
        >
          <i :class="croute.icon"></i>{{ croute.name }}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { configRouters } from "@/router/index.js";
export default {
  name: "App",
  data () {
      return {
          routes: configRouters ,
      }
  },
 
};
</script>
