<template>
  <div class="dashboardright common_block_wrapper">
    <div class="header">
      <a-form>
        <a-row class="rowClass">
          <a-col :span="12" style="margin-top: 0.04rem">
            <span
              :class="{ active: state.isActive === 'p9' }"
              @click="setActive('p9')"
            >
              P9停车场
            </span>
            <span
              style="margin-left: 0.1rem"
              :class="{ active: state.isActive === 'nanxu' }"
              @click="setActive('nanxu')"
            >
              南蓄车场
            </span>
          </a-col>
          <a-col :span="12">
            <a-form-item label="区域">
              <a-select
                v-model:value="state.selectedRegion"
                placeholder="请选择"
                @change="handleSelectChange"
                style="z-index: 1000"
              >
                <a-select-option
                  v-for="item in cameraList"
                  :key="item.label"
                  :value="item.label"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- 上墙 -->
          <a-col :span="12">
            <a-button type="primary" class="checkBtn" @click="checkBtn">
              上墙
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="content">
      <div id="videoDOMId"></div>
      <div class="mapPic">
        <img src="@/assets/mapPic.png" />
        <!-- 报警事件 -->
        <div
          class="location"
          v-for="item in state.alarmList"
          :key="item.name"
          :style="{ left: item.left, top: item.top }"
          @click="alarmClick(item)"
          v-show="item.isAlarm"
        >
          <span class="bubble">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import {
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
  nextTick,
} from "vue";

import axios from "axios"; // 导入 axios

import cameraList from "./camera.ts";

import {
  screenBannerInfoRequest,
  getAreaMapAlarmInfoData,
  videoUpperWall,
} from "@/api/management";
import CryptoJS from "crypto-js"; // 导入 crypto-js
const _window: any = window;

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const checkFlag = ref(false);
const AccessToken = ref();
const isActive = ref("p9");
const areaMapAlarmInfoData = ref([]);

const state = reactive({
  selectedRegion: null,
  isActive: "p9",
  cameraListChecked: [] as any[],
  cameraListTotal: [] as any[],
  areaMapAlarmInfoData: {},
  alarmList: [
    { name: "申虹国际大厦", top: "1.4rem", left: "1.4rem", isAlarm: false },
    { name: "出租车市域铁", top: "1.4rem", left: "2rem", isAlarm: false },
    { name: "蓄车场北", top: "0.8rem", left: "1.6rem", isAlarm: false },
    { name: "蓄车场南", top: "2.5rem", left: "1.7rem", isAlarm: false },
    { name: "P9P10停车库", top: "1.2rem", left: "0.9rem", isAlarm: false },
    { name: "西交B区", top: "1.5rem", left: "1rem", isAlarm: false },
    { name: "P9网约车1F", top: "1.2rem", left: "1.2rem", isAlarm: false },
    { name: "P10网约车1F", top: "2.2rem", left: "1rem", isAlarm: false },
    { name: "申贵路地下通道", top: "1.8rem", left: "1.25rem", isAlarm: false },
  ],
});

// 定义 winContent 响应式数据
const winContent = ref("");
const defaultCameraList = ref("");

// ----------------------------------data------------

// 上墙功能
const checkBtn = () => {
  console.log("点击了上墙");
  videoUpperWall({})
    .then((res: any) => {
      console.log("上墙res", res);
    })
    .catch((err: any) => {
      console.log(err);
    });
  // 更新所有 videoDom 中的勾选框显示状态
  document
    .querySelectorAll("#videoDOMId input[type='checkbox']")
    .forEach((checkbox: any) => {
      checkbox.style.display = "block";

      //  // 注册勾选事件
      //  checkbox.addEventListener('change', (event:any) => {
      //   handleCheckboxChange(event);
      // });
    });
};

// 初始化
const initPlayer = async (initData: any) => {
  _window.imosPlayer
    .init(initData)
    .then(function (res: any) {
      if (res.ErrCode === 0) {
      } else {
        console.error(res.ErrMsg);
      }
    })
    .catch(function (err: any) {
      console.error(err);
    });
};

// 动态加载外部脚本
const loadScript = () => {
  return new Promise((resolve: any, reject: any) => {
    const script = document.createElement("script");
    script.src = "http://10.141.10.10:8093/static/imosPlayer.min.js";
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    document.head.appendChild(script);
  });
};

const clearPanelWindow = () => {
  const videoContainer = document.querySelector("#videoDOMId");
  if (videoContainer) {
    videoContainer.innerHTML = null;
  }
};

// 创建窗格
const createPanelWindow = () => {
  return new Promise((resolve, reject) => {
    let videoDom = _window.imosPlayer.createPanelWindow();
    videoDom.style.width = "140px";
    videoDom.style.height = "150px";
    videoDom.style.marginTop = "0.08rem";
    videoDom.style.overflow = "hidden"; // 确保子元素内部也隐藏溢出部分

    // 创建勾选框
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.position = "absolute";
    checkbox.style.top = "5px";
    checkbox.style.left = "5px";
    checkbox.style.display = checkFlag.value ? "block" : "none"; // 初始状态根据 checkFlag 决定

    checkbox.addEventListener("change", handleCheckboxChange);

    videoDom.appendChild(checkbox);

    const videoContainer = document.querySelector("#videoDOMId");
    if (videoContainer) {
      videoContainer.appendChild(videoDom);
      resolve(videoDom.id);
    } else {
      reject("视频容器未找到");
    }
  });
};

// 视频勾选事件
const handleCheckboxChange = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    console.log("勾选框被选中");
    // 在这里添加勾选框被选中时的逻辑
  } else {
    console.log("勾选框未被选中");
    // 在这里添加勾选框未被选中时的逻辑
  }
};

const forCameraData = () => {
  state.cameraListChecked.forEach((item: any) => {
    createPanelWindow().then((videoDomId: any) => {
      let itemData = {
        id: videoDomId,
        ResCode: item.ResItemV1.ResCode,
        ResName: item.ResItemV1.ResName,
      };

      startLive(itemData);
    });
  });
};

// 启动实况
const startLive = (itemData: any) => {
  _window.imosPlayer
    .playLive(itemData.id, {
      camera: itemData.ResCode,
      title: itemData.ResName,
      stream: 0,
    })
    .then((res: any) => {});
};

// 获取相机数据
const getCameraData = async () => {
  let ipaddr = "http://10.141.10.10:8088/VIID/query";
  let data1 = {
    org: "iccsid",
    condition: {
      ItemNum: 3,
      Condition: [
        {
          QueryType: 256,
          LogicFlag: 0,
          QueryData: "1001",
        },
        {
          QueryType: 257,
          LogicFlag: 0,
          QueryData: "1",
        },
        {
          QueryType: 1,
          LogicFlag: 5,
          QueryData: "",
        },
      ],
      QueryCount: 1,
      PageFirstRowNumber: 0,
      PageRowNum: 200,
    },
  };
  let conditionEncodeStr1 = encodeURIComponent(JSON.stringify(data1.condition));
  let url = `${ipaddr}?org=${data1.org}&condition=${conditionEncodeStr1}`;
  const res = await axios
    .get(url, {
      headers: {
        Authorization: AccessToken.value,
      },
    })
    .then((res: any) => {
      state.cameraListTotal = res.data.Result.InfoList;
      console.log(state.cameraListTotal);
      console.log("相机总资源", state.cameraListTotal);
      state.cameraListChecked = state.cameraListTotal.filter((item: any) => {
        return item.OrgName.includes("B1");
      });

      // 视频暂时只显示4个，视频会盖住其他dom元素 暂时没法解决
      state.cameraListChecked.length >= 4
        ? (state.cameraListChecked = state.cameraListChecked.slice(0, 4))
        : null;
      console.log("Checked111---", state.cameraListChecked);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

// 勾选数据
const handleSelectChange = (value: any) => {
  const selectedCameraList = cameraList.find(
    (item: any) => item.label === value
  )?.data;
  const selectedCameraData: any[] = state.cameraListTotal.filter(
    (item: any) => {
      return selectedCameraList.find(
        (item2: any) => item.ResItemV1.ResCode === item2.id
      );
    }
  );
  clearPanelWindow();
  state.cameraListChecked = selectedCameraData;
  // createPanelWindow();
  forCameraData();
};

// 设置激活的 span
const setActive = (value: string) => {
  state.isActive = value;
};

// 警报弹窗点击事件-符合类型的视频将显示在页面
const alarmClick = (value: any) => {
  state.cameraListChecked = state.cameraListTotal.map(
    (item: { OrgName: any }) => {
      return item.OrgName == value.name;
    }
  );
  // state.cameraListTotal.forEach(item => {

  // });
};

// //获取区域告警信息
const getAreaMapAlarmInfoFun = () => {
  getAreaMapAlarmInfoData({})
    .then((res: any) => {
      state.areaMapAlarmInfoData = res.data.areaToAlarmInfoMap;
      if (state.areaMapAlarmInfoData) {
        console.log("有事故发生", res.data.areaToAlarmInfoMap);
        for (const key in state.areaMapAlarmInfoData) {
          state.alarmList.forEach(
            (item: { name: string; isAlarm: boolean }) => {
              return item.name === key ? (item.isAlarm = true) : null;
            }
          );
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const init = async () => {
  try {
    const res1 = await axios.post("http://10.141.10.10:8088/VIID/login/v2", {});
    const postData = {
      UserName: "loadmin",
      AccessCode: res1.data.AccessCode,
      LoginSignature: CryptoJS.MD5(
        btoa("loadmin") +
          res1.data.AccessCode +
          CryptoJS.MD5("Hqhoc_20240919").toString()
      ).toString(),
    };

    const res2 = await axios.post(
      "http://10.141.10.10:8088/VIID/login/v2",
      postData
    );
    AccessToken.value = res2.data.AccessToken;

    res2.data.AccessToken
      ? setInterval(async () => {
          await axios.post(
            "http://10.141.10.10:8088/VIID/hadesadapter/user/keepalive",
            {},
            {
              headers: {
                Authorization: `${res2.data.AccessToken}`,
              },
            }
          );
        }, 30000)
      : null;

    await loadScript();
    const initData = {
      ip: "10.141.10.10",
      token: AccessToken.value,
      title: document.title,
      offset: [0, 0],
    };

    await initPlayer(initData);

    setTimeout(() => {}, 1000);
  } catch (error) {
    console.error("Login failed:", error);
  }

  //获取相机资源数据1
  await getCameraData();
  // 默认循环视频数组
  state.selectedRegion = cameraList[0].label;
  //获取区域告警信息
  getAreaMapAlarmInfoFun();

  // // 监听 areaMapAlarmInfoData 的变化
  watch(
    () => state.selectedRegion,
    (newValue: any) => {
      handleSelectChange(newValue);
    }
  );
};

onMounted(async () => {
  init();
  console.log("cameraList");
  console.log(cameraList);
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboardright {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.75rem);
  position: relative;

  .content {
    height: calc(100vh - 3.4rem);
    text-align: center;
    position: relative;
    // background-color: #fff;
    overflow: hidden !important;
    box-sizing: border-box;
    //  overflow-y: scroll!important;
  }
}

.rowClass {
  display: flex;
}

.active {
  background-color: #035bcd;
  padding: 0.02rem;
  text-align: center;
  box-sizing: border-box;
  border-radius: 0.05rem;
}

#videoDOMId {
  display: flex;
  flex-wrap: wrap;
  // height: 5rem; /* 使用百分比高度 */
  justify-content: space-between;
  align-items: flex-start;
  /* 确保子元素从顶部开始排列 */
  // overflow: hidden !important; /* 使用 !important 强制生效 */
  // overflow-y: scroll!important;
  box-sizing: border-box;
  overflow: hidden;
}

.mapPic {
  position: relative;
  // width: 2rem;
  // height: 2rem;
  margin-top: 0.5rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.location {
  width: 0.3rem;
  height: 0.3rem;
  background-color: #f68b00;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  animation: breathe 1.6s infinite ease-in-out;
  cursor: pointer;
}

@keyframes breathe {
  0% {
    transform: scale(0.3);
    opacity: 1;
  }

  50% {
    transform: scale(0.5);
    opacity: 0.8;
  }

  100% {
    transform: scale(0.3);
    opacity: 1;
  }
}

.bubble {
  position: absolute;
  bottom: 100%;
  /* 确保气泡显示在 .location 的上方 */
  left: 50%;
  transform: translateX(-50%);
  background-color: #f68b00;
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.5rem;
  white-space: nowrap;
  z-index: 10;
  margin-bottom: 0.4rem;

  /* 添加一些间距，确保气泡和 .location 之间有空隙 */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    /* 确保三角形显示在气泡的底部 */
    left: 50%;
    transform: translateX(-50%);
    border-width: 0.2rem;
    border-style: solid;
    border-color: #f68b00 transparent transparent transparent;
  }
}

.checkBtn {
  margin: -1rem 0 0.1rem 0;
}
</style>
