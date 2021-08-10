import { post } from "@/api/config"

// 查询权限
export function queryPermissions(data) {
    return post('/permission/queryPermissions', data);
}