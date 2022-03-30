import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const files = require.context(".", true, /\.js$/)
let configRouters = []

files.keys().forEach((key) => {
    if (["./index.js"].includes(key)) return;
    // 读取文件中的default模块
    configRouters = configRouters.concat(files(key).default);
})

// 默认路由配置
const defaultRoutes = [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "登陆", component: () => import("@/views/login") },
    { path: "*", name: "404", component: () => import("@/views/404") },
]

// 拼装路由
const routes = configRouters.concat(defaultRoutes)

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTE_MODE,
    routes,
})


export { router, configRouters }