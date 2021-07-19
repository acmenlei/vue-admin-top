import { get } from "@/api/config"

export function getusersList(data) {
    return get("/users", data);
}