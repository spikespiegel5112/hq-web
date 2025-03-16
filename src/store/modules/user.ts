const user = {
  namespaced: true,
  state: {
    userInfo: {},
    userIdInfo: {},
    userDetailInfo: {},
    userInfoFinally: false,
  },
  mutations: {
    updateUserInfo: (state: any, payload: any) => {
      state.userInfo = payload;
    },
    updateUserInfoFinally: (state: any, payload: any) => {
      state.userInfoFinally = payload;
    },
    clearUserInfo: (state: any, payload: any) => {
      state.userInfo = {};
    },
  },
  actions: {},
  getters: {},
};

export default user;
