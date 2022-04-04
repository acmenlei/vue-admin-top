import { getUsername } from "@/common/cookie"
import { queryPermissions } from "@/api/permission"

let permissions = [], hasRequestPermission = false
/**
 * 判断当前用户是否有权限操作按钮
 * @param {String | Array<String>} permissionCode 
 * @returns 
 */
function hasPermissions(permissionCode) {
    return new Promise((resolve) => {
        if (typeof permissionCode === 'object') {
            for (let i = 0, len = permissionCode.length; i < len; i++)
                if (!permissions.includes(permissionCode[i])) return resolve(false);
            resolve(true)
        }
        resolve(permissions.includes(permissionCode))
    })
}
/* 定义全局权限指令 */
function defineDirective(Vue) {
    Vue.directive('permission', {
        inserted: async function (el, binding) {
            // 如果不存在就去请求
            if (!hasRequestPermission) {
                const ll_username = getUsername();
                let data = await queryPermissions({ ll_username });
                permissions = data.permissions
                hasRequestPermission = true
                !await hasPermissions(binding.value) && el.parentNode.removeChild(el);
            } else {
                !await hasPermissions(binding.value) && el.parentNode.removeChild(el);
            }

        }
    })
}
export default {
    install: (Vue) => {
        defineDirective(Vue);
    }
}