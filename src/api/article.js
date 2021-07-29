import { post, get } from "@/api/config"

export function getArticleList(data) {
    return post('/article/list', data)
}

export function getArticleTags() {
    return get('/tag/getTags')
}

export function getArticleCategorys() {
    return get('/category/getCategorys')
}

export function getArticleById(data) {
    return post('/article/single', data)
}

export function deleteArticleById(data) {
    return post('/article/delete', data);
}