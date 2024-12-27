<template>
  <div class="dashboardright common_block_wrapper">
    <div class="header">
      <a-form>
        <a-row class="rowClass">
          <a-col :span="12" style="margin-top: 0.04rem">
            <span
              :class="{ active: isActive === 'p9' }"
              @click="setActive('p9')"
            >
              P9停车场
            </span>
            <span
              style="margin-left: 0.1rem"
              :class="{ active: isActive === 'nanxu' }"
              @click="setActive('nanxu')"
            >
              南蓄车场
            </span>
          </a-col>
          <a-col :span="12">
            <a-form-item label="区域">
              <a-select v-model:value="selectedRegion" placeholder="请选择" @change="handleSelectChange" style="z-index: 1000;">
                <a-select-option value="全部">全部</a-select-option>
                <!-- <a-select-option value="BM1">BM1</a-select-option>
                <a-select-option value="BM2">BM2</a-select-option> -->
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="content">
      <div id="videoDOM"></div>
      <div class="mapPic">
        <img
          src="@/assets/mapPic.png"
        />
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
import { screenBannerInfoRequest } from "@/api/management";
import { log } from "console";
import CryptoJS from "crypto-js"; // 导入 crypto-js
import internal from "stream";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const formDataRef = ref();
const videoDomId = ref();
const AccessToken = ref();
const cameraListTotal = ref();
const cameraListChecked = ref();
const selectedRegion = ref('全部');
const isActive = ref("p9");

const state = reactive({});

// 定义 winContent 响应式数据
const winContent = ref("");
const defaultCameraList = ref("");

onMounted(async () => {
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

    await init(initData);

    setTimeout(() => {
    }, 1000);
  } catch (error) {
    console.error("Login failed:", error);
  }

  await getCameraData();
  forCameraData();
  await nextTick(() => {
      // DOM 全部加载后的操作
      const videoDOM = document.getElementById('videoDOM');
      videoDOM ? videoDOM.style.overflow = 'hidden' : ''  // 这里可以获取到 videoDOM 的 DOM 结构
      console.log('DOM 结构',videoDOM); // 这里可以获取到 videoDOM 的 DOM 结构
    });

});

// 初始化
const init = async (initData: any) => {
  (window as any).imosPlayer
    .init(initData)
    .then(function (res: any) {
      if (res.ErrCode === 0) {
        checkInit(); // 检查初始化状态
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

// 创建窗格
const createPanelWindow = () => {
  return new Promise((resolve, reject) => {
    let videoDom = (window as any).imosPlayer.createPanelWindow();
    videoDom.style.width = "140px";
    videoDom.style.height = "160px";
    videoDom.style.marginTop = "0.08rem";
    videoDom.style.overflow = "hidden"; // 确保子元素内部也隐藏溢出部分

    const videoContainer = document.querySelector("#videoDOM");
    if (videoContainer) {
      videoContainer.appendChild(videoDom);
      resolve(videoDom.id);
    } else {
      reject("视频容器未找到");
    }
  });
};

const forCameraData = () => {
  console.log('cameraListChecked222 ',cameraListChecked.value);
  
  cameraListChecked.value.forEach((item: any) => {
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
  (window as any).imosPlayer
    .playLive(itemData.id, {
      camera: itemData.ResCode,
      title: itemData.ResName,
      stream: 0,
    })
    .then((res: any) => {
      // console.log("实况", res);
    });
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
  const res = await axios.get(url, {
    headers: {
      Authorization: AccessToken.value,
    },
  });
  cameraListTotal.value = res.data.Result.InfoList;
  console.log("相机总资源", cameraListTotal.value);
  cameraListChecked.value = cameraListTotal.value.filter((item: any) => {
    return item.OrgName.includes("B1");
  });

  // 视频暂时只显示4个，视频会盖住其他dom元素 暂时没法解决
  cameraListChecked.value.length >= 4 ? cameraListChecked.value = cameraListChecked.value.slice(0, 4) : null;
  console.log("Checked111---", cameraListChecked.value);
};

// 勾选数据
const handleSelectChange = (value: any) => {
  console.log('value',value);
  const cameraTemp:any = []
  cameraListTotal.value.forEach((item: any) => {
    // console.log('item',item);
    
    if (item.OrgName.includes(value)) {
      cameraTemp.push(item)
    }
  });
  cameraListChecked.value = cameraTemp;
  console.log('cameraListChecked',cameraListChecked.value);
  
  createPanelWindow()
  forCameraData()
};

// 设置激活的 span
const setActive = (value: string) => {
  isActive.value = value;
};

const checkInit = () => {
  let res = (window as any).imosPlayer.checkInit();
  console.log(res ? "已初始化" : "未初始化");
};

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.dashboardright {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 1.75rem);
  position: relative;
  .content {
    height: calc(100vh - 2.8rem);
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

#videoDOM {
  display: flex;
  flex-wrap: wrap;
  // height: 5rem; /* 使用百分比高度 */
  justify-content: space-between;
  align-items: flex-start; /* 确保子元素从顶部开始排列 */
  // overflow: hidden !important; /* 使用 !important 强制生效 */
  // overflow-y: scroll!important;
  box-sizing: border-box;
  overflow: hidden;
}
.mapPic{
  // width: 2rem;
  // height: 2rem;
  margin-top: 0.5rem;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>