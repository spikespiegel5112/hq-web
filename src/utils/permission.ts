import router from "@/router";
import systemRouteDictionary from "@/router/systemRouteDictionary.ts";
import { store } from "@/store";
import { getUserInfoRequest } from "@/api/auth";
import app from "@/utils/appInstance.ts";

let permMenuList: any[] = [];
let parsedRouteDictionary: any[] = [];
let userInfoResponse: any;

const loadView = (componetPath: string) => {
  // 路由懒加载
  return () => import(componetPath);
};

const assemblingRoutes = async () => {
  userInfoResponse = store.state.user.userInfo;
  permMenuList = userInfoResponse.permMenuList;

  const flattenedPermissionTree: any[] = flatTree(permMenuList);
  parsedRouteDictionary = parseRouteDictionary(
    systemRouteDictionary,
    flattenedPermissionTree
  );
  // parsedRouteDictionary = systemRouteDictionary;
  store.commit("app/updateParsedRouteDictionary", parsedRouteDictionary);

  router.addRoute({
    path: "/",
    name: "Layout",
    componentPath: "@/views/Layout.vue",
    redirect: "/Dashboard",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue"),
    children: parsedRouteDictionary,
  });

  store.commit("user/updateUserInfoFinally", true);
};

const findNodeChildrenPermissionCodeByName = (name: string) => {
  let result: any;
  const looper = (children: any[]) => {
    children.forEach((item: any) => {
      if (item.permissionCode === name) {
        result = item.children.map((item2: any) => item2.permissionCode);
      } else {
        looper(item.children);
      }
    });
  };
  looper(permMenuList);

  return result;
};

const parseRouteDictionary = (
  _routeDictionary: any[],
  flattenedPermissionTree: any[]
) => {
  // 永久显示的路由
  const permanentRouteName: any[] = ["Layout", "Dashboard"];
  // const _routeDictionary: any[] = systemRouteDictionary;
  let result = [] as any[];
  const looper = (children: any[]) => {
    let _result = [] as any[];
    children.forEach((item: any) => {
      const currentPermissionInfo = flattenedPermissionTree.find(
        (item2: any) => item2.permissionCode === item.name
      );
      if (
        !!currentPermissionInfo ||
        permanentRouteName.some((item2: any) => item2 === item.name)
      ) {
        const _item: any = item;
        if (!!item.children && item.children.length > 0) {
          _item.children = looper(item.children);
        }
        if (item.name === "Layout") {
          _item.component = () => import(item.componentPath);
          // _item.component = loadView(item.componentPath || "");
        }
        _result.push({
          ..._item,
          meta: {
            ..._item.meta,
            permissionCodeList: findNodeChildrenPermissionCodeByName(
              _item.name
            ),
          },
        });
      }
    });
    return _result;
  };

  result = looper(_routeDictionary);
  return result;
};

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

const getUserInfoPromise = () => {
  return new Promise((resolve: any, reject: any) => {
    getUserInfoRequest()
      .then((response: any) => {
        let userInfoResponse = response;
        userInfoResponse = userInfoResponse.data;
        store.commit("user/updateUserInfo", userInfoResponse);
        store.commit("user/updateUserInfoFinally", true);

        assemblingRoutes();
        resolve(response);
      })
      .catch((error: any) => {
        localStorage.removeItem("token");
        reject(error);
      });
  });
};

try {
  await getUserInfoPromise();
  app.use(router);
} catch (error) {
  app.use(router);
}

export default getUserInfoPromise;
