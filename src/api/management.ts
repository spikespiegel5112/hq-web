// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from "@/utils/service";
import { baseURL } from "@/utils/service";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;
import { utils } from "@/utils/utils";
import { store } from "@/store";

const prefix = "/manage";

// 获取系统数据字典项列表(新)
export const dictionaryManageGetDictListRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/getDictList",
    method: "POST",
    data: params,
  });
};

// 分页查询字典列表(新)
export const dictionaryManageGetDictPagingRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/getDictPaging",
    method: "POST",
    data: params,
  });
};

// 刷新系统字典列表（新）
export const dictionaryManageRefreshDictListRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/refreshDictList",
    method: "POST",
    data: params,
  });
};

// 保存字典列表（新）
export const dictionaryManageSaveDictRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/saveDict",
    method: "POST",
    data: params,
  });
};

// 测试系统字典列表查询(新)
export const dictionaryManageTestDictRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/testDict",
    method: "POST",
    data: params,
  });
};
