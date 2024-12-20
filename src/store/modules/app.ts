import dayjs from "dayjs";

const app = {
  namespaced: true,
  state: () => ({
    refreshInterval: 20000,
    currentQueryDateParams: {
      queryDate: "2024-09-11 09:00:00",
    },
    currentDate: "",
    currentQueryHourParams: {
      hour: 0,
    },
    envMode: import.meta.env,
    lastOneHourDate: "",
    bannerInfo: {},
    currentPeriod: "",
    defaultPagination: {
      page: 1,
      pageSize: 20,
      total: 0 as number | undefined,
    },
    currentEventTypeList: [] as any,
  }),
  mutations: {
    updateBannerInfo: (state: any, payload: any) => {
      state.bannerInfo = payload;
    },
    updateCurrentQueryDate: (state: any, payload: any) => {
      state.currentQueryDateParams = payload;
    },
    updateLastOneHourDate: (state: any, payload: any) => {
      state.lastOneHourDate = payload;
    },
    updateCurrentQueryHourParams: (state: any, payload: any) => {
      state.currentQueryHourParams.hour = payload;
    },
    updateCurrentPeriod: (state: any, payload: any) => {
      state.currentPeriod = payload;
    },
    updatePdfViewerVisible: (state: any, payload: any) => {
      state.pdfViewerVisible = payload;
    },
    updatePdfViewerFilePath: (state: any, payload: any) => {
      state.pdfViewerFilePath = payload;
    },
    updateVideoPlayerVisible: (state: any, payload: any) => {
      state.videoPlayerVisible = payload;
    },
    updateVideoPlayerFilePath: (state: any, payload: any) => {
      state.videoPlayerFilePath = payload;
    },
    updateCurrentEventTypeList: (state: any, payload: any) => {
      const isExist = state.currentEventTypeList.some(
        (item: any) => item.type === payload.type
      );
      if (!isExist) {
        state.currentEventTypeList.push({
          type: payload.type,
          data: payload.data.map((item: any) => {
            return {
              label: item.eventType,
              value: item.id.toString(),
            };
          }),
        });
      }
    },
  },
  actions: {
    refreshCurrentQueryDate: (context: any) => {
      const formatString = "YYYY-MM-DD HH:mm:ss";
      let payload = context.state.currentQueryDateParams;
      payload = {
        currentDate: dayjs().format(formatString),
        queryDate: dayjs().subtract(1, "hour").format(formatString),
      };
      context.commit("updateCurrentQueryDate", {
        queryDate: "2024-09-11 14:00:00",
        // queryDate: payload.queryDate,
      });
      context.commit("updateCurrentQueryHourParams", 5);
      // context.commit('updateCurrentQueryHourParams', Number(dayjs().format('HH')));
    },
    refreshLastOneHourDate: (context: any) => {
      const formatString = "YYYY-MM-DD HH:mm:ss";
      const date = dayjs().subtract(1, "hour").format(formatString);
      context.commit("updateLastOneHourDate", date);
      return date;
    },
    refreshCurrentPeriod: (context: any) => {
      const lastHour = dayjs().subtract(1, "hour").format("HH") + ":00";
      const currentHour = dayjs().format("HH") + ":00";
      context.commit("updateCurrentPeriod", lastHour + "-" + currentHour);
    },
  },
  getters: {},
};

export default app;
