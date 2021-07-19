import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import store from "@/store";
import mavonEditor  from "mavon-editor"

window.bus = new Vue();

Vue.use(mavonEditor)
Vue.use(Element, { size: "mini" })

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app")

