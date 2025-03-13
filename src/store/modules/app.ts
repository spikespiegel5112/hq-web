import dayjs from "dayjs";

const app = {
  namespaced: true,
  state: () => ({
    userInfo: {},
    currentQueryDateParams: {
      queryDate: "2024-09-11 09:00:00",
    },
    currentDate: null,
    envMode: import.meta.env,
    bannerInfo: {},
    defaultPagination: {
      page: 1,
      pageSize: 10,
      total: 0 as number | undefined,
    },
    currentEventTypeList: [] as any[],
    emergencyPlanType: 0,
    emergencyEventType: 1,
    tableLoading: true,
  }),
  mutations: {
    updateBannerInfo: (state: any, payload: any) => {
      state.bannerInfo = payload;
    },
    updateCurrentQueryDate: (state: any, payload: any) => {
      state.currentQueryDateParams = payload;
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
    updateTableLoading: (state: any, payload: any) => {
      state.tableLoading = payload;
    },
    updateUserInfo: (state: any, payload: any) => {
      state.userInfo = payload;
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
    },
  },
  getters: {},
};

export default app;
