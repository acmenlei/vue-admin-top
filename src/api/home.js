import {get } from "@/api/config";

export function getCategoryGroup() {
    return get('/visual/getCategoryGroup');
}