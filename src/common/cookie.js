import jsCookie from "js-cookie"

const TOKEN = 'TOKEN';
const USERNAME = 'USERNAME';
/* token操作 */
export function setToken(token) {
    jsCookie.set(TOKEN, token, { expires: 1 }) // 过期时间一天
}
export function getToken() {
    return jsCookie.get(TOKEN)
}
export function removeToken() {
    jsCookie.remove(TOKEN)
}
/* 用户名操作 */
export function setUsername(username) {
    jsCookie.set(USERNAME, username, { expires: 1 }) // 过期时间一天
}
export function getUsername() {
    return jsCookie.get(USERNAME)
}
export function removeUsername() {
    jsCookie.remove(USERNAME)
}