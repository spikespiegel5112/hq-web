import router from "@/router";
import routeDictionary from "@/router/routeDictionary.ts";
import { store } from "@/store";
import { message } from "ant-design-vue";
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
  return result;
};

const parseRouteDictionary = (flattenedPermissionTree: any[]) => {
  // 永久显示的路由
  const permanentRouteName: any[] = ["Dashboard"];
  const _routeDictionary: any[] = JSON.parse(
    JSON.stringify(routeDictionary[1].children)
  );

  let result = [] as any[];
  const looper = (children: any[]) => {
    let _result = [] as any[];
    children.forEach((item: any) => {
      if (
        flattenedPermissionTree.some(
          (item2: any) => item2.permissionCode === item.name
        ) ||
        permanentRouteName.some((item2: any) => item2 === item.name)
      ) {
        const _item: any = JSON.parse(JSON.stringify(item));
        if (!!item.children && item.children.length > 0) {
          _item.children = looper(item.children);
        }
        _result.push(_item);
      }
    });
    return _result;
  };
  result = looper(_routeDictionary);
  return result;
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
          const parsedRouteDictionary = parseRouteDictionary(
            flattenedPermissionTree
          );
          store.commit(
            "app/updateParsedRouteDictionary",
            parsedRouteDictionary
          );
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
