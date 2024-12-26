import { color } from "echarts";

const dictionary = {
  namespaced: true,
  state: () => ({
    dictionaryReady: false,
    actionDictionary: [
      {
        label: "下载",
        name: "download",
        color: null,
      },
      {
        label: "预览",
        name: "preview",
        color: null,
      },
      {
        label: "定位",
        name: "locate",
        color: null,
      },
      {
        label: "详情",
        name: "review",
        color: null,
      },
      {
        label: "详情",
        name: "detail",
        color: null,
      },
      {
        label: "编辑",
        name: "edit",
        color: null,
      },
      {
        label: "事件处置",
        name: "disposal",
        color: null,
      },
      {
        label: "删除",
        name: "delete",
        color: "font-color-red",
      },
    ],
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
        title: "详情",
        value: "detail",
      },
      {
        title: "查看",
        value: "review",
      },
      {
        title: "处置",
        value: "disposal",
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
    setDictionaryReady: (state: any) => {
      state.dictionaryReady = true;
    },
  },
  actions: {},
  getters: {},
};

export default dictionary;
