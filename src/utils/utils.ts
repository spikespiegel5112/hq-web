import { store } from "@/store";
import { message } from "ant-design-vue";
import { dictionaryManageGetDictListRequest } from "@/api/management";

const [messageApi, contextHolder] = message.useMessage();

interface DAMNU_ENABLE {
  [key: string]: any; // 字段扩展声明
}
const _utils = {
  $message: messageApi,
  $getLightBlubImageUrlByColor(color: string) {
    return _utils.$getImageUrl(`/src/assets/lightbulb-${color}@2x.png`);
  },
  $getImageUrl(url: string) {
    return new URL(url, import.meta.url).href;
  },
  $objectToUrlString: (query: DAMNU_ENABLE) => {
    let result = "";
    Object.keys(query).forEach((item: string, index: number) => {
      result += (index === 0 ? "?" : "&") + item + "=" + query[item];
    });

    return result;
  },
  $isEmpty: (value: any): boolean =>
    value === "" || (!value && value !== 0) || value === null,
  $isNotEmpty: (value: any): boolean => !_utils.$isEmpty(value),
  $remResizing: (params: any) => {
    let options = Object.assign(
      {
        fontSize: 16,
        baseline: 320,
        threshold: 0,
        basedonnarrow: false,
        basedonwide: false,
        dropoff: false,
        alignCenter: true,
        inward: false,
      },
      params
    );
    const htmlEl = document.getElementsByTagName("html")[0];
    const bodyEl = document.getElementsByTagName("body")[0];

    const windowHeight = window.screen.availHeight;
    const windowWidth = window.screen.availWidth;
    let frontLine = windowWidth;

    const sizeConstraint = function () {
      if (options.basedonnarrow) {
        _utils.$orientationSensor({
          portrait: function () {
            frontLine = window.screen.availWidth;
          },
          landscape: function () {
            frontLine = window.screen.availHeight;
          },
        });
      } else {
        frontLine = window.screen.availWidth;
      }
      var factor = 0;
      if (options.baseline === 0) {
        factor = 1;
      } else if (frontLine <= options.baseline) {
        if (options.inward) {
          factor = frontLine / options.threshold;
        } else {
          factor = frontLine / options.baseline;
        }
      } else if (
        (frontLine > options.baseline && frontLine <= options.threshold) ||
        options.threshold === 0
      ) {
        if (options.threshold >= 0) {
          if (options.inward) {
            factor = frontLine / options.threshold;
          } else {
            factor = frontLine / options.baseline;
          }
        }
        if (options.alignCenter) {
          bodyEl.style.margin = "0";
          bodyEl.style.width = "auto";
        }
      } else if (frontLine > options.threshold) {
        if (options.alignCenter) {
          factor = options.threshold / options.baseline;
          bodyEl.style.margin = "0 auto";
          bodyEl.style.width = options.threshold;
        } else {
          factor = frontLine / options.baseline;
          bodyEl.style.margin = "0";
          bodyEl.style.width = options.threshold;
        }

        if (options.dropoff) {
          htmlEl.style.fontSize = "none";
          return;
        }
      }
      htmlEl.style.fontSize = options.fontSize * factor + "px";

      if (options.dropoff && frontLine > options.threshold) {
        htmlEl.style.fontSize = "";
      }
    };

    if (options.baseline <= 0) {
      options.baseline = 1;
    }
    sizeConstraint();
    window.onresize = () => {
      console.log("==========window.onresize==========");
      sizeConstraint();
    };
  },
  $orientationSensor: (params: any) => {
    let options = Object.assign(
      {
        fontSize: 16,
        baseline: 320,
        threshold: 0,
        basedonnarrow: false,
        basedonwide: false,
        dropoff: false,
        alignCenter: true,
        inward: false,
      },
      params
    );
    const htmlEl = document.getElementsByTagName("html")[0];
    const bodyEl = document.getElementsByTagName("body")[0];

    const windowHeight = window.screen.availHeight;
    const windowWidth = window.screen.availWidth;
    let frontLine = windowWidth;

    const sizeConstraint = function () {
      if (options.basedonnarrow) {
        _utils.$orientationSensor({
          portrait: function () {
            frontLine = window.screen.availWidth;
          },
          landscape: function () {
            frontLine = window.screen.availHeight;
          },
        });
      } else {
        frontLine = window.screen.availWidth;
      }
      var factor = 0;
      if (options.baseline === 0) {
        factor = 1;
      } else if (frontLine <= options.baseline) {
        if (options.inward) {
          factor = frontLine / options.threshold;
        } else {
          factor = frontLine / options.baseline;
        }
      } else if (
        (frontLine > options.baseline && frontLine <= options.threshold) ||
        options.threshold === 0
      ) {
        if (options.threshold >= 0) {
          if (options.inward) {
            factor = frontLine / options.threshold;
          } else {
            factor = frontLine / options.baseline;
          }
        }
        if (options.alignCenter) {
          bodyEl.style.margin = "0";
          bodyEl.style.width = "auto";
        }
      } else if (frontLine > options.threshold) {
        if (options.alignCenter) {
          factor = options.threshold / options.baseline;
          bodyEl.style.margin = "0 auto";
          bodyEl.style.width = options.threshold;
        } else {
          factor = frontLine / options.baseline;
          bodyEl.style.margin = "0";
          bodyEl.style.width = options.threshold;
        }

        if (options.dropoff) {
          htmlEl.style.fontSize = "none";
          return;
        }
      }
      htmlEl.style.fontSize = options.fontSize * factor + "px";

      if (options.dropoff && frontLine > options.threshold) {
        htmlEl.style.fontSize = "";
      }
    };

    if (options.baseline <= 0) {
      options.baseline = 1;
    }
    sizeConstraint();
    // window.onresize = () => {
    //   sizeConstraint();
    // };
  },

  $isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  $isWindows: () => {
    return navigator.platform === "Win32";
  },

  $exportTable: (
    response: any,
    currentRoute: any,
    fileName: string | undefined
  ) => {
    const data = response;
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download =
      (utils.$isNotEmpty(fileName) ? fileName : currentRoute.meta.title) +
      ".xlsx"; // 这里填保存成的文件名
    link.click();
    URL.revokeObjectURL(link.href);
    messageApi.success("导出成功!", 3000);
  },
  $getAllDictionary: async () => {
    let dictionaryNameList = [] as any[];
    const response: any = await dictionaryManageGetDictListRequest({});
    let result: any = response.data;
    result.forEach((item1: any) => {
      if (!dictionaryNameList.some((item2: any) => item2.code === item1.code)) {
        dictionaryNameList.push(item1);
      }
    });
    dictionaryNameList.forEach((item1: any) => {
      const code = item1.code;
      let dictionaryData = result.filter((item2: any) => item2.code === code);
      dictionaryData = dictionaryData.map((item: any) => {
        if (!isNaN(Number(item.value))) {
          item.value = Number(item.value);
        }
        return item;
      });
      store.commit("dictionary/addDictionary", {
        code,
        data: dictionaryData,
      });
    });
    store.commit("dictionary/setDictionaryReady");
    // console.log(store.state.dictionary);
  },
  $getDictionary: (code: string, valueType: string) => {
    let result = [] as any[];
    let currentDictionaryData = !!code
      ? store.state.dictionary[code]
      : store.state.dictionary;
    if (
      currentDictionaryData instanceof Array &&
      currentDictionaryData.length > 0
    ) {
      result = currentDictionaryData;
    }
    if (valueType === "string") {
      result = result.map((item: any) => {
        return {
          ...item,
          value: item.value.toString(),
        };
      });
    }
    return result;
  },
  $checkEditable: (mode: string) => {
    return ["add", "edit", "disposal"].some((item: string) => item === mode);
  },
  $getBaseUrl: (mode: string) => {
    const env = import.meta.env;
    return env.VITE_BASE_URL + "/manage";
  },
} as any;

const result = {
  install(app: any, options: object): any {
    app.config.globalProperties["$messageApi"] = _utils["$messageApi"];
    app.config.globalProperties["$getLightBlubImageUrlByColor"] =
      _utils["$getLightBlubImageUrlByColor"];
    app.config.globalProperties["$getImageUrl"] = _utils["$getImageUrl"];
    app.config.globalProperties["$isEmpty"] = _utils["$isEmpty"];
    app.config.globalProperties["$isNotEmpty"] = _utils["$isNotEmpty"];
    app.config.globalProperties["$isMobile"] = _utils["$isMobile"];
    app.config.globalProperties["$isWindows"] = _utils["$isWindows"];
    app.config.globalProperties["$remResizing"] = _utils["$remResizing"];
    app.config.globalProperties["$orientationSensor"] =
      _utils["$orientationSensor"];
    app.config.globalProperties["$exportTable"] = _utils["$exportTable"];
    app.config.globalProperties["$getDictionary"] = _utils["$getDictionary"];
    app.config.globalProperties["$getAllDictionary"] =
      _utils["$getAllDictionary"];
    app.config.globalProperties["$checkEditable"] = _utils["$checkEditable"];
    app.config.globalProperties["$getBaseUrl"] = _utils["$getBaseUrl"];
  },
} as any;

export default result;
export const utils = _utils;
