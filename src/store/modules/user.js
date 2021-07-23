import { getToken, getUsername } from "@/common/cookie"

const SET_TOKEN = "SET_TOKEN";
const SET_USERNAME = "SET_USERNAME";
const user = {
  namespaced: true,
  state: {
    token: getToken(),
    username: getUsername()
  },
  mutations: {
    [SET_TOKEN]: (state, data) => state.token = data,
    [SET_USERNAME]: (state, data) => state.username = data,
  },
  actions: {
    login({ commit }) {
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
