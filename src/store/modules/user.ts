const user = {
  namespaced: true,
  state: {
    userInfo: {},
    userIdInfo: {},
    userDetailInfo: {},
  },
  mutations: {
    updateUserInfo: (state: any, payload: any) => {
      state.userInfo = payload;
    },
  },
  actions: {},
  getters: {},
};

export default user;
