import Vue from "vue"
import nProgress from "nprogress"
import VueRouter from "vue-router"
import { getToken, getUsername } from '@/common/cookie';
import { adminVerify } from '@/api/user';
import store from "@/store"
import { errorMessage } from '@/common/message';
import { NO_PERMISSION } from "@/common/tips"

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
    mode: "history",
    routes,
})

const WHITE_LIST = ['/login']; // 白名单

/* 守卫 */
router.beforeEach(async (to, from, next) => {
    nProgress.start()
    let { path, name, meta } = to
    window.bus.$emit("add-breadcrumb", { path, name })
    const TOKEN = getToken(), USERNAME = getUsername();
    /**
     * 白名单校验
     */
    if (WHITE_LIST.includes(path)) {
        if (TOKEN && USERNAME) return next('/home')
        else return next()
    } else {
        // PS:如果根目录 直接跳转到登录页（然后会走上边的登录页拦截 有token就回到home）
        if (path == '/') return next('/login');
        if (TOKEN && USERNAME) {
            if( !meta.code ) return next() // 到这里如果没有code就是未定义的页面404
            /**
             * 1. 验证通过 放行
             * 2. 验证不通过（两种情况 1.未登录 2.没权限） 删除cookie 重定向到login页面
             */
            const { code, msg } = await adminVerify({ routeCode: meta.code });
            if (code == 200) {
                return next()
            } else if(code == -422) {
                errorMessage(NO_PERMISSION)
                return next({...from}) // 没有权限 从哪来回哪去
            }else {
                errorMessage(msg);
                store.dispatch('user/verifyFailed') // 在vuex中删除cookie中存储的token username
                return next('/login');
            }
        } else {
            return next('/login');
        }
    }
})

router.afterEach(() => nProgress.done())

export {
    router,
    configRouters
}