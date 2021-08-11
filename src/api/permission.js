import { post } from "@/api/config"

// 查询权限
export function queryPermissions(data) {
    return post('/permission/queryPermissions', data);
}

// 查询用户权限列表
export function queryUserPermissionList(data) {
    return post('/permission/queryUserPermissionList', data)
}

// 根据id查询用户
export function queryUserById(data) {
    return post("/permission/queryUserById", data);
}

// 分配权限
export function allocationPermissions(data) {
    return post('/permission/allocationPermissions', data);
}