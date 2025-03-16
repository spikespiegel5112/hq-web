import router from "@/router";
import { store } from "@/store";
import { message } from "ant-design-vue";

const loadView = (componetPath: string) => {
  // 路由懒加载
  return () => import(componetPath);
};

router.beforeEach(async (to: any, from: any, next: any) => {
  if (
    !!store.state.user.userInfo &&
    Object.keys(store.state.user.userInfo).length > 0 &&
    to.path !== from.path
  ) {
    next();
  } else {
    const token = localStorage.getItem("token");

    if (to.name === "Login" && from.name !== "Login") {
      store.commit("user/updateUserInfoFinally", true);
      next();
    } else if (to.name === "Login" && from.name === "Login") {
      location.reload();
    } else if (!token) {
      message.warning("权限失效，请重新登录");
      next({
        name: "Login",
      });
    } else {
      const sysUser = store.state.user.userInfo.sysUser;

      if (sysUser.userStatus === 1) {
        message.warning("用户已冻结，无法登录");
        next({
          name: "Login",
        });
      } else {
        store.commit("user/updateUserInfo", store.state.user.userInfo.sysUser);
        store.commit("user/updateUserInfoFinally", true);
        console.log(to);
        next();
      }
    }
  }
});

router.afterEach((to: any, from: any) => {});

router.onError((error: any) => {
  console.log("router.onError", error);
});
