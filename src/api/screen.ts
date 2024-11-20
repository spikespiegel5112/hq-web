// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from '@/utils/service';
import { baseURL } from '@/utils/service';
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;
import { utils } from '@/utils/utils';
import { store } from '@/store';

const prefix = '/manage';

// 大屏-大屏Banner
export const screenBannerInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/banner/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-外部信息
export const screenOutInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/out/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-外部信息处置数据
export const screenOutInfoResultRequest = (params: any) => {
  return service({
    url: prefix + '/screen/out/info/result',
    method: 'POST',
    data: params,
  });
};

// 大屏-雷达图表数据
export const screenRadarChartRequest = (params: any) => {
  return service({
    url: prefix + '/screen/radar/chart',
    method: 'POST',
    data: params,
  });
};

// 大屏-滚动信息
export const screenDailyRollInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/daily/roll/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-客流时间分布图表
export const screenTimeDistFlowRequest = (params: any) => {
  return service({
    url: prefix + '/screen/time/dist/flow',
    method: 'POST',
    data: params,
  });
};

// 大屏-客流空间分布图表-预测
export const screenSpaceDistFlowEstimatedRequest = (params: any) => {
  return service({
    url: prefix + '/screen/space/dist/flow/estimated',
    method: 'POST',
    data: params,
  });
};

// 大屏-客流空间分布图表-实时
export const screenSpaceDistFlowRealtimeRequest = (params: any) => {
  return service({
    url: prefix + '/screen/space/dist/flow/realtime',
    method: 'POST',
    data: params,
  });
};

// 大屏-今日客流数据
export const screenTodayFlowRequest = (params: any) => {
  return service({
    url: prefix + '/screen/today/flow',
    method: 'POST',
    data: params,
  });
};

// 大屏-今日客流数据
export const screenOpPlanRequest = (params: any) => {
  return service({
    url: prefix + '/screen/op/plan',
    method: 'POST',
    data: params,
  });
};

// 大屏-运行预案响应
export const screenOpPlanResponseRequest = (params: any) => {
  return service({
    url: prefix + '/screen/op/plan/response',
    method: 'POST',
    data: params,
  });
};

// 大屏-突发事件
export const screenEmergencyRequest = (params: any) => {
  return service({
    url: prefix + '/screen/emergency',
    method: 'POST',
    data: params,
  });
};

// 大屏-突发事件处置
export const screenEmergencyResultRequest = (params: any) => {
  return service({
    url: prefix + '/screen/emergency/result',
    method: 'POST',
    data: params,
  });
};

// 大屏-投诉
export const screenComplaintInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/complaint/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-重要投诉
export const screenImportantComplaintInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/important/complaint/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-舆情
export const screenPublicSentimentInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/public/sentiment/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-重要舆情
export const screenImportantPublicSentimentInfoRequest = (params: any) => {
  return service({
    url: prefix + '/screen/important/public/sentiment/info',
    method: 'POST',
    data: params,
  });
};

// 大屏-各区域小时客流数据
export const screenHocHourRequest = (params: any) => {
  return service({
    url: prefix + '/screen/hoc/hour',
    method: 'POST',
    data: params,
  });
};

// 大屏-各区域小时客流数据
export const screenTaxiVehicleMonitorRequest = (params: any) => {
  return service({
    url: prefix + '/screen/taxi/vehicle/monitor',
    method: 'POST',
    data: params,
  });
};

// 大屏-停车库车辆监测数据
export const screenParkingVehicleMonitorRequest = (params: any) => {
  return service({
    url: prefix + '/screen/parking/vehicle/monitor',
    method: 'POST',
    data: params,
  });
};

// 大屏-运行预案响应步骤
export const screenOpPlanResponseStepRequest = (params: any) => {
  return service({
    url: prefix + '/screen/op/plan/response/step',
    method: 'POST',
    data: params,
  });
};

// 大屏-突发事件响应步骤
export const screenEmergencyResultStepRequest = (params: any) => {
  return service({
    url: prefix + '/screen/emergency/result/step',
    method: 'POST',
    data: params,
  });
};
