// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from "@/utils/service";
import { baseURL } from "@/utils/service";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;
import { utils } from "@/utils/utils";
import { store } from "@/store";

const prefix = "/manage";

// 获取令牌
export const authLoginRequest = (params: any) => {
  return service({
    url: prefix + "/sys/auth/login",
    method: "POST",
    data: params,
  });
};

// 后台管理-首页-报警列表
export const backendIndexPageEmergencyRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/emergency",
    method: "POST",
    data: params,
  });
};

// 后台管理-首页-事件处置列表
export const backendIndexPageEmergencyResultRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/emergency/result",
    method: "POST",
    data: params,
  });
};

// 后台管理-铁路到达-分页查询
export const backendRailwayArriveGetRailwayArrivePagingRequest = (
  params: any
) => {
  return service({
    url: prefix + "/backend/railwayArrive/getRailwayArrivePaging",
    method: "POST",
    data: params,
  });
};

// 后台管理-铁路到达-图片导入
export const backendRailwayArriveGetRailwayImportPicRequest = (params: any) => {
  return service({
    url: prefix + "/backend/railwayArrive/importPic",
    method: "POST",
    data: params,
  });
};

// 后台管理-铁路到达-报表导出
export const backendRailwayArriveRailwayArriveExportRequest = (params: any) => {
  return service({
    url: prefix + "/backend/railwayArrive/railwayArriveExport",
    method: "GET",
    data: params,
    responseType: "blob",
  });
};

// 后台管理-铁路到达-保存
export const backendRailwayArriveSaveRailwayArriveRequest = (params: any) => {
  return service({
    url: prefix + "/backend/railwayArrive/saveRailwayArrive",
    method: "POST",
    data: params,
  });
};

// 后台管理-铁路到达-批量保存
export const backendRailwayArriveSaveRailwayArriveBatchRequest = (
  params: any
) => {
  return service({
    url: prefix + "/backend/railwayArrive/saveRailwayArriveBatch",
    method: "POST",
    data: params,
  });
};

// 后台管理-客流疏散
export const backendIndexPageFlowDistRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/flow/dist",
    method: "POST",
    data: params,
  });
};

// 后台管理-小时客流
export const backendIndexPageFlowHourlyRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/flow/hourly",
    method: "POST",
    data: params,
  });
};

// 后台管理-首页-出租车车辆监测数据
export const backendIndexPageTaxiVehicleMonitorRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/taxi/vehicle/monitor",
    method: "POST",
    data: params,
  });
};

// 后台管理-当日累计疏散客流
export const backendIndexPageTodayFlowAcceleratedRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/today/flow/accelerated",
    method: "POST",
    data: params,
  });
};

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

// 字典-保存字典列表条目（新）
export const dictionaryManageSaveDictItemRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/saveDictItem",
    method: "POST",
    data: params,
  });
};

// 字典-删除字典列表
export const dictionaryManageDelDictRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/delDict",
    method: "POST",
    params: params,
  });
};

// 字典-删除字典列表条目
export const dictionaryManageDelDelDictItemRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/delDictItem",
    method: "POST",
    params,
  });
};

// 分页查询字典列表(新)
export const dictionaryManageGetDictItemPagingRequest = (params: any) => {
  return service({
    url: prefix + "/sys/dictionary/manage/getDictItemPaging",
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

// 系统管理-用户管理-条件查询用户
export const userManageQueryAllUserRequest = (params: any) => {
  return service({
    url: prefix + "/sys/user/manage/queryAllUser",
    method: "POST",
    data: params,
  });
};

// 系统管理-角色管理-条件查询角色
export const roleManageQueryAllRoleRequest = (params: any) => {
  return service({
    url: prefix + "/sys/role/manage/queryAllRole",
    method: "POST",
    data: params,
  });
};

// 系统管理-菜单管理-删除菜单
export const nodeManageDeleteNodeRequest = (params: any) => {
  return service({
    url: prefix + "/sys/node/manage/deleteNode",
    method: "POST",
    data: params,
  });
};

// 系统管理-菜单管理-条件查询菜单
export const nodeManageQueryAllNodeRequest = (params: any) => {
  return service({
    url: prefix + "/sys/node/manage/queryAllNode",
    method: "POST",
    data: params,
  });
};

// 系统管理-菜单管理-父菜单筛选器
export const nodeManageQueryParentNodeRequest = (params: any) => {
  return service({
    url: prefix + "/sys/node/manage/queryParentNode",
    method: "GET",
    data: params,
  });
};

// 系统管理-菜单管理-保存菜单
export const nodeManageSaveSysNodeRequest = (params: any) => {
  return service({
    url: prefix + "/sys/node/manage/saveSysNode",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件-分页查询
export const eventManageSuddenEventGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/getPage",
    method: "POST",
    data: params,
  });
};

// 事件管理-事件记录-分页查询
export const eventManageSuddenEventGetRecordPageRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/getRecordPage",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件-删除突发事件
export const eventManageSuddenEventDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/delete",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件-删除突发事件处置
export const eventManageSuddenEventDeleteDisposalRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/deleteDisposal",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件-报表导出
export const eventManageSuddenEventExportRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/export",
    method: "POST",
    params,
  });
};

// 事件管理-突发事件-事件记录报表导出
export const eventManageSuddenEventExportRecordRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/exportRecord",
    method: "GET",
    params,
  });
};

// 事件管理-突发事件-查看突发事件处置
export const eventManageSuddenEventGetDisposalRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/getDisposal",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件-保存
export const eventManageSuddenEventSaveRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/save",
    method: "POST",
    data: params,
  });
};

// 信息管理-外部信息

// 信息管理-外部信息-删除
export const infoManagementExternalInfoDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/delete",
    method: "POST",
    data: params,
  });
};

// 信息管理-外部信息-根据Id查询
export const infoManagementExternalInfoGetOneByIdRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/getOneById",
    method: "POST",
    data: params,
  });
};

// 信息管理-外部信息-分页查询
export const infoManagementExternalInfoGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/getPage",
    method: "POST",
    data: params,
  });
};

// 信息管理-外部信息-保存
export const infoManagementExternalInfoSaveRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/save",
    method: "POST",
    data: params,
  });
};

// 信息管理-外部信息-处置
export const infoManagementExternalInfoHandleRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/handle",
    method: "POST",
    data: params,
  });
};

// 信息管理-舆情信息

// 信息管理-舆情信息-分页查询
export const infoManagementPublicSentimentInfoGetPageRequest = (
  params: any
) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/getPage",
    method: "POST",
    data: params,
  });
};

// 信息管理-舆情信息-删除
export const infoManagementPublicSentimentInfoDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/delete",
    method: "POST",
    data: params,
  });
};

// 信息管理-舆情信息-根据Id查询
export const infoManagementPublicSentimentInfoGetOneByIdRequest = (
  params: any
) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/getOneById",
    method: "POST",
    data: params,
  });
};

// 信息管理-舆情信息-保存
export const infoManagementPublicSentimentInfoSaveRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/save",
    method: "POST",
    data: params,
  });
};

// 信息管理-舆情信息-处置
export const infoManagementPublicSentimentInfoHandleRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/handle",
    method: "POST",
    data: params,
  });
};

// 信息管理-投诉信息

// 删除
export const infoManagementComplaintInfoDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/delete",
    method: "POST",
    data: params,
  });
};

// 处置
export const infoManagementComplaintInfoHandleRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/handle",
    method: "POST",
    data: params,
  });
};

// excel导出
export const infoManagementComplaintInfoExportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/exportExcel",
    method: "POST",
    data: params,
  });
};

// 根据Id查询
export const infoManagementComplaintInfoGetOneByIdRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/getOneById",
    method: "POST",
    data: params,
  });
};

// 分页查询
export const infoManagementComplaintInfoGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/getPage",
    method: "POST",
    data: params,
  });
};

// excel导入
export const infoManagementComplaintInfoImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/importExcel",
    method: "POST",
    data: params,
  });
};

// 保存
export const infoManagementComplaintInfoSaveRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/save",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件

// 事件管理-突发事件-删除突发事件
export const preplanPreplanDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/delete",
    method: "POST",
    data: params,
  });
};

// 预案库管理-预案库管理-删除预案库步骤
export const preplanPreplanDeleteStepRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/deleteStep",
    method: "POST",
    data: params,
  });
};

// 预案库管理-预案库管理-预案库报表导出
export const preplanPreplanExportRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/export",
    method: "GET",
    data: params,
  });
};

// 预案库管理-预案库管理-预案库步骤报表导出
export const preplanPreplanExportStepRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/exportStep",
    method: "GET",
    data: params,
  });
};

// 预案库管理-预案库管理-分页查询
export const preplanPreplanGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/getPage",
    method: "POST",
    data: params,
  });
};

// 预案库管理-预案库管理-预案库步骤分页查询
export const preplanPreplanGetStepPageRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/getStepPage",
    method: "POST",
    data: params,
  });
};

// 预案库管理-预案库管理-保存
export const preplanPreplanSaveRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/save",
    method: "POST",
    data: params,
  });
};

// 预案库管理-预案库管理-保存预案库步骤
export const preplanPreplanSaveStepRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/saveStep",
    method: "POST",
    data: params,
  });
};
