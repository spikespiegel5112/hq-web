import { color } from "echarts";

const dictionary = {
  namespaced: true,
  state: () => ({
    dialogMode: [
      {
        title: "新增",
        value: "add",
      },
      {
        title: "编辑",
        value: "edit",
      },
      {
        title: "查看",
        value: "review",
      },
    ],
    responseStatus: [
      {
        title: "未通过",
        value: 1,
      },
      {
        title: "已通过",
        value: 2,
      },
    ],
    responseLevel: [
      {
        title: "红色",
        value: 0,
        color: "red",
      },
      {
        title: "黄色",
        value: 1,
        color: "yellow",
      },
      {
        title: "绿色",
        value: 2,
        color: "#75fb4c",
      },
    ],
    processingLevel: [
      {
        title: "图片",
        value: 0,
      },
    ],
    fileType: [
      {
        title: "图片",
        value: 0,
      },
      {
        title: "视频",
        value: 1,
      },
      {
        title: "PDF",
        value: 2,
      },
    ],
    peakDayType: [
      {
        title: "常态日",
        value: 0,
      },
      {
        title: "高峰日",
        value: 1,
      },
      {
        title: "节假日",
        value: 2,
      },
    ],
    publicSentimentSensitive: [
      {
        title: "非敏感",
        value: 1,
      },
      {
        title: "中性",
        value: 2,
      },
      {
        title: "敏感",
        value: 3,
      },
    ],
    complaintArea: [
      {
        title: "中虹国际大厦",
        value: 0,
        color: "#00F0FF",
      },
      {
        title: "出租车区域",
        value: 1,
        color: "#00FFB4",
      },
      {
        title: "停车库区域",
        value: 2,
        color: "#FFEA00",
      },
      {
        title: "停车库南区域",
        value: 3,
        color: "#00FF0C",
      },
      {
        title: "B区南北通道",
        value: 4,
        color: "#C961FF",
      },
      {
        title: "网约车上客点",
        value: 5,
        color: "#FF8A00",
      },
      {
        title: "其他",
        value: 6,
        color: "red",
      },
    ],
    complaintSensitive: [
      {
        title: "非敏感",
        value: 1,
      },
      {
        title: "中性",
        value: 2,
      },
      {
        title: "敏感",
        value: 3,
      },
    ],
    complaintType: [
      {
        title: "运行组织",
        value: 1,
      },
      {
        title: "服务质量",
        value: 2,
      },
      {
        title: "标识类",
        value: 3,
      },
      {
        title: "环境卫生",
        value: 4,
      },
      {
        title: "收费类",
        value: 5,
      },
      {
        title: "设施设备",
        value: 6,
      },
      {
        title: "其他",
        value: 7,
      },
    ],
    weather: [
      {
        fileName: "中雨@1x.png",
        value: 1,
      },
      {
        fileName: "中雪@1x.png",
        value: 1,
      },
      {
        fileName: "冰冻@1x.png",
        value: 1,
      },
      {
        fileName: "多云@1x.png",
        value: 1,
      },
      {
        fileName: "大雨@1x.png",
        value: 1,
      },
      {
        fileName: "大雪@1x.png",
        value: 1,
      },

      {
        fileName: "大雾@1x.png",
        value: 1,
      },
      {
        fileName: "小雨@1x.png",
        value: 1,
      },
      {
        fileName: "小雪@1x.png",
        value: 1,
      },
      {
        fileName: "晴天@1x.png",
        value: 1,
      },
      {
        fileName: "暴雨@1x.png",
        value: 1,
      },
      {
        fileName: "暴雪@1x.png",
        value: 1,
      },
      {
        fileName: "阴天@1x.png",
        value: 1,
      },
      {
        fileName: "雷阵雨@1x.png",
        value: 1,
      },
    ],
    weekday: [
      {
        title: "星期一",
        value: 0,
      },
      {
        title: "星期二",
        value: 1,
      },
      {
        title: "星期三",
        value: 2,
      },
      {
        title: "星期四",
        value: 3,
      },
      {
        title: "星期五",
        value: 4,
      },
      {
        title: "星期六",
        value: 5,
      },
      {
        title: "星期日",
        value: 6,
      },
    ],
    source: [
      {
        title: "ERC",
        value: 0,
      },
      {
        title: "HOC",
        value: 1,
      },
    ],
    disposalStatus: [
      {
        title: "未处置",
        value: 0,
        lightColor: "red",
      },
      {
        title: "处置中",
        value: 1,
        lightColor: "yellow",
      },

      {
        title: "已处置",
        value: 2,
        lightColor: "green",
      },
    ],
    disposalStatus2: [
      {
        title: "未处置",
        value: 0,
        lightColor: "red",
      },
      {
        title: "处置中",
        value: 1,
        lightColor: "orange",
      },

      {
        title: "已处置",
        value: 2,
        lightColor: "green",
      },
    ],

    mainChannelLineUpSituation: [
      {
        title: "未排队",
        value: 0,
      },
      {
        title: "排队",
        value: 1,
      },
    ],
    mainChannelCongestionSituation: [
      {
        title: "畅通",
        value: 0,
      },
      {
        title: "拥堵",
        value: 1,
      },
    ],
  }),
  mutations: {
    updateCurrentChatList: (state: any, payload: object) => {
      state.currentChatList = payload;
    },
    addDictionary: (state: any, payload: any) => {
      state[payload.code] = payload.data;
    },
  },
  actions: {},
  getters: {},
};

export default dictionary;
