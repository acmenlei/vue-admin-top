import { post } from "@/api/config"

export function adminLogin(data) {
    return post('/admin/login', data);
}

export function adminLoginOut(data) {
    return post('/admin/loginout', data)
}

export function adminVerify(data) {
    return post('/admin/verify', data);
}

export function adminUserOperator(suffix, data) {
    return post(`/admin/${suffix}`, data);
}

export function deleteAdminUserById(data) {
    return post('/admin/delete', data)
}

export function queryAdminUserById(data) {
    return post('/admin/single', data)
}