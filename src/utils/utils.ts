import { store } from "@/store";
import { message } from "ant-design-vue";
import { dictionaryManageGetDictListRequest } from "@/api/management";
// import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;

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
    try {
      const data = response;
      const blob = new Blob([data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      link.download =
        (utils.$isNotEmpty(fileName) ? fileName : currentRoute.meta.title) +
        ".xlsx"; // 这里填保存成的文件名
      link.click();
      URL.revokeObjectURL(link.href);

      messageApi.success("导出成功!", 3000);
    } catch (error) {
      messageApi.error("导出失败!", 3000);
    }
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
  $getFileBaseUrl: (mode: string) => {
    const env = import.meta.env;
    return env.VITE_FILE_BASE_URL + "/manage";
  },

  $checkFileType: (fileName: string) => {
    const getFileExtension = (filename: string) => {
      if (typeof filename !== "string") {
        throw new Error("参数必须是字符串");
      }

      // 获取最后一个点后的内容作为后缀名
      const extension: any = filename.split(".").pop();

      // 如果文件名中没有点，或者点在开头，则返回空字符串
      if (extension === filename || filename.startsWith(".")) {
        return "";
      }

      return extension.toLowerCase(); // 返回小写后缀
    };
    let result = "";
    const attachmentName = fileName;
    const fileSufix = getFileExtension(attachmentName);

    const imageType = ["png", "jpg", "jpeg", "gif", "bmp"];
    const videoType = [
      "mp4",
      "avi",
      "mov",
      "wmv",
      "flv",
      "rmvb",
      "3gp",
      "webm",
    ];
    const fileType = [
      "xls",
      "xlsx",
      "pdf",
      "doc",
      "docx",
      "ppt",
      "pptx",
      "txt",
    ];
    const pdfType = ["pdf"];
    if (imageType.includes(fileSufix)) {
      result = "image";
    }
    if (videoType.includes(fileSufix)) {
      result = "video";
    }
    if (fileType.includes(fileSufix)) {
      result = "file";
    }
    if (pdfType.includes(fileSufix)) {
      result = "pdf";
    }
    return result;
  },
  $getColorInfoByValue(colorValue: string, colorList: any[]) {
    if (!colorList) {
      colorList = [
        {
          label: "黄色",
          color: "yellow",
          value: 0,
        },
        {
          label: "橙色",
          color: "orange",
          value: 1,
        },
        {
          label: "红色",
          color: "red",
          value: 2,
        },
      ];
    }

    const color = colorList.find((item: any) => item.value === colorValue);
    return color;
  },
  $generateUUID() {
    // 创建一个数组来保存UUID的各个部分
    let uuid = [] as any[],
      i;
    // RFC4122 version 4 UUID
    for (i = 0; i < 32; i++) {
      // 随机生成一个16位的数，并将其转为16进制字符串
      uuid[i] = ((Math.random() * 16) | 0).toString(16);
    }
    // 设置UUID的版本号为4（即4位的随机数为4）
    uuid[6] = (uuid[6] & 0x0f) | 0x40;
    // 设置UUID的变体为DCE1.1（即2位的高4位为8）
    uuid[8] = (uuid[8] & 0x3f) | 0x80;

    // 将数组转换为UUID格式的字符串，并用"-"分隔各部分
    return uuid.join("");
  },
  $checkAuth(global: any, permissionCode: string) {
    if (!global.$route.meta.permissionCodeList) {
      // debugger;
    }
    const result: boolean = global.$route.meta.permissionCodeList.some(
      (item: string) => item === permissionCode
    );
    return result;
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
    app.config.globalProperties["$getFileBaseUrl"] = _utils["$getFileBaseUrl"];
    app.config.globalProperties["$checkFileType"] = _utils["$checkFileType"];
    app.config.globalProperties["$getColorInfoByValue"] =
      _utils["$getColorInfoByValue"];
    app.config.globalProperties["$generateUUID"] = _utils["$generateUUID"];
    app.config.globalProperties["$checkAuth"] = _utils["$checkAuth"];
  },
} as any;

export default result;
export const utils = _utils;
