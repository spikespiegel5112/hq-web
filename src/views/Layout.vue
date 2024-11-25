<template>
  <div class="layout_container" ref="layoutRef">
    <a-layout>
      <a-layout-header class="header">
        <div class="title">虹桥枢纽运行管理一体化平台</div>
        <div class="right">
          {{ dayjs().format("YYYY-MM-DD hh:mm:ss") }}
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <Menu />
        </a-layout-sider>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
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

import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";

import { screenBannerInfoRequest } from "@/api/screen";
import dayjs from "dayjs";

const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const global = currentInstance.appContext.config.globalProperties;

const layoutRef = ref(HTMLDivElement);

const state = reactive({
  stuffDutyList: [] as any[],
  bannerInfo: {},
});

const init = () => {
  const lineScaleEl: HTMLElement = document.getElementById("line-scale");
  lineScaleEl.style.display = "none";
};

onMounted(async () => {
  init();
});

onBeforeUnmount(() => {});
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  .ant-layout {
    height: 100%;
  }
  .header {
    display: flex;
    padding: 0 0.2rem;
    height: 1rem;
    background-color: transparent;
    background-image: url("@/assets/header_bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    .title {
      width: 6rem;
      font-size: 0.35rem;
      text-align: left;
      font-weight: bold;
    }
    .right {
      flex: 1;
      text-align: right;
    }
  }
}
.debuggingtools {
  position: fixed;
  right: 1rem;
  top: 0.5rem;
  z-index: 2;
}
</style>
