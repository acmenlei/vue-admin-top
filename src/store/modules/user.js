const TOKEN = "token"; // 应该取cookie里的
const SET_TOKEN = "SET_TOKEN";
const user = {
  namespaced: true,
  state: {
    token: TOKEN,
  },
  mutations: {
    [SET_TOKEN](state, data) {
      state.token = data;
    },
  },
  actions: {},
  getters: {
    token: (state) => state.token,
  },
};

export default user;
