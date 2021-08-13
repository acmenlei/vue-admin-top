import nProgress from "nprogress"
import Vue from "vue"
import 'nprogress/nprogress.css'
// import { configRouters } from "@/router"

// let permissionRouters = []

// /**
//  * 配置菜单权限目录
//  * @param {Object} routers 
//  */
// function generatorPermissionRouters(routers) {
//     for (let router of routers) {
//         const { name, meta, children, path } = router;
//         if (typeof meta.hidden == 'boolean') {
//             if (meta.code == 'workTower') { // 工作台的二级菜单直接添加进一级菜单
//                 permissionRouters.push({
//                     ll_permission_name: name,
//                     ll_permission_val: meta.code,
//                     ll_children: []
//                 })
//             } else {
//                 let routerLast = permissionRouters.length - 1;
//                 permissionRouters[routerLast].ll_children.push({
//                     ll_permission_name: name,
//                     ll_permission_val: meta.code
//                 })
//             }
//         } else {
//             if (path == '/') { // 工作台的一级菜单不需要加入（可以根据自己需求来）
//                 generatorPermissionRouters(children); // 递归一级菜单的子级菜单权限
//                 continue;
//             }
//             permissionRouters.push({
//                 ll_permission_name: name,
//                 ll_permission_val: meta.code,
//                 ll_children: []
//             })
//         }
//         if (children) {
//             generatorPermissionRouters(children); // 递归子级菜单权限
//         }
//     }
// }

// setTimeout(() => {
//     generatorPermissionRouters(configRouters)
// });

nProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 500
})

Vue.use(nProgress) // 路由跳转进度

export { nProgress }