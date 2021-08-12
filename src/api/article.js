import { post, get } from "@/api/config"

export function queryArticleList(data) {
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
// 获取ststoken
export function fileUpload() {
    return post('/alioss/getToken');
}
// 文章发布或者更新
export function articleOperator(data, suffix) {
    return post(`/article/${suffix}`, data);
}