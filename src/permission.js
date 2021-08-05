import nProgress from "nprogress"
import Vue from "vue"
import 'nprogress/nprogress.css'
import { router } from "./router"
import { getToken, getUsername } from '@/common/cookie';
import { adminVerify } from '@/api/user';
import store from "@/store"
import { errorMessage } from '@/common/message';

nProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

Vue.use(nProgress) // 路由跳转进度

const WHITE_LIST = ['/login'];

/* 守卫 */
router.beforeEach(async(to, from, next) => {
    nProgress.start()
    let { path, name } = to
    window.bus.$emit("add-breadcrumb", { path, name })
    const TOKEN = getToken(),
        USERNAME = getUsername();
    /**
     * 白名单校验
     */
    if (WHITE_LIST.includes(path)) {
        if (TOKEN && USERNAME) {
            return next('/home')
        } else {
            return next()
        }
    } else {
        // PS:如果根目录 直接跳转到登录页（然后会走上边的登录页拦截 有token就回到home）
        if (path == '/') {
            return next('/login');
        }
        if (TOKEN && USERNAME) {
            /**
             * 1. 验证通过 放行
             * 2. 验证不通过 删除cookie 重定向到login页面
             */
            const { code, msg } = await adminVerify();
            if (code == 200) {
                return next();
            } else {
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

export { nProgress }