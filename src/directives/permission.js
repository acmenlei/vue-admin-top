import store from "@/store"

/**
 * 判断当前用户是否有权限操作按钮
 * @param {String | Array<String>} permissionCode 
 * @returns 
 */
function hasPermissions(permissionCode) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let { permissions } = store.state.permission;
            if(typeof permissionCode === 'object') {
                for (let i = 0, len = permissionCode.length; i < len; i++)
                    if(!permissions.includes(permissionCode[i])) return resolve(false);
                resolve(true)
            }
            resolve(permissions.includes(permissionCode))
        }, 100);
    })
}
/* 定义全局权限指令 */
function defineDirective(Vue) {
    Vue.directive('permission', {
        inserted: async function (el, binding) {
            if (!await hasPermissions(binding.value)) {
                el.parentNode.removeChild(el);
            }
        }
    })
}

export default {
    install: (Vue) => {
        defineDirective(Vue);
    }
}