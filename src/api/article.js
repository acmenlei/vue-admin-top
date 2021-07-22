import { post } from "@/api/config"

export function getArticleList(data) {
    return post('/article/list', data)
}