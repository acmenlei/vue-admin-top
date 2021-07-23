import { post } from "@/api/config"

export function adminLogin(data) {
    return post('/admin/login', data);
}