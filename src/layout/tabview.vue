<template>
  <div id="tabview">
    <el-menu
      :uniqueOpened="true"
      class="el-menu-vertical-demo"
      style="height: 100vh"
      router
    >
      <div v-for="(route, index) in routes" :key="index">
        <!-- 多个路由嵌套 -->
        <el-submenu
          v-if="
            !route.meta.onlyOne && permissions && permissions.includes(route.meta.code)
          "
          :index="route.path"
        >
          <template #title>
            <i :class="route.meta.icon"></i>
            <span>{{ route.name }}</span>
          </template>
          <el-menu-item
            v-for="(croute, j) in route.children"
            :key="j"
            :index="croute.path"
            v-show="
              !croute.meta.hidden && permissions && permissions.includes(croute.meta.code)
            "
          >
            <i :class="croute.meta.icon"></i>{{ croute.name }}</el-menu-item
          >
        </el-submenu>
        <!-- 单个路由 -->
        <el-menu-item
          v-else
          v-for="(croute, j) in route.children"
          :key="j"
          :index="croute.path"
          v-show="
            !croute.meta.hidden && permissions && permissions.includes(croute.meta.code)
          "
        >
          <i :class="croute.meta.icon"></i>{{ croute.name }}
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { configRouters } from "@/router/index.js";
import { mapGetters } from "vuex";
import { queryPermissions } from "@/api/permission";
import { getUsername } from "@/common/cookie";

export default {
  name: "App",
  data() {
    return {
      routes: configRouters,
    };
  },
  beforeMount() {
    this.queryPermissions();
  },
  computed: {
    ...mapGetters("permission", ["permissions"]),
  },
  methods: {
    async queryPermissions() {
      const ll_username = getUsername(); // 此处肯定有用户名 因为已经登录过了
      const { permissions } = await queryPermissions({ ll_username });
      this.$store.dispatch("permission/permissionOperator", permissions);
    },
  },
};
</script>
