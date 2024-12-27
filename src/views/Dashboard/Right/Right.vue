<template>
  <div class="dashboardright common_block_wrapper">
    <div class="header">
      <a-form>
        <a-row class="rowClass">
          <a-col :span="12" style="margin-top: 0.04rem;">
            <span
              :class="{ active: isActive === 'p9' }"
              @click="setActive('p9')"
            >
              P9停车场
            </span>
            <span
              style="margin-left: 0.1rem;"
              :class="{ active: isActive === 'nanxu' }"
              @click="setActive('nanxu')"
            >
              南蓄车场
            </span>
          </a-col>
          <a-col :span="12">
            <a-form-item label="区域">
              <a-select placeholder="请选择">
                <a-select-option value="全部">全部</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="content">
      <vue-scroll>
        <a-space wrap>
          <div v-html="winContent"></div>
        </a-space>
      </vue-scroll>
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
const isActive = ref('p9');

const state = reactive({});

// 定义 winContent 响应式数据
const winContent = ref("");

onMounted(async () => {
  // 登录
  try {
    const res1 = await axios.post("http://10.141.10.10:8088/VIID/login/v2", {});
    console.log("res1  ", res1);
    const postData = {
      UserName: "loadmin",
      AccessCode: res1.data.AccessCode,
      LoginSignature: CryptoJS.MD5(
        btoa("loadmin") +
          res1.data.AccessCode +
          CryptoJS.MD5("Hqhoc_20240919").toString()
      ).toString(),
    };

    // 二次调用获取token
    const res2 = await axios.post(
      "http://10.141.10.10:8088/VIID/login/v2",
      postData
    );
    console.log("res2", res2, btoa("loadmin"));

    // 鉴权+keeplive
    res2.data.AccessToken
      ? setInterval(async () => {
          const res3 = await axios.post(
            "http://10.141.10.10:8088/VIID/hadesadapter/user/keepalive",
            {},
            {
              headers: {
                Authorization: `${res2.data.AccessToken}`,
              },
            }
          );
          console.log("res3", res3);
        }, 30000)
      : null;

    // 动态加载外部脚本
    await loadScript();
    // 初始化
    const initData = {
      ip: "10.141.10.10",
      token: res2.data.AccessToken,
      title: document.title + Date.now(),
      offset: [0, 0],
    };
    await init(initData);

    // 创建窗格
    createPanelWindow();

    // 启动实况
    startLive();

  } catch (error) {
    console.error("Login failed:", error);
  }
});

// 初始化
const init = async (initData: any) => {
  (window as any).imosPlayer
    .init(initData)
    .then(function (res: any) {
      if (res.ErrCode === 0) {
        console.log("登陆成功res", res);
        checkInit(); // 检查初始化状态
      } else {
        alert(res.ErrMsg);
      }
    })
    .catch(function (err: any) {
      alert("调用失败");
      console.error(err);
    });
};

// 动态加载外部脚本
const loadScript = () => {
  return new Promise((resolve: any, reject: any) => {
    const script = document.createElement("script");
    script.src = "http://10.141.10.10:8093/static/imosPlayer.min.js";
    script.onload = () => {
      console.log("imosPlayer.min.js loaded successfully");
      resolve();
    };
    script.onerror = () => {
      console.error("Failed to load imosPlayer.min.js");
      reject();
    };
    document.head.appendChild(script);
  });
};

// 创建窗格
const createPanelWindow = () => {
  let videoDom = (window as any).imosPlayer.createPanelWindow();
  // 将 win 的内容赋值给 winContent
  videoDom.style.width = "146px";
  videoDom.style.height = "154px";
  videoDomId.value = videoDom.id;
  winContent.value = videoDom.outerHTML;
  console.log("win", winContent.value);
};

// 启动实况
const startLive = () => {
  console.log("startLive");
  (window as any).imosPlayer
    .playLive(videoDomId.value, {
      camera: "31018900001320000109",
      title: "123456789",
      stream: 0,
    })
    .then((res: any) => {
      console.log("实况", res);
    });
};

// 设置激活的 span
const setActive = (value: string) => {
  isActive.value = value;
};

const checkInit = () => {
  let res = (window as any).imosPlayer.checkInit();
  console.log(res ? "已初始化" : "未初始化");
  // alert(res ? "已初始化" : "未初始化");
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
    overflow: auto;
    text-align: center;
    position: relative;
    :deep(.ant-space) {
      width: 100%;
      .ant-space-item {
        border: 1px solid #ccc;
        width: calc(50% - 5px);
        padding-top: 50%;
        box-sizing: border-box;
        position: relative;
        > div {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.rowClass {
  display: flex;
}
.active{
  background-color: #035bcd;
  padding: 0.02rem;
  text-align: center;
  box-sizing: border-box;
  border-radius: 0.05rem;
}
</style>
