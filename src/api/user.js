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