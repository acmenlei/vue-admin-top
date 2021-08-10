import { getToken, getUsername, removeToken, removeUsername } from "@/common/cookie"
import { adminLoginOut } from "@/api/user"
import { successMessage } from "@/common/message"
import { router } from "@/router"

const SET_TOKEN = "SET_TOKEN";
const SET_USERNAME = "SET_USERNAME";
const REMOVE_TOKEN = "REMOVE_TOKEN";
const REMOVE_USERNAME = "REMOVE_USERNAME";

const user = {
    namespaced: true,
    state: {
        token: getToken(),
        username: getUsername(),
    },
    mutations: {
        [SET_TOKEN]: (state, data) => state.token = data,
        [SET_USERNAME]: (state, data) => state.username = data,
        [REMOVE_TOKEN]: () => removeToken(),
        [REMOVE_USERNAME]: () => removeUsername(),
    },
    actions: {
        login({ commit }) {
            commit(SET_TOKEN, getToken())
            commit(SET_USERNAME, getUsername())
        },
        loginOut({ commit }, data) {
            adminLoginOut(data) // 退出登录
                .then(resp => {
                    const { code, msg } = resp;
                    if (code == 200) {
                        commit(REMOVE_TOKEN)
                        commit(REMOVE_USERNAME)
                        commit(SET_TOKEN, getToken())
                        commit(SET_USERNAME, getUsername())
                        successMessage(msg);
                        router.replace('/login')
                    }
                })
        },
        verifyFailed({ commit }) {
            commit(REMOVE_TOKEN)
            commit(REMOVE_USERNAME)
            commit(SET_TOKEN, getToken())
            commit(SET_USERNAME, getUsername())
        }
    },
    getters: {
        token: (state) => state.token,
        username: (state) => state.username,
    },
};

export default user;