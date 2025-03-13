// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import router from "@/router";
import routeDictionary from "@/router/routeDictionary.ts";
import { store } from "@/store";
import { message } from "ant-design-vue";

// import { mapGetters, useStore } from "vuex";

// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;

import { getUserInfoRequest } from "@/api/auth";

const flatTree = (tree: any[]) => {
  let result = [] as any[];
  const looper = (children: any[]) => {
    result.push(...children);
    children.forEach((item: any) => {
      if (!!item.children && item.children.length > 0) {
        looper(item.children);
      }
    });
  };
  looper(tree);
  result = result.map((item: any) => {
    return {
      ...item,
    };
  });
  return result;
};

const parseRouteDictionary = (flattenedPermissionTree: any[]) => {
  const _routeDictionary: any[] = JSON.parse(
    JSON.stringify(routeDictionary[1].children)
  );

  let _result = [] as any[];
  const looper = (children: any[]) => {
    let result = [] as any[];
    children.forEach((item: any) => {
      if (
        flattenedPermissionTree.some(
          (item2: any) => item2.permissionCode === item.name
        )
      ) {
        const aaa: any = JSON.parse(JSON.stringify(item));
        if (!!item.children && item.children.length > 0) {
          aaa.children = looper(item.children);
        }
        console.log(children);

        result.push(aaa);
      }
    });
    return result;
  };
  _result = looper(_routeDictionary);
  console.log("=====permission=====");
  console.log(_result);
  return _result;
};

router.beforeEach((to: any, from: any, next: any) => {
  if (
    !!store.state.app.userInfo &&
    Object.keys(store.state.app.userInfo).length > 0
  ) {
    next();
  } else {
    const token = localStorage.getItem("token");
    if (to.name === "Login" && from.name !== "Login") {
      next();
    } else if (!token) {
      message.warning("权限失效，请重新登录");
      router.push({
        name: "Login",
      });
    } else {
      getUserInfoRequest()
        .then((response: any) => {
          response = response.data;
          const flattenedPermissionTree: any[] = flatTree(
            response.permMenuList
          );
          parseRouteDictionary(flattenedPermissionTree);

          const sysUser = response.sysUser;
          if (sysUser.userStatus === 1) {
            message.warning("用户已冻结，无法登录");
            router.push({
              name: "Login",
            });
          } else {
            store.commit("app/updateUserInfo", response.sysUser);
            next();
          }
        })
        .catch((error: any) => {
          console.log(error);
          message.warning("权限失效，请重新登录");
          localStorage.removeItem("token");
          router.push({
            name: "Login",
          });
        });
    }
  }
});

router.afterEach((to: any, from: any) => {
  // console.log("finsh", to);
});

router.onError((error: any) => {
  // console.log("router.onError", error);
});
