import { get } from "@/api/config"

export function getArticleList(data) {
    return get('/article/list', data)
}