// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from "@/utils/service";
import { baseURL } from "@/utils/service";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;
import { utils } from "@/utils/utils";
import { store } from "@/store";

const prefix = "/manage";

// 视频上墙
export const videoUpperWall = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/videoUpperWall",
    method: "POST",
    data: params,
  });
};
// 获取告警信息
export const getAreaMapAlarmInfoData = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/getAreaMapAlarmInfoData",
    method: "POST",
    data: params,
  });
};

// 大屏-突发事件
export const backendIndexPageSuddenEventRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/suddenEvent",
    method: "POST",
    data: params,
  });
};

// 附件
// 下载
export const attachmentDownloadRequest = (params: any) => {
  return service({
    url: prefix + "/attachment/download",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 上传
// /attachment/upload

// 删除
export const attachmentDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/attachment/delete",
    method: "POST",
    data: params,
  });
};

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

// 首页-获取告警列表数据
export const backendIndexPageGetAlarmInfoDataRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/getAlarmInfoData",
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

// 区域小时客流-铁路到达-图片导入
export const backendRailwayArriveImportPicRequest = (params: any) => {
  return service({
    url: prefix + "/backend/railwayArrive/importPic",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 后台管理-铁路到达-报表导出
export const backendRailwayArriveRailwayArriveExportRequest = (params: any) => {
  return service({
    url: prefix + "/backend/railwayArrive/railwayArriveExport",
    method: "GET",
    params,
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

// 区域小时客流-铁路到达-删除铁路到达
export const backendRailwayArriveDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/backend/railwayArrive/delete",
    method: "POST",
    params,
  });
};

// 客流数据管理-区域客流-相机名称查询
export const passengerFlowAreaFlowGetCameraNameRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/areaFlow/getCameraName",
    method: "GET",
    params,
  });
};

// 客流数据管理-区域客流-分页查询
export const passengerFlowAreaFlowGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/areaFlow/getPage",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-区域客流-导出
export const passengerFlowAreaFlowExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/areaFlow/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 客流数据管理-区域进出客流
// Area In Out Flow Controller

// 客流数据管理-区域进出客流-导出
export const passengerFlowAreaAreaInOutFlowExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/areaInOutFlow/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 客流数据管理-区域进出客流-相机名称查询
export const passengerFlowAreaAreaInOutFlowGetCameraNameRequest = (
  params: any
) => {
  return service({
    url: prefix + "/passengerFlow/areaInOutFlow/getCameraName",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-区域进出客流-分页查询
export const passengerFlowAreaAreaInOutFlowGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/areaInOutFlow/getPage",
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

// 后台管理-小时客流（新）
export const backendIndexPageFlowHourlyNewRequest = (params: any) => {
  return service({
    url: prefix + "/backend/indexPage/flow/hourlyNew",
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

// 客流数据管理-地铁客流

// 客流数据管理-地铁客流-导出
export const passengerFlowMetroPassengerFlowExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/metroPassengerFlow/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 客流数据管理-地铁客流-分页查询
export const passengerFlowMetroPassengerFlowGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/metroPassengerFlow/getPage",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-地铁客流-当日地铁客流统计
export const passengerFlowMetroPassengerFlowGetStatisticsRequest = (
  params: any
) => {
  return service({
    url: prefix + "/passengerFlow/metroPassengerFlow/getStatistics",
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
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 事件管理-突发事件-事件记录报表导出
export const eventManageSuddenEventExportRecordRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/exportRecord",
    method: "GET",
    params,
    responseType: "blob",
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

// 事件管理-突发事件-保存突发事件处置
export const eventManageSuddenEventSaveDisposalRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/saveDisposal",
    method: "POST",
    data: params,
  });
};

// 事件管理-突发事件-报表导入
export const eventManageSuddenEventImportRequest = (params: any) => {
  return service({
    url: prefix + "/eventManage/suddenEvent/import",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

// 信息管理-外部信息-excel导出
export const infoManagementExternalInfoExportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 信息管理-外部信息-excel导入
export const infoManagementExternalInfoImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/externalInfo/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

// 信息管理-舆情信息-excel导出
export const infoManagementPublicSentimentInfoExportExcelRequest = (
  params: any
) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 信息管理-舆情信息-excel导入
export const infoManagementPublicSentimentInfoImportExcelRequest = (
  params: any
) => {
  return service({
    url: prefix + "/infoManagement/publicSentimentInfo/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 信息管理-投诉信息

// 信息管理-天气信息

// 信息管理-天气信息-根据Id查询
export const infoManagementWeatherInfoGetOneByIdRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/weatherInfo/getOneById",
    method: "POST",
    data: params,
  });
};

// 信息管理-天气信息-查看天气预警
export const infoManagementWeatherInfoGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/weatherInfo/getPage",
    method: "POST",
    data: params,
  });
};

// 信息管理-天气信息-发布预警
export const infoManagementWeatherInfoPublishWarningRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/weatherInfo/publishWarning",
    method: "POST",
    data: params,
  });
};

// 信息管理-天气信息-报表导出
export const infoManagementWeatherInfoExportRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/weatherInfo/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 信息管理-投诉信息

// 信息管理-投诉信息-删除
export const infoManagementComplaintInfoDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/delete",
    method: "POST",
    data: params,
  });
};

// 导入重要投诉--excel导入
export const infoManagementComplaintInfoImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 信息管理-投诉信息-处置
export const infoManagementComplaintInfoHandleRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/handle",
    method: "POST",
    data: params,
  });
};

// 信息管理-投诉信息-excel导出
export const infoManagementComplaintInfoExportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/infoManagement/complaintInfo/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
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
    params,
    responseType: "blob",
  });
};

// 预案库管理-预案库管理-预案库步骤报表导出
export const preplanPreplanExportStepRequest = (params: any) => {
  return service({
    url: prefix + "/preplan/preplan/exportStep",
    method: "GET",
    params,
    responseType: "blob",
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

// 预案库管理-预案库管理-步骤和预案一起保存
export const preplanPreplanSaveWithPreplanStepRequest = (params: any) => {
  return service({
    url: prefix + "//preplan/preplan/saveWithPreplanStep",
    method: "POST",
    data: params,
  });
};

// 预案管理-应急预案

// 删除
export const planManagementEmergencyPlanDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/delete",
    method: "POST",
    data: params,
  });
};

// excel导出
export const planManagementEmergencyPlanExportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// excel导出-记录
export const planManagementEmergencyPlanExportRecordExcelRequest = (
  params: any
) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/exportRecordExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 根据Id查询
export const planManagementEmergencyPlanGetOneByIdRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/getOneById",
    method: "POST",
    data: params,
  });
};

// 分页查询
export const planManagementEmergencyPlanGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/getPage",
    method: "POST",
    data: params,
  });
};

// 分页查询-记录
export const planManagementEmergencyPlanGetRecordPageRequest = (
  params: any
) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/getRecordPage",
    method: "POST",
    data: params,
  });
};

// excel导入
export const planManagementEmergencyPlanImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 保存
export const planManagementEmergencyPlanSaveRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/save",
    method: "POST",
    data: params,
  });
};

// 保存
export const planManagementEmergencyPlanSaveDisposalRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/saveDisposal",
    method: "POST",
    data: params,
  });
};

// 查看处置
export const planManagementEmergencyPlanGetDisposalRequest = (params: any) => {
  return service({
    url: prefix + "/planManagement/emergencyPlan/getDisposal",
    method: "POST",
    data: params,
  });
};

// 运行管理-值班人员  Duty Staff Controller

// 删除
export const operationManagementDutyStaffDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/dutyStaff/delete",
    method: "POST",
    data: params,
  });
};

// excel导出
export const operationManagementDutyStaffExportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/dutyStaff/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 根据Id查询
export const operationManagementDutyStaffGetOneByIdRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/dutyStaff/getOneById",
    method: "POST",
    data: params,
  });
};

// 分页查询
export const operationManagementDutyStaffGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/dutyStaff/getPage",
    method: "POST",
    data: params,
  });
};

// excel导入
export const operationManagementDutyStaffImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/dutyStaff/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 保存
export const operationManagementDutyStaffSaveRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/dutyStaff/save",
    method: "POST",
    data: params,
  });
};

// 运行管理-告警信息 Alarm Info Controller

// 删除
export const operationManagementAlarmInfoDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/alarmInfo/delete",
    method: "POST",
    data: params,
  });
};

// excel导出
export const operationManagementAlarmInfoExportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/alarmInfo/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 根据Id查询
export const operationManagementAlarmInfoGetOneByIdRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/alarmInfo/getOneById",
    method: "POST",
    data: params,
  });
};

// 分页查询
export const operationManagementAlarmInfoGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/alarmInfo/getPage",
    method: "POST",
    data: params,
  });
};

// excel导入
export const operationManagementAlarmInfoImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/alarmInfo/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 保存
export const operationManagementAlarmInfoSaveRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/alarmInfo/save",
    method: "POST",
    data: params,
  });
};

// 运行管理-日历信息
// Calendar Info Controller

// 删除
export const operationManagementCalendarInfoDeleteRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/calendarInfo/delete",
    method: "POST",
    data: params,
  });
};

// excel导出
export const operationManagementCalendarInfoExportExcelRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/calendarInfo/exportExcel",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 根据Id查询
export const operationManagementCalendarInfoGetOneByIdRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/calendarInfo/getOneById",
    method: "POST",
    data: params,
  });
};

// 分页查询
export const operationManagementCalendarInfoGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/calendarInfo/getPage",
    method: "POST",
    data: params,
  });
};

// excel导入
export const operationManagementCalendarInfoImportExcelRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/calendarInfo/importExcel",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 保存
export const operationManagementCalendarInfoSaveRequest = (params: any) => {
  return service({
    url: prefix + "/operationManagement/calendarInfo/save",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-车库流量信息
// Parking Flow Controller

// 停车库车辆监测-excel导入
export const importParkingVehicleMonitorImportExcelRequest = (params: any) => {
  return service({
    url: prefix + "/import/parkingVehicleMonitor/importExcel",
    method: "POST",
    params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 客流数据管理-车库流量信息-导出
export const passengerFlowParkingPassengerFlowExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/parkingPassengerFlow/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 客流数据管理-车库流量信息-出入口信息查询
export const passengerFlowParkingPassengerFlowGetCapPlaceRequest = (
  params: any
) => {
  return service({
    url: prefix + "/passengerFlow/parkingPassengerFlow/getCapPlace",
    method: "GET",
    params,
  });
};

// 客流数据管理-车库流量信息-分页查询
export const passengerFlowParkingPassengerFlowGetPageRequest = (
  params: any
) => {
  return service({
    url: prefix + "/passengerFlow/parkingPassengerFlow/getPage",
    method: "POST",
    data: params,
  });
};

// 运行管理-运行配置
// Operation Config Controller

// 查询常用配置列表
export const operationManagementOperationConfigGetCommonListRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/operationConfig/getCommonList",
    method: "POST",
    data: params,
  });
};

// 常用配置-订阅
export const operationManagementOperationConfigSubscribeConfigRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/operationConfig/subscribeConfig",
    method: "POST",
    data: params,
  });
};

// 常用配置-告警
export const operationManagementOperationConfigAlarmLightConfigRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/operationConfig/alarmLightConfig",
    method: "POST",
    data: params,
  });
};

// 配置
export const operationManagementOperationConfigConfigRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/operationConfig/config",
    method: "POST",
    data: params,
  });
};

// 查询列表
export const operationManagementOperationConfigGetListRequest = (
  params: any
) => {
  return service({
    url: prefix + "/operationManagement/operationConfig/getList",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-出租车
// Taxi Parking Controller

// 客流数据管理-出租车客流-导出
export const passengerFlowTaxiParkingExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/taxiParking/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 客流数据管理-出租车-分页查询
export const passengerFlowTaxiParkingGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/taxiParking/getPage",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-蓄车场
// Storage Controller

// 客流数据管理-蓄车场-导出
export const passengerFlowStorageExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/storage/export",
    method: "GET",
    params,
    responseType: "blob",
  });
};

// 客流数据管理-蓄车场-分页查询
export const passengerFlowStorageGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/storage/getPage",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-蓄车场-统计查询
export const passengerFlowStorageGetStatisticsRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/storage/getStatistics",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-网约车
// E Hailing Parking Controller

// 客流数据管理-网约车-导出
export const passengerFloweEHailingParkingExportRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/eHailingParking/export",
    method: "POST",
    data: params,
  });
};

// 客流数据管理-网约车-类型查询
export const passengerFloweEHailingParkingGetCapPlaceRequest = (
  params: any
) => {
  return service({
    url: prefix + "/passengerFlow/eHailingParking/getCapPlace",
    method: "GET",
    data: params,
  });
};

// 客流数据管理-网约车-分页查询
export const passengerFloweEHailingParkingGetPageRequest = (params: any) => {
  return service({
    url: prefix + "/passengerFlow/eHailingParking/getPage",
    method: "POST",
    data: params,
  });
};
