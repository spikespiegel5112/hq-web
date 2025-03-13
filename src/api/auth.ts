// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from "@/utils/service";
import { baseURL } from "@/utils/service";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;

const prefix = "/manage";

// 获取用户信息
export const getUserInfoRequest = (params: any) => {
  return service({
    url: prefix + "/getUserInfo",
    method: "POST",
    data: params,
  });
};

// 获取令牌
export const authLoginRequest = (params: any) => {
  return service({
    url: prefix + "/login",
    method: "POST",
    data: params,
  });
};
