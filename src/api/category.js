import { post } from "@/api/config"

export function deleteCategoryById(data) {
    return post('/category/delete', data)
}

export function queryCategoryList(data) {
    return post('/category/list', data)
}

export function queryCategoryById(data) {
    return post('/category/single', data)
}

export function categoryOperator(data, suffix) {
    return post(`/category/${suffix}`, data)
}