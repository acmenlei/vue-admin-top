import { post } from "@/api/config"

export function deleteTagById(data) {
    return post('/tag/delete', data)
}

export function queryTagList(data) {
    return post('/tag/list', data)
}

export function queryTagById(data) {
    return post('/tag/single', data)
}

export function tagOperator(data, suffix) {
    return post(`/tag/${suffix}`, data)
}