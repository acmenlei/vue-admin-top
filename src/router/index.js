import Vue from "vue"
import VueRouter from "vue-router";
const files = require.context(".", true, /\.js$/);

Vue.use(VueRouter)

let configRouters = [];

files.keys().forEach((key) => {
  if (["./index.js"].includes(key)) return;
  // 读取文件中的default模块
  configRouters = configRouters.concat(files(key).default);
});

// 默认路由配置
const defaultRoutes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "登陆", component: () => import("@/views/login/index.vue") },
];

// 拼装路由
const routes = defaultRoutes.concat(configRouters);

const router = new VueRouter({
  mode: "history",
  routes,
});

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push= function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

/* 守卫 */
router.beforeEach((to, from, next) => {
  let { path, name } = to;
  window.bus.$emit("add-breadcrumb", { path, name });
  next();
})

export { router, configRouters };
