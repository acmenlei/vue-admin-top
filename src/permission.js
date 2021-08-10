import nProgress from "nprogress"
import Vue from "vue"
import 'nprogress/nprogress.css'
// import { router } from "./router"

nProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })

Vue.use(nProgress) // 路由跳转进度

export { nProgress }