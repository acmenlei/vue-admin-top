import { getToken } from "@/common/cookie"

const SET_TOKEN = "SET_TOKEN";
const user = {
  namespaced: true,
  state: {
    token: getToken(),
  },
  mutations: {
    [SET_TOKEN](state, data) {
      state.token = data;
    },
  },
  actions: {
    [SET_TOKEN](ctx) {
      console.log(ctx);
    }
  },
  getters: {
    token: (state) => state.token,
  },
};

export default user;
