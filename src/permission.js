import nProgress from "nprogress"
import Vue from "vue"
import 'nprogress/nprogress.css'
import { router } from "./router"

nProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

Vue.use(nProgress)  // 路由跳转进度

/* 守卫 */
router.beforeEach((to, from, next) => {
    nProgress.start()
    let { path, name } = to
    window.bus.$emit("add-breadcrumb", { path, name })
    next()
})

router.afterEach(() => nProgress.done())

export { nProgress }