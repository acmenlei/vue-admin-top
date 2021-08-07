import {get, post } from "@/api/config";

export function queryCategoryGroup() {
    return get('/visual/queryCategoryGroup');
}

export function queryVisitedBythirtyDay(data) {
    return post('/visual/queryVisitedBythirtyDay', data);
}